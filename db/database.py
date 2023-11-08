from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
# from models.base import Base
from sqlalchemy.ext.declarative import declarative_base

# Database
SQLALCHEMY_DATABASE_URI = 'sqlite:///./opp_app.db'


def create_Base():
    base = declarative_base()
    return base


def get_session():
    session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    return session


engine = create_engine(SQLALCHEMY_DATABASE_URI)
Session = get_session()
Base = create_Base()
