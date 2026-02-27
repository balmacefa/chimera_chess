from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.infrastructure.database import get_db
from app.infrastructure.repository import SQLiteRepository
from app.services.game_service import GameService

router = APIRouter()

class CreateRoomRequest(BaseModel):
    variant: str = "standard"

class CreateRoomResponse(BaseModel):
    room_id: str
    variant: str
    fen: str

def get_game_service(db: Session = Depends(get_db)):
    repo = SQLiteRepository(db)
    return GameService(repo)

@router.post("/rooms", response_model=CreateRoomResponse)
def create_room(request: CreateRoomRequest, service: GameService = Depends(get_game_service)):
    try:
        result = service.create_game(request.variant)
        return CreateRoomResponse(
            room_id=result["game_id"],
            variant=result["variant"],
            fen=result["fen"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/rooms/{room_id}")
def get_room(room_id: str, service: GameService = Depends(get_game_service)):
    game = service.get_game(room_id)
    if not game:
        raise HTTPException(status_code=404, detail="Room not found")
    return game
