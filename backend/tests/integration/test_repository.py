import pytest
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from app.infrastructure.database import Base
from app.infrastructure.repository import SQLiteRepository

# Use an in-memory SQLite database for testing (aiosqlite)
DATABASE_URL = "sqlite+aiosqlite:///:memory:"

@pytest.fixture
async def session():
    engine = create_async_engine(DATABASE_URL, connect_args={"check_same_thread": False})

    async with engine.begin() as conn:
         await conn.run_sync(Base.metadata.create_all)

    AsyncSessionLocal = async_sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )

    async with AsyncSessionLocal() as db:
        yield db

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest.mark.asyncio
async def test_save_and_load_game(session):
    repo = SQLiteRepository(session)
    game_id = "game_123"
    variant = "standard"
    fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"

    # Save
    await repo.save_game(game_id, fen, variant)

    # Load
    game_data = await repo.load_game(game_id)
    assert game_data is not None
    assert game_data["id"] == game_id
    assert game_data["variant"] == variant
    assert game_data["fen"] == fen

@pytest.mark.asyncio
async def test_load_non_existent_game(session):
    repo = SQLiteRepository(session)
    game_data = await repo.load_game("non_existent")
    assert game_data is None

@pytest.mark.asyncio
async def test_update_game(session):
    repo = SQLiteRepository(session)
    game_id = "game_456"
    await repo.save_game(game_id, "initial_fen", "atomic")

    # Update
    await repo.save_game(game_id, "updated_fen", "atomic")

    game_data = await repo.load_game(game_id)
    assert game_data["fen"] == "updated_fen"
