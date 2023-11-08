from db.database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float


class Users(Base):
    pass

class DebitCards(Base):
    pass

class CreditCards(Base):
    pass

class Transaction(Base):
    pass