import httpx
from fastapi import FastAPI, Path, HTTPException
from fastapi.middleware.cors import CORSMiddleware


from nexres_sdk.resdb_driver import Resdb
from nexres_sdk.resdb_driver.crypto import generate_keypair

from model import User
import motor.motor_asyncio


from database import create_user
app = FastAPI()

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client.Users_Store
collection = database.users


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/api/create_transcation/", response_model=User)
async def post_nft_data(user: User):
    resilientdb_url = "http://localhost:18000/v1/transactions/commit"

    async with httpx.AsyncClient() as client:
        response = await client.post(resilientdb_url, json=user)


    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    
    document = response.dict()

    result = await collection.insert_one(document)

    return {"message": "Transaction created successfully", "data": response.json()}
    
