import enum
from enum import Enum
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from starlette import status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from modules.Transaction import Transaction
from routers.auth import get_current_user
from modules.Users import Users
from db.database import SessionLocal
from dotenv import load_dotenv



# load_dotenv()  # take environment variables from .env.

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

class Token(BaseModel):
    access_token: str
    token_type: str

@router.get("/", status_code=status.HTTP_200_OK)
async def get_transaction(user: user_dependency, db: db_dependency):
    check_user_auth(user)
    return Transaction.get_transactions_comprising_total_balance(db)

@router.post("/initiate")
async def initiate_transaction(user: user_dependency, db: db_dependency, card_number: str, amount: float, payment_method):
    check_user_auth(user)
    return Transaction.initiateTransaction(db, user.id, card_number, amount, payment_method)

# @router.post("/initiate")
# async def initiate_transaction(user: user_dependency, db: db_dependency, user_id: int, card_number: str, amount: float, payment_method: Enum):
#     check_user_auth(user)
#     return Transaction.initiateTransaction(db, user_id, card_number, amount, payment_method)

@router.post("/update_credit_transactions")
async def update_credit_transactions(user: user_dependency, db: db_dependency):
    check_user_auth(user)
    Transaction.update_credit_card_transactions(db)
    return {"message": "Credit card transactions updated"}

@router.get("/", status_code=status.HTTP_200_OK)
async def read_all(user: user_dependency, db: db_dependency):
    check_user_auth(user)
    return db.query(Transaction).all()

# Check whether user has right to access specific transactions
def check_user_auth(user):
    # TODO: validate user
    if user is None or user.role.lower() != 'bussinessowner':
        raise HTTPException(status_code=401, detail='Authentication Failed')