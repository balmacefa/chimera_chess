# API Design Document for Chimera Chess

## Overview
This document outlines the REST API and WebSocket events required for the **Chimera Chess** frontend to communicate with the backend. It focuses on room management, game creation, and real-time gameplay updates.

## Base URL
`http://api.chimerachess.com/v1` (Example)

## Authentication
*(TBD: Assuming JWT or Session-based auth for player identification, or anonymous IDs for guests)*

---

## 1. Room Management

### List Active Rooms
Retrieves a list of public rooms available to join.
- **Endpoint**: `GET /rooms`
- **Query Params**:
  - `variant` (optional): Filter by variant type (e.g., `atomic`, `gravity`, `odd`).
  - `limit` (optional): Number of results (default 20).
- **Response**:
  ```json
  [
    {
      "id": "room_12345",
      "name": "Atomic Battle",
      "variant": "atomic",
      "players": 1,
      "max_players": 2,
      "time_control": "5+3",
      "created_at": "2023-10-27T10:00:00Z"
    }
  ]
  ```

### Create a Room
Creates a new game room with specific settings.
- **Endpoint**: `POST /rooms`
- **Body**:
  ```json
  {
    "variant": "standard", // "atomic", "gravity", "odd"
    "visibility": "public", // "private"
    "color": "random", // "white", "black"
    "time_control": {
      "minutes": 10,
      "increment": 0
    }
  }
  ```
- **Response**:
  ```json
  {
    "room_id": "room_67890",
    "join_url": "https://chimerachess.com/play/room_67890",
    "player_side": "white"
  }
  ```

### Join a Room
Allows a player to join an existing room.
- **Endpoint**: `POST /rooms/{room_id}/join`
- **Body**: (Empty or with player details if needed)
- **Response**:
  ```json
  {
    "success": true,
    "game_id": "game_abcde",
    "current_fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    "side": "black"
  }
  ```

### Get Room Details
Fetches the current state of a room/game.
- **Endpoint**: `GET /rooms/{room_id}`
- **Response**:
  ```json
  {
    "id": "room_12345",
    "status": "active",
    "variant": "atomic",
    "fen": "...",
    "players": {
      "white": "Player1",
      "black": "Player2"
    }
  }
  ```

---

## 2. Gameplay (WebSocket)

Real-time communication is handled via WebSockets to ensure low latency.

**Connection Endpoint**: `ws://api.chimerachess.com/ws/game/{game_id}`

### Client -> Server Events

#### `make_move`
Sent when a player attempts a move.
```json
{
  "type": "make_move",
  "payload": {
    "from": "e2",
    "to": "e4",
    "promotion": "q" // Optional
  }
}
```

#### `resign`
Sent when a player resigns.
```json
{
  "type": "resign"
}
```

#### `chat_message`
Sent to post a message in the room chat.
```json
{
  "type": "chat_message",
  "payload": {
    "text": "Good game!"
  }
}
```

### Server -> Client Events

#### `game_state`
Broadcasted after a valid move is made.
```json
{
  "type": "game_state",
  "payload": {
    "fen": "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    "last_move": { "from": "e2", "to": "e4" },
    "turn": "black",
    "clocks": { "white": 598, "black": 600 }
  }
}
```

#### `move_validation_error`
Sent if the move was illegal.
```json
{
  "type": "error",
  "payload": {
    "message": "Illegal move: King is in check."
  }
}
```

#### `game_over`
Broadcasted when the game ends.
```json
{
  "type": "game_over",
  "payload": {
    "result": "white_wins",
    "reason": "checkmate"
  }
}
```

#### `chat_message`
Broadcasted when a new chat message arrives.
```json
{
  "type": "chat_message",
  "payload": {
    "sender": "Opponent",
    "text": "Good game!"
  }
}
```

---

## 3. Game Validation (REST Helper)

As mentioned in the Technical Design Document, a stateless validation endpoint is also available for pre-move checks (e.g., highlighting legal squares).

- **Endpoint**: `POST /api/validate/{game_id}`
- **Body**:
  ```json
  {
    "from": "e2",
    "to": "e4",
    "variant": "standard"
  }
  ```
- **Response**:
  ```json
  {
    "valid": true,
    "new_fen": "..."
  }
  ```
