import pytest
from unittest.mock import MagicMock, AsyncMock
from app.services.game_service import GameService
from app.domain.models import Board

# Mock repository interface for type hinting if needed, but MagicMock handles it.

@pytest.fixture
def mock_repo():
    repo = MagicMock()
    # default load_game behavior needs to be awaitable
    repo.load_game = AsyncMock(return_value={
        "id": "test_game",
        "variant": "standard",
        "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    })
    repo.save_game = AsyncMock()
    return repo

@pytest.mark.asyncio
async def test_create_game(mock_repo):
    service = GameService(mock_repo)
    result = await service.create_game("standard")

    assert result["game_id"] is not None
    assert result["variant"] == "standard"
    mock_repo.save_game.assert_called_once()

@pytest.mark.asyncio
async def test_make_move_updates_state(mock_repo):
    service = GameService(mock_repo)
    game_id = "test_game"

    # Valid move e2 -> e4 on initial board
    result = await service.make_move(game_id, "e2", "e4")

    assert result["success"] is True

    # Verify repo saved the new FEN, not a placeholder
    saved_args = mock_repo.save_game.call_args[0]
    # saved_args: (game_id, fen, variant)
    saved_fen = saved_args[1]

    # Check that e2 is empty and e4 has a pawn
    board = Board.from_fen(saved_fen)
    assert board.get_piece("e2") is None
    assert board.get_piece("e4").type == "pawn"
    assert board.get_piece("e4").color == "white"

    # Check active color changed to black
    assert "b" in saved_fen.split()[1]

@pytest.mark.asyncio
async def test_make_move_invalid(mock_repo):
    service = GameService(mock_repo)
    game_id = "test_game"

    # Invalid move e2 -> e5 (pawn jump 3 squares)
    result = await service.make_move(game_id, "e2", "e5")

    assert result["success"] is False
    assert "Illegal move" in result["error"]

@pytest.mark.asyncio
async def test_game_not_found(mock_repo):
    service = GameService(mock_repo)
    mock_repo.load_game.return_value = None

    with pytest.raises(ValueError, match="not found"):
        await service.make_move("missing_id", "e2", "e4")
