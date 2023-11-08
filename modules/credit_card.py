# credit_card.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base
import re


class CreditCard(Base):
    __tablename__ = 'credit_cards'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    card_number = Column(String(16), nullable=False)
    cardholder_name = Column(String(120), nullable=False)
    expiration_date = Column(String(5), nullable=False)  # MM/YY format
    cvv = Column(String(3), nullable=False)

    user = relationship("User", back_populates="credit_cards")

    @staticmethod
    def validate_card_number(number):
        # Implement Luhn Algorithm to validate the credit card number
        return re.match(r'^4[0-9]{12}(?:[0-9]{3})?$', number)  # Simplified validation for Visa cards only

    # Additional methods related to credit card transactions can be added here
