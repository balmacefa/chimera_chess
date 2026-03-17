import Link from 'next/link';
import { Brain, Network, Scale, Activity } from 'lucide-react';

export default function Theory() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <Link href="/" className="text-amber-500 hover:underline mb-8 inline-block">&larr; Volver a la Academia</Link>

      <div className="flex items-center gap-4 mb-6">
        <Brain className="w-10 h-10 text-amber-500" />
        <h1 className="text-4xl font-bold text-amber-500">Teoría de Juegos</h1>
      </div>

      <p className="text-xl text-neutral-300 mb-8">Aplica teoría estratégica rigurosa a tu pensamiento en el ajedrez.</p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="p-6 bg-neutral-800 rounded-xl border border-neutral-700 hover:border-amber-600 transition-colors">
          <Network className="w-8 h-8 text-amber-500 mb-3" />
          <h2 className="text-2xl font-semibold mb-2 text-amber-400">Minimax y Árboles de Juego</h2>
          <p className="text-neutral-400">Comprende la estructura matemática del cálculo.</p>
        </div>
        <div className="p-6 bg-neutral-800 rounded-xl border border-neutral-700 hover:border-amber-600 transition-colors">
          <Activity className="w-8 h-8 text-amber-500 mb-3" />
          <h2 className="text-2xl font-semibold mb-2 text-amber-400">Ajuste de Función de Evaluación</h2>
          <p className="text-neutral-400">Aprende a evaluar posiciones intuitivamente como un motor.</p>
        </div>
        <div className="p-6 bg-neutral-800 rounded-xl border border-neutral-700 hover:border-amber-600 transition-colors">
          <Scale className="w-8 h-8 text-amber-500 mb-3" />
          <h2 className="text-2xl font-semibold mb-2 text-amber-400">Equilibrios de Nash en Ajedrez</h2>
          <p className="text-neutral-400">Decisiones estratégicas cuando los oponentes juegan de manera óptima.</p>
        </div>
      </div>
    </div>
  );
}