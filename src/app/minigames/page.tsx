import Link from 'next/link';
import { Gamepad2, Grid3X3, Crosshair, Eye } from 'lucide-react';

export default function Minigames() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4 sm:p-8">
      <Link href="/" className="text-amber-500 hover:underline mb-8 inline-block">&larr; Volver a la Academia</Link>

      <div className="flex items-center gap-4 mb-6">
        <Gamepad2 className="w-10 h-10 text-amber-500" />
        <h1 className="text-4xl font-bold text-amber-500">Minijuegos y Conceptos</h1>
      </div>

      <p className="text-xl text-neutral-300 mb-8">Practica conceptos avanzados mediante minijuegos específicos.</p>

      <div className="grid sm:grid-cols-2 gap-6">
        <Link href="/minigames/pawn-structure" className="group p-6 bg-neutral-800 rounded-xl border border-neutral-700 hover:border-amber-600 transition-colors block">
          <Grid3X3 className="w-8 h-8 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
          <h2 className="text-2xl font-semibold mb-2 text-amber-400 group-hover:text-amber-300">Puzles de Estructura de Peones</h2>
          <p className="text-neutral-400">Domina los fundamentos del juego posicional.</p>
        </Link>
        <Link href="/minigames/knight-outposts" className="group p-6 bg-neutral-800 rounded-xl border border-neutral-700 hover:border-amber-600 transition-colors block">
          <Crosshair className="w-8 h-8 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
          <h2 className="text-2xl font-semibold mb-2 text-amber-400 group-hover:text-amber-300">Ejercicios de Puestos Avanzados</h2>
          <p className="text-neutral-400">Aprende a maniobrar los caballos hacia posiciones dominantes.</p>
        </Link>
        <Link href="/minigames/memorize-positions" className="group p-6 bg-neutral-800 rounded-xl border border-neutral-700 hover:border-amber-600 transition-colors block">
          <Eye className="w-8 h-8 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
          <h2 className="text-2xl font-semibold mb-2 text-amber-400 group-hover:text-amber-300">Visión del Tablero</h2>
          <p className="text-neutral-400">Aprende y memoriza rápidamente las coordenadas en el tablero.</p>
        </Link>
      </div>
    </div>
  );
}