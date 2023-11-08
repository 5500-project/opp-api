from fastapi import FastAPI

from modules import modules
from db.database import engine
from routers import auth, developer,bussinessOwner

app = FastAPI()

# Set up database
modules.Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(developer.router)
app.include_router(bussinessOwner.router)