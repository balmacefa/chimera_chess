import Link from 'next/link';
import { Gamepad2, Crown, Brain } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans p-8 sm:p-20">
      <main className="max-w-4xl mx-auto flex flex-col gap-12">
        <header className="text-center flex flex-col gap-4">
          <h1 className="text-5xl font-bold tracking-tight text-amber-500">Academia de Ajedrez Quimera</h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Eleva tu juego. Entrenamiento especializado para jugadores de nivel intermedio centrado en conceptos avanzados, dominio de posiciones y teoría de juegos.
          </p>
        </header>

        <section className="grid sm:grid-cols-2 gap-6">
          <Link href="/minigames" className="group p-6 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-amber-600 transition-all flex flex-col gap-3 items-center text-center sm:items-start sm:text-left">
            <Gamepad2 className="w-8 h-8 text-amber-500 mb-2 group-hover:text-amber-400" />
            <h2 className="text-2xl font-semibold group-hover:text-amber-400 flex items-center gap-2">Minijuegos y Conceptos <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span></h2>
            <p className="text-neutral-400">Ejercicios interactivos para dominar conceptos avanzados de ajedrez.</p>
          </Link>

          <Link href="/positions" className="group p-6 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-amber-600 transition-all flex flex-col gap-3 items-center text-center sm:items-start sm:text-left">
            <Crown className="w-8 h-8 text-amber-500 mb-2 group-hover:text-amber-400" />
            <h2 className="text-2xl font-semibold group-hover:text-amber-400 flex items-center gap-2">Dominio de Posiciones <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span></h2>
            <p className="text-neutral-400">Aprende a navegar las aperturas, el turbulento medio juego, finales precisos y posiciones de jugadores titulados.</p>
          </Link>

          <Link href="/theory" className="group p-6 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-amber-600 transition-all flex flex-col gap-3 sm:col-span-2 items-center text-center">
            <Brain className="w-8 h-8 text-amber-500 mb-2 group-hover:text-amber-400" />
            <h2 className="text-2xl font-semibold group-hover:text-amber-400 flex items-center gap-2">Teoría de Juegos <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span></h2>
            <p className="text-neutral-400">Aplica la teoría de juegos matemática y estratégica para calcular mejor que tus oponentes.</p>
          </Link>
        </section>
      </main>

      <footer className="mt-20 text-center text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} Academia de Ajedrez Quimera
      </footer>
    </div>
  );
}
