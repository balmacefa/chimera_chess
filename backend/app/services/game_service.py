import uuid
from typing import Dict, Optional, Any
from app.infrastructure.repository import IGameRepository
from app.domain.models import Board

class GameService:
    def __init__(self, repository: IGameRepository):
        self.repository = repository

    def create_game(self, variant: str) -> Dict[str, Any]:
        game_id = str(uuid.uuid4())
        # Initial FEN for standard chess
        board = Board()
        fen = board.to_fen()

        self.repository.save_game(game_id, fen, variant)

        return {
            "game_id": game_id,
            "variant": variant,
            "fen": fen
        }

    def get_game(self, game_id: str) -> Optional[Dict[str, Any]]:
        return self.repository.load_game(game_id)

    def make_move(self, game_id: str, from_sq: str, to_sq: str) -> Dict[str, Any]:
        game_data = self.repository.load_game(game_id)
        if not game_data:
            raise ValueError(f"Game {game_id} not found")

        variant = game_data["variant"]
        current_fen = game_data["fen"]

        # Hydrate board from FEN
        board = Board.from_fen(current_fen)

        legal_moves = board.get_legal_moves(from_sq)

        if to_sq not in legal_moves:
             return {"success": False, "error": "Illegal move"}

        # Apply move
        board.make_move(from_sq, to_sq, variant=variant)

        # Serialize back to FEN
        new_fen = board.to_fen()

        self.repository.save_game(game_id, new_fen, variant)

        return {
            "success": True,
            "fen": new_fen
        }
