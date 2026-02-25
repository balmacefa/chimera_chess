# chimera_chess


Technical Design Document (TDD) v2: Modular & Creative Chess Platform
This version focuses on the technical specification for a decoupled Python (Backend) and React (Frontend) architecture, specifically engineered to support non-standard physics and movement vectors.
1. System Architecture: The Hexagonal Core
The system is divided into the Domain (Pure Logic), Adapters (Persistence/UI), and Ports (Interfaces).
Backend (Python)
 * Domain Layer: Contains Board, Piece, and Move objects. No dependencies on database or web frameworks.
 * Service Layer: Manages game flow, AI move generation, and rule injection.
 * Infrastructure Layer: Implements SQLiteRepository via SQLAlchemy.
Frontend (React)
 * State Management: Functional components using useReducer to mirror the backend board state.
 * Engine Interface: Async hooks to communicate with the Python API via REST/WebSockets.
2. Decoupled Data Layer (Persistence)
Using Abstract Base Classes (ABC) ensures the logic is not coupled to SQLite.
from abc import ABC, abstractmethod

class IGameRepository(ABC):
    @abstractmethod
    def save_game(self, game_id: str, fen: str, variant: str):
        pass

    @abstractmethod
    def load_game(self, game_id: str) -> dict:
        pass

class SQLiteRepository(IGameRepository):
    # Concrete implementation using SQLAlchemy
    def save_game(self, game_id, fen, variant):
        # SQL logic here
        pass

3. Creative Game Mode Specifications
A. Atomic Mode (Explosive Captures)
 * Logic: Captures trigger a 3x3 explosion radius.
 * Injected Rule: AtomicCaptureStrategy removes all non-pawn pieces in the perimeter and deletes the capturing piece.
 * Win Condition: King is removed by explosion.
B. Gravity Mode (Vertical Settlement)
 * Logic: Post-move board "settling."
 * Injected Rule: GravitySettlementStrategy iterates through each file. If a piece has an empty square below it (y-1), it is moved down until it hits the board edge or another piece.
 * Win Condition: Checkmate evaluated after the settle.
C. Odd Move Mode (Leapers & Riders)
 * Logic: Vector-based movement definitions.
 * Data Structure: Pieces are defined by tuples of (dx, dy).
   * Giraffe: [(1, 4), (4, 1), (-1, 4), ...]
   * Camel: [(1, 3), (3, 1), ...]
 * Implementation: The MovementEngine iterates through these vectors instead of hardcoded sliding/stepping logic.
4. Test-Driven Development (TDD) Drives
Drive 1: Movement Validation (Unit Test)
Goal: Ensure "Odd" pieces respect board boundaries.
def test_giraffe_boundary_check():
    board = Board(variant="odd")
    # Giraffe at H1 (7,0) trying to move (1,4) to I5 (out of bounds)
    moves = board.get_legal_moves(at="H1")
    assert "I5" not in moves

Drive 2: Gravity Settlement (Integration Test)
Goal: Verify multi-piece stacking during gravity shifts.
def test_gravity_stacking():
    board = Board(variant="gravity")
    board.place("R", "E8")
    board.place("B", "E7")
    board.apply_gravity()
    # Bishop should fall to E1, Rook to E2
    assert board.at("E1") == "B"
    assert board.at("E2") == "R"

5. Frontend Component Architecture (React)
Component Hierarchy
 * GameContainer: Manages API polling and global gameState.
 * ChessBoard: Renders an 8 \times 8 grid.
 * Square: Handles Drag-and-Drop events.
 * PieceRenderer: Maps backend IDs to SVGs.
   * P \rightarrow Pawn
   * G \rightarrow Giraffe (Custom SVG)
Custom Hook: useMoveValidator
const useMoveValidator = (gameId, variant) => {
  const validate = async (from, to) => {
    const response = await fetch(`/api/validate/${gameId}`, {
      method: 'POST',
      body: JSON.stringify({ from, to, variant })
    });
    return response.json(); // { valid: true, newFen: "..." }
  };
  return { validate };
};

6. Database Schema (SQLite)
| Table | Column | Type | Constraints |
|---|---|---|---|
| Games | id | UUID | PK |
| Games | variant | VARCHAR | atomic, gravity, odd |
| Games | fen | TEXT | Current state |
| Moves | id | INTEGER | PK, AI |
| Moves | game_id | UUID | FK |
| Moves | notation | VARCHAR | e.g., "G-H1-G5" |

