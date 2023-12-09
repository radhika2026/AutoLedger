from datetime import datetime
from pydantic import BaseModel, Field, constr, EmailStr, validator

class User(BaseModel):
    name: constr(min_length=1) = Field(..., example="John Doe")
    role: constr(min_length=1) = Field(..., example="Driver")
    registration_date_time: datetime = Field(default_factory=datetime.now)
    identification_number: constr(regex=r'^[0-9]{9}$') = Field(..., example="123456789")
    driving_license_number: constr(min_length=8, max_length=10) = Field(..., example="D1234567")
    email: EmailStr = Field(None, example="john.doe@example.com")
    password: constr(min_length=10, max_length=15, regex=r'^\w+$') = Field(None, example="Pass122345")

    @validator('password')
    def password_alphanumeric(cls, v):
        if not v.isalnum():
            raise ValueError('Password must be alphanumeric')
        return v

    class Config:
        schema_extra = {
            "example": {
                "name": "John Doe",
                "role": "Driver",
                "registration_date_time": datetime.now().isoformat(),
                "identification_number": "123456789",
                "driving_license_number": "D1234567",
                "email": "john.doe@example.com",
                "password": "Pass122345"
            }
        }

class UserUpdateModel(BaseModel):
    name: constr(min_length=1) = Field(None, example="John Doe")
    role: constr(min_length=1) = Field(None, example="Driver")
    driving_license_number: constr(min_length=5, max_length=15) = Field(None, example="D1234567")
    email: EmailStr = Field(None, example="john.doe@example.com")
    password: constr(min_length=10, max_length=15, regex=r'^\w+$') = Field(None, example="NewPass12345")

    @validator('password', pre=True, always=True)
    def password_alphanumeric(cls, v):
        if v is not None and not v.isalnum():
            raise ValueError('Password must be alphanumeric')
        return v

def ResponseModel(data, message):
    name: str = Field(..., example="John Doe")
    role: str = Field(..., example="Driver")
    registration_date_time: datetime = Field(..., example="2023-12-01T11:58:12.665831")
    identification_number: str = Field(..., example="123456789")
    driving_license_number: str = Field(..., example="D1234567")
    email: EmailStr = Field(..., example="john.doe@example.com")
    # Exclude password from the response model for security

    class Config:
        schema_extra = {
            "example": {
                "name": "John Doe",
                "role": "Driver",
                "registration_date_time": datetime.now().isoformat(),
                "identification_number": "123456789",
                "driving_license_number": "D1234567",
                "email": "john.doe@example.com",
            }
        }

def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}


class SuccessResponseModel(BaseModel):
    status_code: int = Field(200, example=200)
    message: str = Field("Successfully executed", example="Successfully executed")
    user_details: dict = {}

class ErrorResponseModel(BaseModel):
    status_code: int = Field(500, example=500)
    message: str = Field("Failure", example="Failure")
    error: str = Field(..., example="An error occurred")