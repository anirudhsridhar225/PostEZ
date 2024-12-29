from fastapi import HTTPException
from services.text_service import process_text_service

async def process_text(text: str):
    try:
        result = process_text_service(text)
        return {"processed_text": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))