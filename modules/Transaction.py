import requests
from db.database import Base
from sqlalchemy import (
    Column, Integer, Float, String, DateTime, Enum, ForeignKey
)
from sqlalchemy.orm import relationship

from datetime import datetime, timedelta
from enum import Enum


class TransactionStatus(Enum):
    completed = "completed"
    in_processing = "pending"


class PaymentMethod(Enum):
    debit = "debit"
    credit = "credit"


class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    amount = Column(Float, nullable=False)
    transaction_date = Column(DateTime, default=datetime.utcnow)
    #status = Column(Enum('pending', 'completed'), default='completed')
    status = Column(String, default='completed')
    #payment_method = Column(Enum(PaymentMethod))
    payment_method = Column(String)

    # user = relationship('User', back_populates='transactions')

    @classmethod
    def get_pending_transactions(cls, session):
        # Update credit card transactions status before fetching pending transactions
        cls.update_credit_card_transactions(session)
        return session.query(cls).filter_by(status='pending').all()

    @classmethod
    def get_transactions_comprising_total_balance(cls, session):
        # This method assumes that only 'completed' transactions contribute to the total balance.
        cls.update_credit_card_transactions(session)
        return session.query(cls).filter_by(status='completed').all()

    @classmethod
    def validate_card(cls, card_number):
        url = "https://c3jkkrjnzlvl5lxof74vldwug40pxsqo.lambda-url.us-west-2.on.aws"
        payload = {"card_number": card_number}
        headers = {'content-type': 'application/json'}
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": f"Request failed with status code {response.status_code}"}

    @classmethod
    def check_funds_and_fraud(cls, card_number, amount):
        url = "https://223didiouo3hh4krxhm4n4gv7y0pfzxk.lambda-url.us-west-2.on.aws"
        payload = {"card_number": card_number, "amt": amount}
        headers = {'content-type': 'application/json'}
        response = requests.post(url, json=payload, headers=headers)

        if response.status_code == 200:
            return response.json()
        else:
            return {"error": f"Request failed with status code {response.status_code}"}


    @classmethod
    def initiateTransaction(cls, session, user_id, card_number, amount, payment_method):
        # Validate the card
        card_validation = cls.validate_card(card_number)
        if card_validation.get("success") == "false":
            return {"error": card_validation.get("msg")}

        # Check funds and potential fraud
        funds_check = cls.check_funds_and_fraud(card_number, amount)
        print(funds_check)
        if funds_check.get("success")=='false':
            return {"error": funds_check.get("msg")}


        # initial_status = "completed" if payment_method == PaymentMethod.debit else "pending"
        initial_status = "completed" if payment_method == "debit" else "pending"

        # All checks passed, create the transaction
        new_transaction = cls(
            user_id=user_id,
            amount=amount,
            transaction_date=datetime.utcnow(),
            status=initial_status,
            payment_method=payment_method
        )
        session.add(new_transaction)
        session.commit()

        return {"success": True, "msg": "Transaction initiated successfully."}

    @classmethod
    def update_credit_card_transactions(cls, session):
        two_days_ago = datetime.utcnow() - timedelta(days=2)
        transactions_to_update = session.query(cls).filter(
            cls.payment_method == "credit", # PaymentMethod.credit,
            cls.status == "pending",
            cls.transaction_date <= datetime.utcnow() # two_days_ago
        ).all()

        for transaction in transactions_to_update:
            transaction.status = "completed"

        session.commit()

t = Transaction()
print(t.check_funds_and_fraud("4147202464191053", 200000))