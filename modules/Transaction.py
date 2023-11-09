from db.database import Base
from sqlalchemy import (
    Column, Integer, Float, DateTime, Enum, ForeignKey
)
from sqlalchemy.orm import relationship

from datetime import datetime
import enum


class TransactionStatus(enum.Enum):
    processed = "processed"
    in_processing = "in_processing"


class PaymentMethod(enum.Enum):
    debit = "debit"
    credit = "credit"


class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    amount = Column(Float, nullable=False)
    transaction_date = Column(DateTime, default=datetime.utcnow)
    status = Column(Enum('pending', 'completed', 'cancelled', name='transaction_status'), default='pending')
    payment_method = Column(Enum(PaymentMethod))

    #user = relationship('User', back_populates='transactions')

    @classmethod
    def get_pending_transactions(cls, session):
        return session.query(cls).filter_by(status='pending').all()

    def get_transactions_comprising_total_balance(cls, session):
        # This method assumes that only 'completed' transactions contribute to the total balance.
        return session.query(cls).filter_by(status='completed').all()