# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import httpx

app = FastAPI()
PRISMA_SERVICE_URL = "http://localhost:3000"

class UserInput(BaseModel):
    insta_username: str
    full_name: str
    traits: list[str]
    persona: str

@app.post("/store_user_data")
async def store_user_data(user_data: UserInput):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{PRISMA_SERVICE_URL}/store_user_data",
                json=user_data.dict()
            )
            response.raise_for_status()
            return JSONResponse(response.json())
        except httpx.HTTPError as e:
            raise HTTPException(status_code=400, detail=str(e))

@app.get("/get_user_data/{persona}")
async def get_user_data(persona: str):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{PRISMA_SERVICE_URL}/get_user_data/{persona}")
            response.raise_for_status()
            return JSONResponse(response.json())
        except httpx.HTTPError as e:
            if response.status_code == 404:
                raise HTTPException(status_code=404, detail="User not found")
            raise HTTPException(status_code=400, detail=str(e))