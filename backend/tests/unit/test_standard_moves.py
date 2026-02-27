from app.domain.models import Board, Piece

def test_pawn_moves_white_start():
    board = Board()
    moves = board.get_legal_moves("e2")
    assert "e3" in moves
    assert "e4" in moves

def test_pawn_moves_black_start():
    board = Board()
    moves = board.get_legal_moves("e7")
    assert "e6" in moves
    assert "e5" in moves

def test_knight_moves():
    board = Board()
    # Knights at start (b1) can move to a3, c3
    moves = board.get_legal_moves("b1")
    assert "a3" in moves
    assert "c3" in moves

def test_out_of_bounds():
    board = Board()
    # Rook at a1, can't go left (off board)
    moves = board.get_legal_moves("a1")
    # At start, rooks are blocked by pawns
    assert not moves

def test_capture_enemy():
    board = Board()
    # Place white pawn at e4, black pawn at d5
    board.grid["e4"] = Piece("white", "pawn")
    board.grid["d5"] = Piece("black", "pawn")

    moves = board.get_legal_moves("e4")
    assert "d5" in moves # Capture
    assert "e5" in moves # Move forward

def test_king_moves():
    board = Board()
    board.grid = {}

    # King at e4
    board.grid["e4"] = Piece("white", "king")

    moves = board.get_legal_moves("e4")

    expected_moves = ["d3", "e3", "f3", "d4", "f4", "d5", "e5", "f5"]
    for move in expected_moves:
        assert move in moves

    assert len(moves) == 8

def test_king_blocked_by_own_piece():
    board = Board()
    board.grid = {}

    # King at e4, white Pawn at e5
    board.grid["e4"] = Piece("white", "king")
    board.grid["e5"] = Piece("white", "pawn")

    moves = board.get_legal_moves("e4")
    assert "e5" not in moves
    assert "d5" in moves
