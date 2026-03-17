'use client';

import React from 'react';
import Link from 'next/link';
import ChessMinigame from '@/components/ChessMinigame';
import { Move } from 'chess.js';

export default function KnightOutpostMinigame() {
  // A position where a knight can maneuver to a strong outpost (e5)
  // For example, from d3 -> e5 supported by a pawn or controlling key squares.
  // FEN: 1k1r3r/pp1n1ppp/2p1b3/4p3/1bP5/2N1P1P1/PP1B1PBP/R4RK1 w - - 0 1 -> Not ideal.
  // Let's create a simpler, very clear outpost scenario.
  // White Knight on c3, wants to jump to d5 where it's protected by e4 pawn and cannot be attacked by black pawns (c6 and e6 pawns are gone).
  // Initial FEN for white to move: r1bq1rk1/pp1n1ppp/8/3Np3/4P3/8/PPP2PPP/R1BQR1K1 w - - 0 1 // Wait, knight is already on d5 here.

  // Let's place it on e2, to go to c3 then d5.
  // Just a 1 move puzzle: Knight on c3, outpost d5 is available.
  const initialFen = "r1bq1rk1/pp1n1ppp/8/4p3/4P3/2N5/PPP2PPP/R1BQR1K1 w - - 0 1";

  const handleWinCondition = (move: Move) => {
    // Correct move is Nc3-d5
    return move.piece === 'n' && move.from === 'c3' && move.to === 'd5';
  };

  const handleFailCondition = (move: Move) => {
    // Any other move is a fail
    return !(move.piece === 'n' && move.from === 'c3' && move.to === 'd5');
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <Link href="/minigames" className="text-amber-500 hover:underline mb-8 inline-block">&larr; Volver a Minijuegos</Link>

      <div className="max-w-6xl mx-auto">
        <ChessMinigame
          initialFen={initialFen}
          orientation="white"
          title="Puesto Avanzado de Caballo"
          description="Un puesto avanzado es una casilla fuerte (normalmente en la cuarta, quinta o sexta fila) que está protegida por un peón propio y que no puede ser atacada por un peón enemigo. Identifica el puesto avanzado ideal para tu caballo y muévelo allí."
          successMessage="¡Excelente! d5 es un puesto avanzado perfecto. Está apoyado por el peón en e4 y las negras ya no tienen peones en las columnas c o e para expulsarlo. Desde aquí, el caballo ejerce una enorme presión."
          failMessage="Movimiento incorrecto. Busca una casilla central, defendida por un peón tuyo, donde un peón rival no pueda atacar fácilmente a tu caballo."
          checkWinCondition={handleWinCondition}
          checkFailCondition={handleFailCondition}
        />
      </div>
    </div>
  );
}