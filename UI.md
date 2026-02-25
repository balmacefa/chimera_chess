# UI Design Document for Chimera Chess

## Overview
This document outlines the user interface requirements for the **Chimera Chess** platform. The application is a multi-room online chess platform that supports standard and creative game variants (Atomic, Gravity, Odd Move). The design should emphasize clarity, responsiveness, and a modern aesthetic suitable for serious chess players and variant enthusiasts alike.

## Design System

### Color Palette
- **Primary**: Deep Blue / Charcoal (for board squares, headers).
- **Secondary**: Light Cream / Ivory (for light squares, text on dark backgrounds).
- **Accent**: Gold / Amber (for active piece highlights, "Your Turn" indicators).
- **Danger**: Red / Crimson (for captured pieces, illegal moves, "Check" warnings).
- **Success**: Green (for "Game Won", valid moves).

### Typography
- **Headings**: Clean sans-serif font (e.g., Roboto, Open Sans) for readability.
- **Body Text**: Monospace for move notation (e.g., `e4`, `Nf3`) and chat.
- **Board Labels**: Clear, high-contrast font for file (a-h) and rank (1-8) labels.

### Icons & Assets
- **Chess Pieces**:
  - Standard SVG set for Pawn, Knight, Bishop, Rook, Queen, King.
  - Custom SVG assets for **Giraffe** and **Camel** (for Odd Move Mode).
- **UI Icons**:
  - Settings (gear).
  - Chat (bubble).
  - Undo/Redo (arrows).
  - Resign (flag).
  - Draw (handshake).
  - Flip Board (refresh/rotate icon).

---

## Key Screens

### 1. Landing Page / Lobby
The entry point for users. It should be inviting and immediately functional.

**Layout:**
- **Hero Section**:
  - Title: "Chimera Chess"
  - Subtitle: "Play standard and exotic chess variants online."
  - "Create Room" button (Primary CTA).
  - "Join Room" input field (for private room codes).

- **Active Rooms List**:
  - A table or grid displaying currently open public rooms.
  - Columns:
    - **Room Name/ID**
    - **Variant** (Standard, Atomic, Gravity, Odd)
    - **Players** (e.g., 1/2 or "Waiting...")
    - **Time Control** (e.g., 5+3, 10+0)
    - **Action**: "Join" button.

### 2. Create Room Modal
Invoked from the Lobby. Allows users to configure a new game.

**Form Fields:**
- **Variant Selection**: Dropdown or Cards.
  - Options: *Standard*, *Atomic*, *Gravity*, *Odd Move*.
- **Visibility**: Toggle.
  - *Public*: Listed in the lobby.
  - *Private*: Generates a shareable link/code.
- **Color Choice**: Radio buttons.
  - *White*, *Black*, *Random*.
- **Time Control**: Dropdowns.
  - *Minutes per side*: 1, 3, 5, 10, 15, 30.
  - *Increment (seconds)*: 0, 1, 2, 3, 5, 10.

### 3. Game Room
The main interface where gameplay happens.

**Layout:**
- **Central Area**: The Chess Board.
  - Responsive, square aspect ratio.
  - Rank (1-8) and File (a-h) labels on the edges.
  - **Drag-and-Drop** functionality for moving pieces.
  - **Click-to-Move** alternative for accessibility.

- **Sidebar (Left or Right):**
  - **Player Info (Top - Opponent)**: Name, Rating (if applicable), Timer, Captured Pieces.
  - **Player Info (Bottom - You)**: Name, Rating, Timer, Captured Pieces.
  - **Move History**: Scrollable list of moves in algebraic notation (e.g., `1. e4 e5`).
  - **Game Controls**:
    - *Resign*, *Offer Draw*, *Abort* (if game hasn't started).
  - **Chat**: Tabbed area for Room Chat and System Logs.

- **Post-Game Modal**:
  - Result: "Checkmate - White Wins", "Stalemate", "Draw by Repetition".
  - Options: "Rematch", "New Game", "Back to Lobby", "Analyze Board".

---

## Variant-Specific UI Requirements

### A. Atomic Mode
- **Visual Cues**:
  - When a capture occurs, trigger a visual "explosion" effect covering the 3x3 area around the capture square.
  - Briefly highlight the affected squares in red.
  - Remove all non-pawn pieces in the radius instantly.

### B. Gravity Mode
- **Animations**:
  - Pieces should visually "fall" or slide down to the lowest available square in their file after a move is completed.
  - The animation should be smooth (approx. 300ms) to allow players to track the board state changes.

### C. Odd Move Mode (Leapers & Riders)
- **Piece Representation**:
  - Use distinct icons for **Giraffe** and **Camel** to distinguish them from standard Knights or Bishops.
  - **Tooltips**: Hovering over these special pieces should display their movement vector (e.g., "Giraffe: (1,4) Leaper").
- **Move Visualization**:
  - When selecting an "Odd" piece, highlight all legal destination squares clearly on the board to help players learn the movement patterns.
