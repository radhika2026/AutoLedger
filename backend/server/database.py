from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId
from typing import Optional, List
from pydantic import BaseModel, Field, constr, EmailStr
from datetime import datetime

# MongoDB connection details
MONGO_DETAILS = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.users
user_collection = database.get_collection("users_collection")

# Pydantic model for user
class User(BaseModel):
    name: constr(min_length=1) = Field(...)
    role: constr(min_length=1) = Field(...)
    registration_date_time: datetime = Field(default_factory=datetime.now)
    identification_number: constr(regex=r'^[0-9]{9}$') = Field(...)
    driving_license_number: constr(min_length=8, max_length=10) = Field(...)
    email: EmailStr = Field(...)
    password: constr(min_length=10) = Field(...)

# Helper function to convert user document to dict
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "role": user["role"],
        "registration_date_time": user["registration_date_time"],
        "identification_number": user["identification_number"],
        "driving_license_number": user["driving_license_number"],
        "email": user["email"],
        # Exclude password for security
    }

# Add a new user to the database
async def add_user(user_data: dict) -> dict:
    user = await user_collection.insert_one(user_data)
    new_user = await user_collection.find_one({"_id": user.inserted_id})
    return user_helper(new_user)

# Retrieve a user by id
async def retrieve_user(id: str) -> dict:
    user = await user_collection.find_one({"_id": ObjectId(id)})
    if user:
        return user_helper(user)

async def retrieve_users():
    users = []
    async for user in user_collection.find():
        users.append(user_helper(user))
    return users


# Update a user by id
async def update_user(id: str, data: dict) -> bool:
    if len(data) < 1:
        return False
    user = await user_collection.find_one({"_id": ObjectId(id)})
    if user:
        updated_user = await user_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_user:
            return True
        return False

# Delete a user from the database
async def delete_user(id: str) -> bool:
    user = await user_collection.delete_one({"_id": ObjectId(id)})
    return user.deleted_count > 0
