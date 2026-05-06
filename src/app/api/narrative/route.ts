import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { moves } = await request.json();

    // Mock LLM response for generating narrative and suggestions
    // In a real application, you would connect to OpenAI, Anthropic, etc. here.

    // Create a mock narrative based on the number of moves
    let narrative = "La arena está en silencio. Los combatientes se preparan.";
    let suggestions = ["Avanzar al centro", "Preparar defensa", "Flanquear por la izquierda"];

    if (moves && moves.length > 0) {
      const lastMove = moves[moves.length - 1];

      if (moves.length === 1) {
        narrative = `¡La batalla ha comenzado! ${lastMove.player} realiza el primer movimiento: ${lastMove.action}.`;
        suggestions = ["Responder con ataque", "Mantener posición", "Retroceder tácticamente"];
      } else if (moves.length > 1) {
        narrative = `El combate se intensifica. ${lastMove.player} acaba de ejecutar: ${lastMove.action}. El oponente debe reaccionar rápido.`;
        suggestions = ["Contraataque rápido", "Usar habilidad especial", "Esquivar"];
      }

      // Add a bit of random flavor
      const flavors = [
        " Se siente la tensión en el aire.",
        " Un movimiento audaz.",
        " La multitud (imaginaria) ruge.",
        " ¿Será este el momento decisivo?"
      ];
      narrative += flavors[Math.floor(Math.random() * flavors.length)];
    }

    // Simulate network delay for the LLM
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      narrative,
      suggestions
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate narrative' }, { status: 500 });
  }
}
