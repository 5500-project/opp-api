from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from starlette import status
from sqlalchemy.orm import Session
from routers.auth import get_current_user

from modules.Users import Users
from db.database import SessionLocal

router = APIRouter(prefix='/bussinessowner', tags=['bussinessOwner'])

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
async def read_all(user: user_dependency, db: db_dependency):
    check_bussinessowner_user_auth(user)
    return db.query(Users).all()


def check_bussinessowner_user_auth(user):
    if user is None or user.get('user_role').lower() != 'bussinessowner':
        raise HTTPException(status_code=401, detail='Authentication Failed')