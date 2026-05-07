'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, Undo2, FlipVertical, History, Info } from 'lucide-react';

export default function LocalGamePage() {
  const [game, setGame] = useState(new Chess());
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');
  const [autoFlip, setAutoFlip] = useState(false);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<string>('');

  const updateStatus = useCallback((g: Chess) => {
    if (g.isCheckmate()) {
      setGameStatus(`¡Jaque Mate! Ganador: ${g.turn() === 'w' ? 'Negras' : 'Blancas'}`);
    } else if (g.isDraw()) {
      setGameStatus('¡Empate!');
    } else if (g.isCheck()) {
      setGameStatus('¡Jaque!');
    } else {
      setGameStatus('');
    }
  }, []);

  function onDrop(sourceSquare: string, targetSquare: string) {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Default to queen for simplicity
      });

      if (move === null) return false;

      const newGame = new Chess(game.fen());
      setGame(newGame);
      setMoveHistory(newGame.history());
      updateStatus(newGame);

      if (autoFlip) {
        setBoardOrientation(newGame.turn() === 'w' ? 'white' : 'black');
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  function resetGame() {
    const newGame = new Chess();
    setGame(newGame);
    setMoveHistory([]);
    setGameStatus('');
    setBoardOrientation('white');
  }

  function undoMove() {
    game.undo();
    const newGame = new Chess(game.fen());
    setGame(newGame);
    setMoveHistory(newGame.history());
    updateStatus(newGame);
    
    if (autoFlip) {
      setBoardOrientation(newGame.turn() === 'w' ? 'white' : 'black');
    }
  }

  function flipBoard() {
    setBoardOrientation(boardOrientation === 'white' ? 'black' : 'white');
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-amber-500" />
            </Link>
            <h1 className="text-3xl font-bold text-amber-500">Juego Local 1vs1</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Info className="w-4 h-4" />
            <span>Mismo dispositivo</span>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Board Section */}
          <div className="flex-1 max-w-2xl mx-auto lg:mx-0 w-full">
            <div className="relative rounded-xl overflow-hidden border-4 border-neutral-800 shadow-2xl bg-neutral-800">
              <Chessboard 
                position={game.fen()} 
                onPieceDrop={onDrop} 
                boardOrientation={boardOrientation}
                customDarkSquareStyle={{ backgroundColor: '#739552' }}
                customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
              />
              
              {gameStatus && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 animate-in fade-in zoom-in duration-300">
                  <div className="bg-neutral-800 p-8 rounded-2xl border-2 border-amber-500 text-center shadow-2xl max-w-sm">
                    <h2 className="text-3xl font-bold text-amber-500 mb-4">Fin del Juego</h2>
                    <p className="text-xl mb-6">{gameStatus}</p>
                    <button 
                      onClick={resetGame}
                      className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Nueva Partida
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Player Indicators */}
            <div className="mt-6 flex justify-between items-center bg-neutral-800/50 p-4 rounded-xl border border-neutral-700">
              <div className={`flex flex-col gap-1 px-4 py-2 rounded-lg transition-all ${game.turn() === 'w' ? 'bg-amber-500/20 ring-1 ring-amber-500' : 'opacity-40'}`}>
                <span className="text-xs uppercase tracking-wider font-bold text-amber-500">Blancas</span>
                <span className="text-lg font-semibold">{game.turn() === 'w' ? 'Tu turno' : 'Esperando...'}</span>
              </div>
              <div className="h-8 w-px bg-neutral-700 mx-4" />
              <div className={`flex flex-col gap-1 px-4 py-2 rounded-lg transition-all text-right ${game.turn() === 'b' ? 'bg-amber-500/20 ring-1 ring-amber-500' : 'opacity-40'}`}>
                <span className="text-xs uppercase tracking-wider font-bold text-amber-500">Negras</span>
                <span className="text-lg font-semibold">{game.turn() === 'b' ? 'Tu turno' : 'Esperando...'}</span>
              </div>
            </div>
          </div>

          {/* Controls & History Section */}
          <div className="lg:w-80 flex flex-col gap-6">
            <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <FlipVertical className="w-5 h-5 text-amber-500" />
                Controles
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={flipBoard}
                  className="flex items-center justify-center gap-2 py-3 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors border border-neutral-600"
                >
                  <FlipVertical className="w-4 h-4" />
                  Girar Tablero
                </button>
                
                <label className="flex items-center justify-between px-4 py-3 bg-neutral-700/50 rounded-lg border border-neutral-600 cursor-pointer hover:bg-neutral-700 transition-colors">
                  <span className="text-sm font-medium">Giro Automático</span>
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={autoFlip}
                    onChange={(e) => setAutoFlip(e.target.checked)}
                  />
                  <div className="relative w-11 h-6 bg-neutral-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button 
                    onClick={undoMove}
                    disabled={moveHistory.length === 0}
                    className="flex items-center justify-center gap-2 py-2 bg-neutral-700 hover:bg-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors border border-neutral-600"
                  >
                    <Undo2 className="w-4 h-4" />
                    Deshacer
                  </button>
                  <button 
                    onClick={resetGame}
                    className="flex items-center justify-center gap-2 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors border border-neutral-600"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reiniciar
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6 flex flex-col gap-4 flex-1">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <History className="w-5 h-5 text-amber-500" />
                Historial
              </h3>
              
              <div className="overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                {moveHistory.length === 0 ? (
                  <p className="text-neutral-500 text-sm italic text-center py-4">No hay movimientos aún</p>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => (
                      <React.Fragment key={i}>
                        <div className="flex gap-2 text-sm">
                          <span className="text-neutral-500 w-4">{i + 1}.</span>
                          <span className="font-medium">{moveHistory[i * 2]}</span>
                        </div>
                        {moveHistory[i * 2 + 1] && (
                          <div className="flex gap-2 text-sm">
                            <span className="font-medium">{moveHistory[i * 2 + 1]}</span>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
