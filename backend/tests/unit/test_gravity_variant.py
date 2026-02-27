import pytest
from app.domain.models import Board, Piece

def test_gravity_settlement_single_column():
    board = Board()
    board.grid = {}

    # Place pieces in a column with gaps
    # R . . .
    # . . . .
    # B . . .
    # . . . .
    # P . . .
    board.grid["e8"] = Piece("white", "rook")
    board.grid["e6"] = Piece("white", "bishop")
    board.grid["e4"] = Piece("white", "pawn")

    # Trigger gravity
    board.apply_gravity()

    # Pieces should stack at the bottom
    # e1 -> Pawn
    # e2 -> Bishop
    # e3 -> Rook
    assert board.get_piece("e1").type == "pawn"
    assert board.get_piece("e2").type == "bishop"
    assert board.get_piece("e3").type == "rook"

    # Original squares empty
    assert board.get_piece("e8") is None
    assert board.get_piece("e6") is None
    assert board.get_piece("e4") is None

def test_gravity_after_move():
    board = Board()
    board.grid = {}

    # e2: Pawn, e3: Empty, e4: Rook
    board.grid["e2"] = Piece("white", "pawn")
    board.grid["e4"] = Piece("white", "rook")

    # Move Pawn e2 -> d2 (side step)
    # Now e column has gap at e2 (actually e2 is empty now), e4 has rook.
    # d column has pawn at d2. d1 is empty. Pawn should fall to d1.
    # e column rook should fall to e1.

    board.make_move("e2", "d2", variant="gravity")

    # Pawn moved to d2 then fell to d1
    assert board.get_piece("d1").type == "pawn"
    assert board.get_piece("d2") is None

    # Rook was at e4, fell to e1 (since e2, e3 empty and e1 empty)
    assert board.get_piece("e1").type == "rook"
    assert board.get_piece("e4") is None
