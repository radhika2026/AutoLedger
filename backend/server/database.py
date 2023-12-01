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


def car_helper(car) -> dict:
    return {
        "id": str(car["_id"]),
        "engine_number": car["engine_number"],
        "manufacturing_date": car["manufacturing_date"].isoformat(),
        "manufacturer": car["manufacturer"],
        "number_plate": car["number_plate"],
        "color": car["color"],
        "seating": car["seating"],
        "transmission": car.get("transmission"),
        "wheel_base": car.get("wheel_base"),
        "drive_type": car.get("drive_type"),
        "ground_clearance": car.get("ground_clearance"),
        "fuel": car.get("fuel"),
        "class": car.get("class"),
        "model": car.get("model"),
        "current_owner_name": car["current_owner_name"],
        "owners_history": car["owners_history"],
        "chassis_number": car["chassis_number"],
        "driving_license_number": car["driving_license_number"],
        "insurance_number": car["insurance_number"],
        "insurance_expiry_date": car["insurance_expiry_date"].isoformat(),
        "insurance_history": car["insurance_history"],
        "current_mileage": car["current_mileage"],
        "current_odometer_reading": car["current_odometer_reading"],
        "service_center_history": car["service_center_history"]
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
