import pytest
from app.domain.models import Board, Piece

def test_fen_serialization_standard_start():
    board = Board()
    fen = board.to_fen()
    # Simplified standard FEN
    # rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
    assert fen.startswith("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")

def test_fen_parsing_standard_start():
    fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    board = Board.from_fen(fen)

    assert board.get_piece("a1").type == "rook"
    assert board.get_piece("e1").type == "king"
    assert board.get_piece("e4") is None

def test_fen_parsing_custom_position():
    # White King at e1, Black King at e8, White Rook at a1
    fen = "4k3/8/8/8/8/8/8/R3K3 w - - 0 1"
    board = Board.from_fen(fen)

    assert board.get_piece("e1").type == "king"
    assert board.get_piece("e1").color == "white"
    assert board.get_piece("e8").type == "king"
    assert board.get_piece("e8").color == "black"
    assert board.get_piece("a1").type == "rook"
    assert board.get_piece("a1").color == "white"
    assert board.get_piece("b2") is None

def test_fen_roundtrip():
    fen = "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2"
    board = Board.from_fen(fen)
    new_fen = board.to_fen()
    assert new_fen == fen
