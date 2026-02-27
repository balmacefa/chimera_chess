from fastapi.testclient import TestClient
from app.main import app
from unittest.mock import MagicMock, AsyncMock
from app.services.game_service import GameService
from app.infrastructure.repository import IGameRepository
import pytest

# Note: TestClient is synchronous. For full async route testing, we'd use httpx.AsyncClient.
# However, FastAPI's TestClient wraps the async app in a way that allows standard requests to work.
# The internal handlers are async, but TestClient handles the event loop for us.

def test_create_room():
    client = TestClient(app)
    response = client.post("/rooms", json={"variant": "standard"})
    assert response.status_code == 200
    data = response.json()
    assert "room_id" in data
    assert data["variant"] == "standard"

def test_get_room():
    client = TestClient(app)
    # First create
    create_res = client.post("/rooms", json={"variant": "atomic"})
    room_id = create_res.json()["room_id"]

    # Then get
    response = client.get(f"/rooms/{room_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == room_id
    assert data["variant"] == "atomic"

def test_get_room_not_found():
    client = TestClient(app)
    response = client.get("/rooms/missing_id")
    assert response.status_code == 404
