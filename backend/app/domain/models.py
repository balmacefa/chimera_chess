from typing import Dict, List, Optional, Tuple

class Piece:
    def __init__(self, color: str, type: str):
        self.color = color
        self.type = type

    def __repr__(self):
        return f"{self.color} {self.type}"

class Board:
    def __init__(self, fen: str = None):
        self.grid: Dict[str, Optional[Piece]] = {}
        # FEN state variables
        self.active_color = "white"
        self.castling_rights = "KQkq"
        self.en_passant_target = "-"
        self.halfmove_clock = 0
        self.fullmove_number = 1

        if fen:
            self._load_from_fen(fen)
        else:
            self._initialize_board()

    def _initialize_board(self):
        # White
        self.grid["a1"] = Piece("white", "rook")
        self.grid["b1"] = Piece("white", "knight")
        self.grid["c1"] = Piece("white", "bishop")
        self.grid["d1"] = Piece("white", "queen")
        self.grid["e1"] = Piece("white", "king")
        self.grid["f1"] = Piece("white", "bishop")
        self.grid["g1"] = Piece("white", "knight")
        self.grid["h1"] = Piece("white", "rook")
        for char in "abcdefgh":
            self.grid[f"{char}2"] = Piece("white", "pawn")

        # Black
        self.grid["a8"] = Piece("black", "rook")
        self.grid["b8"] = Piece("black", "knight")
        self.grid["c8"] = Piece("black", "bishop")
        self.grid["d8"] = Piece("black", "queen")
        self.grid["e8"] = Piece("black", "king")
        self.grid["f8"] = Piece("black", "bishop")
        self.grid["g8"] = Piece("black", "knight")
        self.grid["h8"] = Piece("black", "rook")
        for char in "abcdefgh":
            self.grid[f"{char}7"] = Piece("black", "pawn")

    @classmethod
    def from_fen(cls, fen: str):
        return cls(fen=fen)

    def _load_from_fen(self, fen: str):
        parts = fen.split()
        if not parts:
            return

        # 1. Piece placement
        rows = parts[0].split('/')
        if len(rows) != 8:
            pass

        self.grid = {}
        piece_map = {
            'p': 'pawn', 'n': 'knight', 'b': 'bishop', 'r': 'rook', 'q': 'queen', 'k': 'king',
            'P': 'pawn', 'N': 'knight', 'B': 'bishop', 'R': 'rook', 'Q': 'queen', 'K': 'king'
        }

        for r_idx, row in enumerate(rows):
            file_idx = 0
            rank = 8 - r_idx
            for char in row:
                if char.isdigit():
                    file_idx += int(char)
                else:
                    color = "white" if char.isupper() else "black"
                    piece_type = piece_map.get(char, "pawn") # Default if unknown
                    square = f"{chr(ord('a') + file_idx)}{rank}"
                    self.grid[square] = Piece(color, piece_type)
                    file_idx += 1

        # 2. Active color
        if len(parts) > 1:
            self.active_color = "white" if parts[1] == 'w' else "black"

        # 3. Castling rights
        if len(parts) > 2:
            self.castling_rights = parts[2]

        # 4. En passant
        if len(parts) > 3:
            self.en_passant_target = parts[3]

        # 5. Halfmove clock
        if len(parts) > 4:
            self.halfmove_clock = int(parts[4])

        # 6. Fullmove number
        if len(parts) > 5:
            self.fullmove_number = int(parts[5])

    def to_fen(self) -> str:
        # 1. Piece placement
        rows = []
        for r in range(8, 0, -1):
            row_str = ""
            empty_count = 0
            for f in range(8):
                square = f"{chr(ord('a') + f)}{r}"
                piece = self.grid.get(square)
                if piece:
                    if empty_count > 0:
                        row_str += str(empty_count)
                        empty_count = 0

                    char = piece.type[0].upper() if piece.type != "knight" else "N"
                    if piece.color == "black":
                        char = char.lower()

                    if piece.type == "knight": char = "N" if piece.color == "white" else "n"

                    row_str += char
                else:
                    empty_count += 1
            if empty_count > 0:
                row_str += str(empty_count)
            rows.append(row_str)

        placement = "/".join(rows)

        # 2. Active color
        color = "w" if self.active_color == "white" else "b"

        return f"{placement} {color} {self.castling_rights} {self.en_passant_target} {self.halfmove_clock} {self.fullmove_number}"

    def get_piece(self, position: str) -> Optional[Piece]:
        return self.grid.get(position)

    def _is_valid_square(self, square: str) -> bool:
        if len(square) != 2: return False
        file, rank = square[0], square[1]
        return file in "abcdefgh" and rank in "12345678"

    def _square_to_coords(self, square: str) -> Tuple[int, int]:
        return ord(square[0]) - ord('a'), int(square[1]) - 1

    def _coords_to_square(self, x: int, y: int) -> str:
        return f"{chr(x + ord('a'))}{y + 1}"

    def get_legal_moves(self, position: str) -> List[str]:
        piece = self.get_piece(position)
        if not piece:
            return []

        moves = []
        x, y = self._square_to_coords(position)

        if piece.type == "pawn":
            direction = 1 if piece.color == "white" else -1
            start_rank = 1 if piece.color == "white" else 6

            # Forward 1
            f1 = self._coords_to_square(x, y + direction)
            if self._is_valid_square(f1) and not self.get_piece(f1):
                moves.append(f1)
                # Forward 2
                f2 = self._coords_to_square(x, y + 2 * direction)
                if y == start_rank and self._is_valid_square(f2) and not self.get_piece(f2):
                    moves.append(f2)

            # Captures
            for dx in [-1, 1]:
                cap_sq = self._coords_to_square(x + dx, y + direction)
                target = self.get_piece(cap_sq)
                if self._is_valid_square(cap_sq) and target and target.color != piece.color:
                    moves.append(cap_sq)

        elif piece.type == "knight":
            offsets = [
                (1, 2), (1, -2), (-1, 2), (-1, -2),
                (2, 1), (2, -1), (-2, 1), (-2, -1)
            ]
            for dx, dy in offsets:
                nx, ny = x + dx, y + dy
                target_sq = self._coords_to_square(nx, ny)
                if self._is_valid_square(target_sq):
                    target = self.get_piece(target_sq)
                    if not target or target.color != piece.color:
                        moves.append(target_sq)

        elif piece.type in ["rook", "bishop", "queen", "king"]:
            directions = []
            if piece.type in ["rook", "queen", "king"]:
                directions.extend([(0, 1), (0, -1), (1, 0), (-1, 0)])
            if piece.type in ["bishop", "queen", "king"]:
                directions.extend([(1, 1), (1, -1), (-1, 1), (-1, -1)])

            is_slider = piece.type != "king"

            for dx, dy in directions:
                for i in range(1, 8 if is_slider else 2):
                    nx, ny = x + dx * i, y + dy * i
                    target_sq = self._coords_to_square(nx, ny)
                    if not self._is_valid_square(target_sq):
                        break
                    target = self.get_piece(target_sq)
                    if target:
                        if target.color != piece.color:
                            moves.append(target_sq)
                        break
                    moves.append(target_sq)

        elif piece.type == "giraffe":
            # (1, 4) jumper
            offsets = [
                (1, 4), (1, -4), (-1, 4), (-1, -4),
                (4, 1), (4, -1), (-4, 1), (-4, -1)
            ]
            for dx, dy in offsets:
                nx, ny = x + dx, y + dy
                target_sq = self._coords_to_square(nx, ny)
                if self._is_valid_square(target_sq):
                    target = self.get_piece(target_sq)
                    if not target or target.color != piece.color:
                        moves.append(target_sq)

        elif piece.type == "camel":
            # (1, 3) jumper
            offsets = [
                (1, 3), (1, -3), (-1, 3), (-1, -3),
                (3, 1), (3, -1), (-3, 1), (-3, -1)
            ]
            for dx, dy in offsets:
                nx, ny = x + dx, y + dy
                target_sq = self._coords_to_square(nx, ny)
                if self._is_valid_square(target_sq):
                    target = self.get_piece(target_sq)
                    if not target or target.color != piece.color:
                        moves.append(target_sq)

        return moves

    def make_move(self, from_sq: str, to_sq: str, variant: str = "standard"):
        piece = self.get_piece(from_sq)
        if not piece:
            raise ValueError("No piece at starting square")

        target_piece = self.get_piece(to_sq)
        is_capture = target_piece is not None

        del self.grid[from_sq]
        self.grid[to_sq] = piece

        if variant == "atomic" and is_capture:
            self._handle_atomic_explosion(to_sq)

        if variant == "gravity":
            self.apply_gravity()

        # Update active color (simplified)
        self.active_color = "black" if self.active_color == "white" else "white"
        if self.active_color == "white":
            self.fullmove_number += 1

    def _handle_atomic_explosion(self, center_sq: str):
        if center_sq in self.grid:
            del self.grid[center_sq]

        cx, cy = self._square_to_coords(center_sq)

        for dx in [-1, 0, 1]:
            for dy in [-1, 0, 1]:
                if dx == 0 and dy == 0: continue

                nx, ny = cx + dx, cy + dy
                neighbor_sq = self._coords_to_square(nx, ny)

                if self._is_valid_square(neighbor_sq):
                    neighbor_piece = self.get_piece(neighbor_sq)
                    if neighbor_piece and neighbor_piece.type != "pawn":
                         del self.grid[neighbor_sq]

    def apply_gravity(self):
        # Iterate over each file (column)
        for x in range(8):
            # Collect pieces in this file, sorted by rank (y)
            pieces_in_file = []
            for y in range(8):
                sq = self._coords_to_square(x, y)
                piece = self.grid.get(sq)
                if piece:
                    pieces_in_file.append(piece)
                    del self.grid[sq]

            # Re-place pieces starting from bottom (y=0)
            for i, piece in enumerate(pieces_in_file):
                new_sq = self._coords_to_square(x, i)
                self.grid[new_sq] = piece
