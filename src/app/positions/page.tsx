import Link from 'next/link';
import { Crown, BookOpen, Swords, Flag, Award } from 'lucide-react';

export default function Positions() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <Link href="/" className="text-amber-500 hover:underline mb-8 inline-block">&larr; Volver a la Academia</Link>

      <div className="flex items-center gap-4 mb-6">
        <Crown className="w-10 h-10 text-amber-500" />
        <h1 className="text-4xl font-bold text-amber-500">Dominio de Posiciones</h1>
      </div>

      <p className="text-xl text-neutral-300 mb-8">Navega por cada etapa del juego con precisión.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-neutral-800 rounded-xl border border-neutral-700 hover:border-amber-600 transition-colors">
          <BookOpen className="w-8 h-8 text-amber-500 mb-3" />
          <h2 className="text-xl font-semibold mb-2 text-amber-400">Repertorio de Aperturas</h2>
          <p className="text-neutral-400">Entra al juego con una base sólida.</p>
        </div>
        <div className="p-6 bg-neutral-800 rounded-xl border border-neutral-700 hover:border-amber-600 transition-colors">
          <Swords className="w-8 h-8 text-amber-500 mb-3" />
          <h2 className="text-xl font-semibold mb-2 text-amber-400">Tácticas de Medio Juego</h2>
          <p className="text-neutral-400">Domina las batallas complejas.</p>
        </div>
        <div className="p-6 bg-neutral-800 rounded-xl border border-neutral-700 hover:border-amber-600 transition-colors">
          <Flag className="w-8 h-8 text-amber-500 mb-3" />
          <h2 className="text-xl font-semibold mb-2 text-amber-400">Técnica de Finales</h2>
          <p className="text-neutral-400">Convierte las ventajas en victorias.</p>
        </div>
        <div className="p-6 bg-neutral-800 rounded-xl border-2 border-amber-600 hover:bg-neutral-800/80 transition-colors">
          <Award className="w-8 h-8 text-amber-500 mb-3" />
          <h2 className="text-xl font-semibold mb-2 text-amber-400">Juego Titulado</h2>
          <p className="text-neutral-400">Analiza partidas y posiciones de Grandes Maestros.</p>
        </div>
      </div>
    </div>
  );
}