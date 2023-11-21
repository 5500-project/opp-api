from db.database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Float

class CreditCards(Base):
    __tablename__ = 'creditcards'

    id = Column(Integer, primary_key=True, index=True)