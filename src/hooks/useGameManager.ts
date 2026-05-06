import { useState, useCallback } from 'react';

export interface Move {
  id: string;
  player: string;
  action: string;
  timestamp: number;
}

export function useGameManager() {
  const [moves, setMoves] = useState<Move[]>([]);
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

  const makeMove = useCallback((player: string, action: string) => {
    const newMove: Move = {
      id: Math.random().toString(36).substring(2, 9),
      player,
      action,
      timestamp: Date.now(),
    };

    setMoves((prev) => {
      const updatedMoves = [...prev, newMove];
      // Fire and forget LLM update
      requestNarrativeUpdate(updatedMoves);
      return updatedMoves;
    });
  }, []);

  const undoMove = useCallback(() => {
    setMoves((prev) => {
      if (prev.length === 0) return prev;
      const updatedMoves = prev.slice(0, -1);
      requestNarrativeUpdate(updatedMoves);
      return updatedMoves;
    });
  }, []);

  return {
    moves,
    makeMove,
    undoMove,
    narrative,
    suggestions,
    isLoadingLLM
  };
}
