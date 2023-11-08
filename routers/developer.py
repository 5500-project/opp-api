from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from starlette import status
from sqlalchemy.orm import Session
from routers.auth import get_current_user

from modules.modules import Users
from db.database import Session

router = APIRouter(prefix='/developer', tags=['developer'])

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()