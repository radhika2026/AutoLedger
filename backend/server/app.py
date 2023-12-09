from fastapi import FastAPI
from server.routes.users import router as user_router

app = FastAPI()

# Include the user routes
app.include_router(user_router, prefix="/users", tags=["users"])

@app.get("/")
async def read_root():
    return {"message": "Welcome to the User Management API!"}

