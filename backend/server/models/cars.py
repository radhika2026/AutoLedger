from pydantic import BaseModel, Field, constr, validator
from datetime import datetime
from typing import Dict, Optional

class Car(BaseModel):
    engine_number: constr(regex=r'^[A-Z0-9]+$') = Field(..., example="ENG1234")
    manufacturing_date: datetime = Field(..., example="2021-07-10")
    manufacturer: constr(min_length=2) = Field(..., example="PORSCHE")
    number_plate: constr(regex=r'^[A-Z0-9]+$') = Field(..., example="X2DF45")
    color: constr(min_length=1) = Field(..., example="black")
    seating: constr(min_length=1) = Field(..., example="6-seater")
    transmission: Optional[str] = Field(None, example="Automatic")
    wheel_base: Optional[str] = Field(None, example="2.8m")
    drive_type: Optional[str] = Field(None, example="4WD")
    ground_clearance: Optional[str] = Field(None, example="200mm")
    fuel: Optional[str] = Field(None, example="Petrol")
    class_type: Optional[str] = Field(None, alias="class", example="SUV")
    model: Optional[str] = Field(None, example="Cayenne")
    current_owner_name: str = Field(..., example="New Mona Lisa")
    owners_history: Dict[str, str] = Field(default_factory=dict)
    chassis_number: constr(regex=r'^[A-Z0-9_]+$') = Field(..., example="CHAS_X123")
    driving_license_number: constr(regex=r'^[A-Z0-9_]+$') = Field(..., example="LIC_X23CF45")
    insurance_number: constr(regex=r'^[A-Z0-9]+$') = Field(..., example="INS12345")
    insurance_expiry_date: datetime = Field(..., example="2024-08-15")
    insurance_history: Dict[str, str] = Field(default_factory=dict)
    current_mileage: constr(regex=r'^[0-9]+$') = Field(..., example="35")
    current_odometer_reading: constr(regex=r'^[0-9]+$') = Field(..., example="10234")
    service_center_history: Dict[str, str] = Field(default_factory=dict)

    @validator('manufacturing_date', 'insurance_expiry_date', pre=True)
    def parse_date(cls, value):
        if isinstance(value, str):
            return datetime.strptime(value, '%d-%m-%Y')
        return value

    class Config:
        schema_extra = {
            "example": {
                "engine_number": "ENG1234",
                "manufacturing_date": "10-07-2021",
                "manufacturer": "PORSCHE",
                "number_plate": "X2DF45",
                "color": "black",
                "seating": "6-seater",
                "transmission": "Automatic",
                "wheel_base": "2.8m",
                "drive_type": "4WD",
                "ground_clearance": "200mm",
                "fuel": "Petrol",
                "class": "SUV",
                "model": "Cayenne",
                "current_owner_name": "New Mona Lisa",
                "owners_history": {},
                "chassis_number": "CHAS_X123",
                "driving_license_number": "LIC_X23CF45",
                "insurance_number": "INS12345",
                "insurance_expiry_date": "15-08-2024",
                "insurance_history": {},
                "current_mileage": "35",
                "current_odometer_reading": "10234",
                "service_center_history": {}
            }
        }
    def to_asset(self):
        asset = {"data": self.dict()}
        return asset

    def set_tx_id(self, tx_id: str):
        self.tx_id = tx_id
        return self

    class Config:
        orm_mode = True

class ErrorResponseModel(BaseModel):
    status_code: int = Field(default=500, example=500)
    message: str = Field(default="Failure", example="Failure")
    error: str = Field(..., example="An error occurred")

    class Config:
        schema_extra = {
            "example": {
                "status_code": 500,
                "message": "Failure",
                "error": "An error occurred"
            }
        }




class SuccessResponseModel(BaseModel):
    status_code: int = Field(default=200, example=200)
    message: str = Field(default="Successfully executed", example="Successfully executed")
    car_details: dict = Field(default_factory=dict)

    class Config:
        schema_extra = {
            "example": {
                "status_code": 200,
                "message": "Successfully executed",
                "car_details": {}  # Replace with an example car details
            }
        }
