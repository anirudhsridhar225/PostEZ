from fastapi import HTTPException
from services.speech_service import transcribe_audio_service

async def transcribe_audio():
    try:
        # Path to your audio file (adjust this path)
        audio_path = r"C:\Users\crs76\OneDrive\Documents\vscc\postez\PostEZ\scripts\An_address_by_Opposition_Leader_Anthony_Albanese (mp3cut.net).mp3"
        result = await transcribe_audio_service(audio_path)
        return {"transcription": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))