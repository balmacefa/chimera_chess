'use client';

import React, { useState } from 'react';
import { Chess, Move } from 'chess.js';
import { Chessboard } from 'react-chessboard';

interface ChessMinigameProps {
  initialFen: string;
  title: string;
  description: string;
  successMessage: string;
  // Function to evaluate if the move made by the user fulfills the winning condition
  checkWinCondition: (move: Move, game: Chess) => boolean;
  // Function to evaluate if the move made by the user is a fail condition
  checkFailCondition?: (move: Move, game: Chess) => boolean;
  failMessage?: string;
  onSuccess?: () => void;
  onFail?: () => void;
  orientation?: 'white' | 'black';
}

export default function ChessMinigame({
  initialFen,
  title,
  description,
  successMessage,
  checkWinCondition,
  checkFailCondition,
  failMessage,
  onSuccess,
  onFail,
  orientation = 'white',
}: ChessMinigameProps) {
  const [game, setGame] = useState(new Chess(initialFen));
  const [fen, setFen] = useState(initialFen);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [message, setMessage] = useState('');

  // Keep track of the last initialFen used to reset state if it changes
  const [prevInitialFen, setPrevInitialFen] = useState(initialFen);

  if (initialFen !== prevInitialFen) {
    const newGame = new Chess(initialFen);
    setPrevInitialFen(initialFen);
    setGame(newGame);
    setFen(newGame.fen());
    setIsSuccess(false);
    setIsFail(false);
    setMessage('');
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    if (isSuccess || isFail) return false;

    try {
      // Validate the move
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Always promote to queen for simplicity in minigames
      });

      if (move) {
        setFen(game.fen());

        if (checkWinCondition(move, game)) {
          setIsSuccess(true);
          setMessage(successMessage);
          if (onSuccess) onSuccess();
        } else if (checkFailCondition && checkFailCondition(move, game)) {
          setIsFail(true);
          setMessage(failMessage || 'Incorrect move. Try again!');
          if (onFail) onFail();
        } else {
            // Revert invalid move for minigame logic if it doesn't meet the win/fail condition
            game.undo();
            setFen(game.fen());
            return false;
        }

        return true;
      }
    } catch {
      // Invalid move
      return false;
    }
    return false;
  }

  function handleRetry() {
    const newGame = new Chess(initialFen);
    setGame(newGame);
    setFen(newGame.fen());
    setIsSuccess(false);
    setIsFail(false);
    setMessage('');
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-2/3 max-w-2xl">
        <div className="rounded-lg overflow-hidden border-2 border-neutral-700 shadow-2xl">
          <Chessboard options={{
            position: fen,
            onPieceDrop: ({ sourceSquare, targetSquare }) => {
              if (sourceSquare && targetSquare) {
                return onDrop(sourceSquare, targetSquare);
              }
              return false;
            },
            boardOrientation: orientation,
            darkSquareStyle: { backgroundColor: '#739552' },
            lightSquareStyle: { backgroundColor: '#ebecd0' }
          }} />
        </div>
      </div>

      <div className="w-full md:w-1/3 flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold text-amber-500 mb-2">{title}</h2>
          <p className="text-neutral-300 text-lg leading-relaxed">{description}</p>
        </div>

        {message && (
          <div className={`p-4 rounded-lg border \${isSuccess ? 'bg-green-900/30 border-green-500 text-green-200' : 'bg-red-900/30 border-red-500 text-red-200'}`}>
            <p className="font-semibold">{message}</p>
          </div>
        )}

        {(isSuccess || isFail) && (
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-medium border border-neutral-600 transition-colors"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}