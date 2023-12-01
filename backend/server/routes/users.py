from fastapi import APIRouter, Body, HTTPException, status
from typing import List
from server.models.users import User, UserUpdateModel, ResponseModel, ErrorResponseModel, SuccessResponseModel
from server.database import add_user, retrieve_user, update_user, delete_user

router = APIRouter()

@router.post("/", response_description="Add new user", response_model=User)
async def create_user(user: User = Body(...)):
    try:
        user_details = await add_user(user.dict())
        return SuccessResponseModel(user_details=user_details, message="User added successfully.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{id}", response_description="Get a single user", response_model=User)
async def get_user(id: str):
    user = await retrieve_user(id)
    if user:
        return ResponseModel(user, "User data retrieved successfully")
    raise HTTPException(status_code=404, detail=f"User {id} not found")

@router.put("/{id}", response_description="Update a user", response_model=User)
async def update_user_data(id: str, req: UserUpdateModel = Body(...)):
    updated_user = await update_user(id, req.dict(exclude_unset=True))
    if updated_user:
        return ResponseModel(f"User with ID: {id} name update is successful")
    raise HTTPException(status_code=404, detail=f"User {id} not found")

@router.delete("/{id}", response_description="Delete a user", response_model=User)
async def delete_user_data(id: str):
    deleted_user = await delete_user(id)
    if deleted_user:
        return ResponseModel(f"User with ID: {id} removed")
    raise HTTPException(status_code=404, detail=f"User {id} not found")
