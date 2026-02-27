import pytest
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.infrastructure.database import Base
from app.infrastructure.repository import SQLiteRepository
from app.domain.models import Board, Piece

# Use an in-memory SQLite database for testing
DATABASE_URL = "sqlite:///:memory:"

@pytest.fixture
def session():
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def test_save_and_load_game(session):
    repo = SQLiteRepository(session)
    game_id = "game_123"
    variant = "standard"
    fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" # Simplified representation

    # Save
    repo.save_game(game_id, fen, variant)

    # Load
    game_data = repo.load_game(game_id)
    assert game_data is not None
    assert game_data["id"] == game_id
    assert game_data["variant"] == variant
    assert game_data["fen"] == fen

def test_load_non_existent_game(session):
    repo = SQLiteRepository(session)
    game_data = repo.load_game("non_existent")
    assert game_data is None

def test_update_game(session):
    repo = SQLiteRepository(session)
    game_id = "game_456"
    repo.save_game(game_id, "initial_fen", "atomic")

    # Update
    repo.save_game(game_id, "updated_fen", "atomic")

    game_data = repo.load_game(game_id)
    assert game_data["fen"] == "updated_fen"
