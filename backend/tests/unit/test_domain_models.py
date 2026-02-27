import pytest
from app.domain.models import Board, Piece

def test_initial_piece_count():
    board = Board()
    assert len(board.grid) == 32

def test_get_piece_empty_square():
    board = Board()
    assert board.get_piece("e4") is None

def test_piece_attributes():
    p = Piece("white", "knight")
    assert p.color == "white"
    assert p.type == "knight"
