from datetime import timedelta, datetime
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr
from starlette import status
from modules.user import User
from passlib.context import CryptContext
from db.database import Session
from typing import Annotated, Any, Optional
from sqlalchemy.orm import Session
from jose import jwt, JWTError
import os
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

# These are used to create the signature for a JWT
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/token')

router = APIRouter(prefix='/auth', tags=['auth'])


def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


class CreateUserRequest(BaseModel):
    email: EmailStr
    username: str
    first_name: str
    last_name: str
    phone_number: Optional[str] = None
    password: str
    role: str

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: CreateUserRequest):
    existing_user = db.query(User).filter(
        (User.username == create_user_request.username) |
        (User.email == create_user_request.email)
    ).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered."
        )

    create_user_model = User(
        email=create_user_request.email,
        username=create_user_request.username,
        first_name=create_user_request.first_name,
        last_name=create_user_request.surname,
        phone_number = create_user_request.phone_number,
        role=create_user_request.role,
        hashed_password=bcrypt_context.hash(create_user_request.password),
        is_active=True
    )
    db.add(create_user_model)
    try:
        db.commit()
        return {"message": "User created successfully."}, status.HTTP_201_CREATED
    except Exception as e:  # Consider logging the exception e
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error."
        )


@router.post("/token/", response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                                 db: db_dependency):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate user')

    token = create_access_token(user.username, user.id, user.role, timedelta(minutes=30))
    return {'access_token': token, 'token_type': 'bearer'}


def authenticate_user(username: str, password: str, db: db_dependency) -> Any:
    user = db.query(User).filter(User.username == username).first()
    if not user or not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user


def create_access_token(username: str, user_id: int, role: str, expires_delta: timedelta):
    claims = {'sub': username, 'id': user_id, 'role': role}
    expires = datetime.utcnow() + expires_delta
    claims.update({'exp': expires})
    token = jwt.encode(claims, SECRET_KEY, algorithm=ALGORITHM)
    return token


async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_bearer)) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get('id')
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate credentials')
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='User not found')
        return user
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate credentials')


@router.patch("/deactivate-my-account", response_model=Token)
async def deactivate_account(db: db_dependency, current_user: User = Depends(get_current_user), ):
    current_user.is_active = False
    db.add(current_user)
    try:
        db.commit()
        return {"message": "User account has been deactivated."}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while deactivating the account."
        )


@router.post("/change-password", status_code=status.HTTP_200_OK)
async def change_password(
        old_password: str, new_password: str, db: db_dependency, current_user: User = Depends(get_current_user),
):
    if not bcrypt_context.verify(old_password, current_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Old password is incorrect.")

    current_user.hashed_password = bcrypt_context.hash(new_password)
    db.add(current_user)
    try:
        db.commit()
        return {"message": "Password updated successfully."}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while updating the password."
        )