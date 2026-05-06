import React, { useState } from 'react';
import { useGameManager } from '../hooks/useGameManager';
import { ScrollText, Lightbulb, RotateCcw, Swords } from 'lucide-react';

interface GameArenaProps {
  player1Name: string;
}

export default function GameArena({ player1Name }: GameArenaProps) {
  const initialPositions = {
    [player1Name || 'Jugador 1']: { x: 0, y: 0 },
    'Jugador 2': { x: 4, y: 4 }
  };

  const { moves, makeMove, undoMove, currentPositions, narrative, suggestions, isLoadingLLM } = useGameManager(initialPositions);

  // Determine whose turn it is based on move history length
  const p1Name = player1Name || 'Jugador 1';
  const currentPlayer = moves.length % 2 === 0 ? p1Name : 'Jugador 2';

  const handleSuggestClick = (suggestion: string) => {
    makeMove(currentPlayer, suggestion, currentPositions);
  };

  const gridSize = 5;

  const handleCellClick = (x: number, y: number) => {
    const isOccupied = Object.values(currentPositions).some(pos => pos.x === x && pos.y === y);

    if (isOccupied) {
      makeMove(currentPlayer, `Atacó la posición (${x}, ${y})`, currentPositions);
    } else {
      const newPositions = {
        ...currentPositions,
        [currentPlayer]: { x, y }
      };
      makeMove(currentPlayer, `Se movió a (${x}, ${y})`, newPositions);
    }
  };

  const handleUndo = () => {
    undoMove();
  };

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

      {/* Tablero Principal */}
      <div className="lg:col-span-2 bg-neutral-800 border border-neutral-700 rounded-xl p-6 flex flex-col min-h-[500px]">
        <div className="flex justify-between items-center mb-4 border-b border-neutral-700 pb-4">
          <h2 className="text-xl font-bold text-amber-500 flex items-center gap-2">
            <Swords className="w-5 h-5" /> Arena de Combate
          </h2>
          <div className="text-neutral-300 font-medium bg-neutral-900 px-4 py-1 rounded-full">
            Turno: <span className="text-white">{currentPlayer}</span>
          </div>
        </div>

        {/* Renderizado del mapa isométrico interactivo */}
        <div className="flex-grow bg-neutral-900 rounded-lg border border-neutral-700 flex items-center justify-center relative overflow-hidden perspective-1000">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900 via-neutral-900 to-neutral-900 pointer-events-none"></div>

          <div
            className="grid gap-1 p-4 transition-transform duration-500 select-none"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              transform: 'rotateX(60deg) rotateZ(-45deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            {Array.from({ length: gridSize * gridSize }).map((_, i) => {
              const x = i % gridSize;
              const y = Math.floor(i / gridSize);

              const isP1 = currentPositions[p1Name]?.x === x && currentPositions[p1Name]?.y === y;
              const isP2 = currentPositions['Jugador 2']?.x === x && currentPositions['Jugador 2']?.y === y;

              return (
                <div
                  key={i}
                  onClick={() => handleCellClick(x, y)}
                  className={`w-12 h-12 sm:w-16 sm:h-16 border border-neutral-700/50 bg-neutral-800/80 hover:bg-amber-900/50 cursor-pointer flex items-center justify-center transition-colors relative group`}
                  style={{ transform: 'translateZ(0px)' }}
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                  {isP1 && (
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center justify-center text-xs font-bold text-neutral-900"
                      style={{ transform: 'rotateZ(45deg) rotateX(-60deg) translateY(-10px)' }}
                    >
                      P1
                    </div>
                  )}
                  {isP2 && (
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center text-xs font-bold text-white"
                      style={{ transform: 'rotateZ(45deg) rotateX(-60deg) translateY(-10px)' }}
                    >
                      P2
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Controles del juego */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleUndo}
            disabled={moves.length === 0}
            className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Deshacer Último Movimiento
          </button>
        </div>
      </div>

      {/* Panel Narrativo y Sugerencias */}
      <div className="flex flex-col gap-6">

        {/* Narrativa del LLM */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-amber-500 mb-3 flex items-center gap-2">
            <ScrollText className="w-5 h-5" /> Crónica de Batalla
          </h3>
          <div className="bg-neutral-900 rounded-lg p-4 flex-grow border border-neutral-700 relative">
            {isLoadingLLM && (
              <div className="absolute top-2 right-2 flex space-x-1">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
            <p className="text-neutral-300 leading-relaxed text-sm">
              {narrative}
            </p>
          </div>
        </div>

        {/* Sugerencias Estratégicas */}
        <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-5">
          <h3 className="text-lg font-bold text-amber-500 mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" /> Sugerencias del Sabio
          </h3>
          <div className="flex flex-col gap-2">
            {suggestions.length > 0 ? (
              suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestClick(sug)}
                  disabled={isLoadingLLM}
                  className="text-left text-sm bg-neutral-900 border border-neutral-700 hover:border-amber-500 text-neutral-300 hover:text-amber-400 p-3 rounded-lg transition-all"
                >
                  {sug}
                </button>
              ))
            ) : (
              <p className="text-neutral-500 text-sm italic">Esperando contexto...</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
