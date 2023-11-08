from fastapi import APIRouter, Depends
from db.database import get_session, Session
from services.transaction_processor import TransactionProcessor

router = APIRouter()

@router.post("/process-payment")
def process_payment(user_id: int, amount: float, payment_token: str, payment_type: str, db: Session = Depends(get_session)):
    transaction_processor = TransactionProcessor(db)
    transaction = transaction_processor.process_payment(user_id, amount, payment_token, payment_type)
    return transaction

# Add other route handlers and use TransactionProcessor as needed...
