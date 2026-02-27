import pytest
from app.domain.models import Board, Piece

def test_atomic_capture_explosion():
    board = Board()
    # Setup: White Rook at e4, Black Pawn at e5
    board.grid = {}
    board.grid["e4"] = Piece("white", "rook")
    board.grid["e5"] = Piece("black", "pawn")
    board.grid["d4"] = Piece("white", "bishop") # Neighbor (Non-Pawn) -> Should die
    board.grid["f4"] = Piece("white", "pawn")   # Neighbor (Pawn) -> Should survive
    board.grid["f6"] = Piece("black", "pawn")   # Outside -> Should survive

    # Simulate capture e4 -> e5
    board.make_move("e4", "e5", variant="atomic")

    # Capturing piece (Rook) is gone (exploded)
    assert board.get_piece("e5") is None

    # Neighbor (Bishop at d4) is gone (Non-pawn dies)
    assert board.get_piece("d4") is None

    # Neighbor (Pawn at f4) is SAFE (Pawn survives)
    assert board.get_piece("f4") is not None
    assert board.get_piece("f4").type == "pawn"

    # Outside piece (Black Pawn at f6) is safe
    assert board.get_piece("f6") is not None

def test_atomic_non_capture_move():
    board = Board()
    board.grid = {}
    board.grid["e4"] = Piece("white", "rook")

    # Move without capture
    board.make_move("e4", "e5", variant="atomic")

    assert board.get_piece("e5").type == "rook"
    assert board.get_piece("e4") is None
