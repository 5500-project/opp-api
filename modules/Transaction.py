from db.database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float


class Transaction(Base):
    __tablename__ = 'transaction'

    id = Column(Integer, primary_key=True, index=True)