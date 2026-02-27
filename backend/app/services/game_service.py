import uuid
from typing import Dict, Optional, Any
from app.infrastructure.repository import IGameRepository
from app.domain.models import Board

class GameService:
    def __init__(self, repository: IGameRepository):
        self.repository = repository

    async def create_game(self, variant: str) -> Dict[str, Any]:
        game_id = str(uuid.uuid4())
        board = Board()
        fen = board.to_fen()

        await self.repository.save_game(game_id, fen, variant)

        return {
            "game_id": game_id,
            "variant": variant,
            "fen": fen
        }

    async def get_game(self, game_id: str) -> Optional[Dict[str, Any]]:
        return await self.repository.load_game(game_id)

    async def make_move(self, game_id: str, from_sq: str, to_sq: str) -> Dict[str, Any]:
        game_data = await self.repository.load_game(game_id)
        if not game_data:
            raise ValueError(f"Game {game_id} not found")

        variant = game_data["variant"]
        current_fen = game_data["fen"]

        board = Board.from_fen(current_fen)

        legal_moves = board.get_legal_moves(from_sq)

        if to_sq not in legal_moves:
             return {"success": False, "error": "Illegal move"}

        board.make_move(from_sq, to_sq, variant=variant)

        new_fen = board.to_fen()

        await self.repository.save_game(game_id, new_fen, variant)

        return {
            "success": True,
            "fen": new_fen
        }
