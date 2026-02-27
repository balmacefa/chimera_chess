from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.infrastructure.database import Base
from sqlalchemy import Column, String, Text
from abc import ABC, abstractmethod
from typing import Dict, Optional
import json

class GameModel(Base):
    __tablename__ = "games"

    id = Column(String, primary_key=True, index=True)
    variant = Column(String)
    fen = Column(Text)

class IGameRepository(ABC):
    @abstractmethod
    async def save_game(self, game_id: str, fen: str, variant: str):
        pass

    @abstractmethod
    async def load_game(self, game_id: str) -> Optional[Dict]:
        pass

class SQLiteRepository(IGameRepository):
    def __init__(self, db: AsyncSession):
        self.db = db

    async def save_game(self, game_id: str, fen: str, variant: str):
        result = await self.db.execute(select(GameModel).where(GameModel.id == game_id))
        game = result.scalars().first()

        if game:
            game.fen = fen
            game.variant = variant
        else:
            game = GameModel(id=game_id, fen=fen, variant=variant)
            self.db.add(game)

        await self.db.commit()
        await self.db.refresh(game)

    async def load_game(self, game_id: str) -> Optional[Dict]:
        result = await self.db.execute(select(GameModel).where(GameModel.id == game_id))
        game = result.scalars().first()

        if game:
            return {
                "id": game.id,
                "variant": game.variant,
                "fen": game.fen
            }
        return None
