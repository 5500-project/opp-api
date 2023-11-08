from fastapi import FastAPI

from modules import Users, Transaction, DebitCards, CreditCards
from db.database import engine
from routers import auth, developer, bussinessOwner, transactions

app = FastAPI()

# Set up database
Users.Base.metadata.create_all(bind=engine)
CreditCards.Base.metadata.create_all(bind=engine)
DebitCards.Base.metadata.create_all(bind=engine)
Transaction.Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(developer.router)
app.include_router(bussinessOwner.router)
app.include_router(transactions.router)