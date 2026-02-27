from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List, Dict
from app.infrastructure.database import AsyncSessionLocal
from app.infrastructure.repository import SQLiteRepository
from app.services.game_service import GameService
from contextlib import asynccontextmanager
import json

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        # Dictionary to store lists of connections per game_id
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, game_id: str):
        await websocket.accept()
        if game_id not in self.active_connections:
            self.active_connections[game_id] = []
        self.active_connections[game_id].append(websocket)

    def disconnect(self, websocket: WebSocket, game_id: str):
        if game_id in self.active_connections:
            if websocket in self.active_connections[game_id]:
                self.active_connections[game_id].remove(websocket)
            if not self.active_connections[game_id]:
                del self.active_connections[game_id]

    async def broadcast(self, message: dict, game_id: str):
        if game_id in self.active_connections:
            for connection in self.active_connections[game_id]:
                await connection.send_json(message)

manager = ConnectionManager()

@asynccontextmanager
async def get_db_session():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

@router.websocket("/ws/game/{game_id}")
async def websocket_endpoint(websocket: WebSocket, game_id: str):
    await manager.connect(websocket, game_id)

    try:
        while True:
            data = await websocket.receive_json()
            msg_type = data.get("type")

            if msg_type == "make_move":
                payload = data.get("payload", {})
                from_sq = payload.get("from")
                to_sq = payload.get("to")

                try:
                    async with get_db_session() as db:
                        repo = SQLiteRepository(db)
                        service = GameService(repo)
                        result = await service.make_move(game_id, from_sq, to_sq)

                    if result["success"]:
                         response = {
                             "type": "game_state",
                             "payload": {
                                 "fen": result["fen"],
                                 "last_move": {"from": from_sq, "to": to_sq}
                             }
                         }
                         await manager.broadcast(response, game_id)
                    else:
                        await websocket.send_json({
                            "type": "error",
                            "payload": {"message": result.get("error")}
                        })
                except Exception as e:
                     await websocket.send_json({
                            "type": "error",
                            "payload": {"message": str(e)}
                        })

            elif msg_type == "chat_message":
                await manager.broadcast({
                    "type": "chat_message",
                    "payload": data.get("payload")
                }, game_id)

    except WebSocketDisconnect:
        manager.disconnect(websocket, game_id)
    except Exception as e:
        manager.disconnect(websocket, game_id)
