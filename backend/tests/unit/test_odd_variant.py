import pytest
from app.domain.models import Board, Piece

def test_giraffe_moves():
    board = Board()
    board.grid = {}

    # Giraffe at d4
    # Vector: (1, 4) -> (d+1, 4+4) -> e8
    #         (4, 1) -> (d+4, 4+1) -> h5
    #         (-1, 4) -> (d-1, 4+4) -> c8
    #         etc.
    board.grid["d4"] = Piece("white", "giraffe")

    moves = board.get_legal_moves("d4")

    # Check some valid moves
    assert "e8" in moves
    assert "h5" in moves
    assert "c8" in moves

    # Check invalid moves (standard knight moves shouldn't be here)
    assert "e6" not in moves # (1, 2)
    assert "f5" not in moves # (2, 1)

def test_camel_moves():
    board = Board()
    board.grid = {}

    # Camel at d4
    # Vector: (1, 3) -> e7
    #         (3, 1) -> g5
    board.grid["d4"] = Piece("white", "camel")

    moves = board.get_legal_moves("d4")

    assert "e7" in moves
    assert "g5" in moves

    # Standard knight moves shouldn't be here
    assert "e6" not in moves

def test_odd_piece_capture():
    board = Board()
    board.grid = {}

    board.grid["d4"] = Piece("white", "giraffe")
    board.grid["e8"] = Piece("black", "pawn") # Valid capture
    board.grid["h5"] = Piece("white", "pawn") # Blocked by friend

    moves = board.get_legal_moves("d4")

    assert "e8" in moves
    assert "h5" not in moves
