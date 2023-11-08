# debit_card.py
from sqlalchemy import Column, Integer, String, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from .base import Base


class DebitCard(Base):
    __tablename__ = 'debit_cards'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    card_number = Column(String(16), nullable=False)
    cardholder_name = Column(String(120), nullable=False)
    expiration_date = Column(String(5), nullable=False)  # MM/YY format
    cvv = Column(String(3), nullable=False)
    balance = Column(Numeric(10, 2), nullable=False)  # Assuming balance is managed within this model

    user = relationship("User", back_populates="debit_cards")

    def check_funds(self, amount):
        # Check if there are sufficient funds in the balance
        return self.balance >= amount

    # Additional methods related to debit card transactions can be added here
