from fastapi import FastAPI, Path, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import importlib
from server.models.cars import Car, SuccessResponseModel, ErrorResponseModel
from 

module_name = "ResilientDB-GraphQL.resdb_driver"
module = importlib.import_module(module_name)

router = APIRouter()

