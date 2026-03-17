'use client';

import React from 'react';
import Link from 'next/link';
import ChessMinigame from '@/components/ChessMinigame';
import { Move } from 'chess.js';

export default function PawnStructureMinigame() {
  // A classic French Defense Advance structure where black needs to play c5 to challenge the center.
  // FEN: r1bqkbnr/pp1p1ppp/2n1p3/2p5/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 1 -> Let's use a simpler one
  // French advance variation: 1. e4 e6 2. d4 d5 3. e5
  // FEN for black to move: rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3
  const initialFen = "rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3";

  const handleWinCondition = (move: Move) => {
    // The correct pawn break is c5
    return move.from === 'c7' && move.to === 'c5';
  };

  const handleFailCondition = (move: Move) => {
    // If it's not c5, it's considered incorrect for this specific puzzle
    return !(move.from === 'c7' && move.to === 'c5');
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <Link href="/minigames" className="text-amber-500 hover:underline mb-8 inline-block">&larr; Volver a Minijuegos</Link>

      <div className="max-w-6xl mx-auto">
        <ChessMinigame
          initialFen={initialFen}
          orientation="black"
          title="Ruptura de Peones"
          description="En la Defensa Francesa (Variante del Avance), las blancas han establecido un fuerte centro de peones con d4 y e5. ¿Cuál es la ruptura de peones temática y fundamental para las negras para desafiar esta estructura central?"
          successMessage="¡Correcto! c5 es la ruptura vital. Ataca inmediatamente la base de la cadena de peones blanca (d4) y comienza a luchar por el control central."
          failMessage="Movimiento incorrecto. Piensa en cómo socavar el centro de peones blancos en d4."
          checkWinCondition={handleWinCondition}
          checkFailCondition={handleFailCondition}
        />
      </div>
    </div>
  );
}