from fastapi.testclient import TestClient
from app.main import app
import pytest

# TestClient supports websockets
def test_websocket_connect():
    client = TestClient(app)
    # Just verify connection doesn't crash
    with client.websocket_connect("/ws/game/test_room_ws") as websocket:
        pass

def test_websocket_make_move():
    client = TestClient(app)
    # Create room first
    res = client.post("/rooms", json={"variant": "standard"})
    room_id = res.json()["room_id"]

    with client.websocket_connect(f"/ws/game/{room_id}") as websocket:
        # Send move
        websocket.send_json({
            "type": "make_move",
            "payload": {
                "from": "e2",
                "to": "e4"
            }
        })

        # Expect response
        data = websocket.receive_json()
        assert data["type"] == "game_state"
        assert "fen" in data["payload"]

        # Check that the FEN actually represents the move
        assert "4P3" in data["payload"]["fen"]

def test_websocket_chat():
    client = TestClient(app)
    with client.websocket_connect("/ws/game/chat_room") as websocket:
        websocket.send_json({
            "type": "chat_message",
            "payload": {"text": "Hello"}
        })

        data = websocket.receive_json()
        assert data["type"] == "chat_message"
        assert data["payload"]["text"] == "Hello"
