'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Chessboard } from 'react-chessboard';

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];
const allSquares = files.flatMap(f => ranks.map(r => f + r));

export default function MemorizePositionsMinigame() {
  const [targetSquare, setTargetSquare] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    pickNewSquare();
  }, []);

  const pickNewSquare = () => {
    const randomSquare = allSquares[Math.floor(Math.random() * allSquares.length)];
    setTargetSquare(randomSquare);
  };

  const onSquareClick = ({ square }: { piece: any, square: string }) => {
    if (square === targetSquare) {
      setScore(s => s + 1);
      setMessage('¡Correcto!');
      setIsError(false);
      pickNewSquare();
    } else {
      setScore(0);
      setMessage(`Incorrecto. Ese era ${square}. Busca ${targetSquare}`);
      setIsError(true);
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4 sm:p-8">
      <Link href="/minigames" className="text-amber-500 hover:underline mb-8 inline-block">&larr; Volver a Minijuegos</Link>

      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-8 items-start w-full">
          <div className="w-full md:w-2/3 max-w-2xl aspect-square">
            <div className="rounded-lg overflow-hidden border-2 border-neutral-700 shadow-2xl w-full h-full">
              <Chessboard
                options={{
                  position: '8/8/8/8/8/8/8/8 w - - 0 1',
                  onSquareClick: onSquareClick,
                  boardOrientation: 'white',
                  darkSquareStyle: { backgroundColor: '#739552' },
                  lightSquareStyle: { backgroundColor: '#ebecd0' },
                  showNotation: false
                }}
              />
            </div>
          </div>

          <div className="w-full md:w-1/3 flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-bold text-amber-500 mb-2">Visión del Tablero</h2>
              <p className="text-neutral-300 text-lg leading-relaxed">
                Aprende y memoriza las posiciones en el tablero. Haz clic en la casilla que se te pide lo más rápido posible. Las coordenadas están ocultas.
              </p>
            </div>

            <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 flex flex-col items-center gap-4">
              <span className="text-neutral-400 text-lg">Encuentra la casilla:</span>
              <span className="text-6xl font-black text-amber-400">{targetSquare || '?'}</span>
            </div>

            <div className="bg-neutral-800 p-4 rounded-xl border border-neutral-700 flex justify-between items-center">
              <span className="text-neutral-400 font-medium">Racha actual:</span>
              <span className="text-3xl font-bold text-white">{score}</span>
            </div>

            {message && (
              <div className={`p-4 rounded-lg border ${!isError ? 'bg-green-900/30 border-green-500 text-green-200' : 'bg-red-900/30 border-red-500 text-red-200'}`}>
                <p className="font-semibold">{message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
