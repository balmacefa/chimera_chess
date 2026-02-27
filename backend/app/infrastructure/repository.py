from sqlalchemy import Column, String, Integer, Text
from app.infrastructure.database import Base
from sqlalchemy.orm import Session
from abc import ABC, abstractmethod
from typing import Dict, Optional
import json

class GameModel(Base):
    __tablename__ = "games"

    id = Column(String, primary_key=True, index=True)
    variant = Column(String)
    fen = Column(Text)
    # Could add more fields like status, turn, etc.

class IGameRepository(ABC):
    @abstractmethod
    def save_game(self, game_id: str, fen: str, variant: str):
        pass

    @abstractmethod
    def load_game(self, game_id: str) -> Optional[Dict]:
        pass

class SQLiteRepository(IGameRepository):
    def __init__(self, db: Session):
        self.db = db

    def save_game(self, game_id: str, fen: str, variant: str):
        game = self.db.query(GameModel).filter(GameModel.id == game_id).first()
        if game:
            game.fen = fen
            game.variant = variant
        else:
            game = GameModel(id=game_id, fen=fen, variant=variant)
            self.db.add(game)
        self.db.commit()
        self.db.refresh(game)

    def load_game(self, game_id: str) -> Optional[Dict]:
        game = self.db.query(GameModel).filter(GameModel.id == game_id).first()
        if game:
            return {
                "id": game.id,
                "variant": game.variant,
                "fen": game.fen
            }
        return None
