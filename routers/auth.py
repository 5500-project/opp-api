from datetime import timedelta, datetime

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from pydantic import BaseModel
from starlette import status

from modules.modules import Users
from passlib.context import CryptContext
from db.database import Session
from typing import Annotated, Any
from sqlalchemy.orm import Session
from jose import jwt, JWTError

router = APIRouter(prefix='/auth', tags=['auth'])

