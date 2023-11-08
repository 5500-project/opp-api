from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from starlette import status
from sqlalchemy.orm import Session
from routers.auth import get_current_user

from modules.Users import Users
from db.database import SessionLocal

router = APIRouter(prefix='/transaction', tags=['transaction'])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

# when an API uses this, it will enforce authorization
user_dependency = Annotated[dict, (Depends(get_current_user))]


# get developers
@router.get("/", status_code=status.HTTP_200_OK)
async def get_transaction(user: user_dependency, db: db_dependency):
    check_user_auth(user)
    return db.query(Users).all()


# Check whether user has right to access specific transactions
def check_user_auth(user):
    # TODO: validate user
    if user is None or user.get('user_role').lower() != '':
        raise HTTPException(status_code=401, detail='Authentication Failed')