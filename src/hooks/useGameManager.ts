import { useState, useCallback } from 'react';

export interface PositionMap {
  [key: string]: { x: number; y: number };
}

export interface Move {
  id: string;
  player: string;
  action: string;
  timestamp: number;
  positionsAfterMove: PositionMap;
}

export function useGameManager(initialPositions: PositionMap) {
  const [moves, setMoves] = useState<Move[]>([]);
  const [currentPositions, setCurrentPositions] = useState<PositionMap>(initialPositions);
  const [narrative, setNarrative] = useState<string>('Esperando que comience la batalla...');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingLLM, setIsLoadingLLM] = useState(false);

  const requestNarrativeUpdate = async (currentMoves: Move[]) => {
    setIsLoadingLLM(true);
    try {
      const response = await fetch('/api/narrative', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moves: currentMoves }),
      });

      if (response.ok) {
        const data = await response.json();
        setNarrative(data.narrative);
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error('Failed to fetch narrative update', error);
    } finally {
      setIsLoadingLLM(false);
    }
  };

  const makeMove = useCallback((player: string, action: string, newPositions: PositionMap) => {
    const newMove: Move = {
      id: Math.random().toString(36).substring(2, 9),
      player,
      action,
      timestamp: Date.now(),
      positionsAfterMove: newPositions,
    };

    setMoves((prev) => {
      const updatedMoves = [...prev, newMove];
      requestNarrativeUpdate(updatedMoves);
      return updatedMoves;
    });
    setCurrentPositions(newPositions);
  }, []);

  const undoMove = useCallback(() => {
    setMoves((prev) => {
      if (prev.length === 0) return prev;
      const updatedMoves = prev.slice(0, -1);

      // Restore previous positions
      if (updatedMoves.length > 0) {
        setCurrentPositions(updatedMoves[updatedMoves.length - 1].positionsAfterMove);
      } else {
        setCurrentPositions(initialPositions);
      }

      requestNarrativeUpdate(updatedMoves);
      return updatedMoves;
    });
  }, [initialPositions]);

  return {
    moves,
    makeMove,
    undoMove,
    currentPositions,
    narrative,
    suggestions,
    isLoadingLLM
  };
}
