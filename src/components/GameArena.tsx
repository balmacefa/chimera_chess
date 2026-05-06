import React, { useState } from 'react';
import { useGameManager } from '../hooks/useGameManager';
import { ScrollText, Lightbulb, RotateCcw, Swords } from 'lucide-react';

interface GameArenaProps {
  player1Name: string;
}

export default function GameArena({ player1Name }: GameArenaProps) {
  const { moves, makeMove, undoMove, narrative, suggestions, isLoadingLLM } = useGameManager();
  const [currentPlayer, setCurrentPlayer] = useState(player1Name || 'Jugador 1');

  const handleSuggestClick = (suggestion: string) => {
    makeMove(currentPlayer, suggestion);
    // Simple toggle for local 1v1
    setCurrentPlayer(prev => prev === (player1Name || 'Jugador 1') ? 'Jugador 2' : (player1Name || 'Jugador 1'));
  };

  const handleCustomMove = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const moveStr = formData.get('move') as string;
    if (moveStr) {
      makeMove(currentPlayer, moveStr);
      setCurrentPlayer(prev => prev === (player1Name || 'Jugador 1') ? 'Jugador 2' : (player1Name || 'Jugador 1'));
      e.currentTarget.reset();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

      {/* Tablero Principal (Placeholder) */}
      <div className="lg:col-span-2 bg-neutral-800 border border-neutral-700 rounded-xl p-6 flex flex-col min-h-[400px]">
        <div className="flex justify-between items-center mb-4 border-b border-neutral-700 pb-4">
          <h2 className="text-xl font-bold text-amber-500 flex items-center gap-2">
            <Swords className="w-5 h-5" /> Arena de Combate
          </h2>
          <div className="text-neutral-300 font-medium bg-neutral-900 px-4 py-1 rounded-full">
            Turno: <span className="text-white">{currentPlayer}</span>
          </div>
        </div>

        {/* Aquí iría el renderizado del mapa isométrico */}
        <div className="flex-grow bg-neutral-900 rounded-lg border border-neutral-700 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900 via-neutral-900 to-neutral-900"></div>
          <p className="text-neutral-500 italic z-10 flex flex-col items-center gap-2">
            <span>[ Vista Isométrica 2D ]</span>
            <span className="text-sm">Interacciones del mapa irían aquí</span>
          </p>
        </div>

        {/* Controles del juego */}
        <div className="mt-4 flex gap-4">
          <form onSubmit={handleCustomMove} className="flex-grow flex gap-2">
            <input
              name="move"
              type="text"
              placeholder="Escribe un movimiento (ej. Mover al norte, Atacar)"
              className="flex-grow bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
            />
            <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Acción
            </button>
          </form>
          <button
            onClick={undoMove}
            disabled={moves.length === 0}
            className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Deshacer
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
