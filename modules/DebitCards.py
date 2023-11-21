from db.database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float


class DebitCards(Base):
    __tablename__ = 'debitcards'

    id = Column(Integer, primary_key=True, index=True)

