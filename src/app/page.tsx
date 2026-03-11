import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans p-8 sm:p-20">
      <main className="max-w-4xl mx-auto flex flex-col gap-12">
        <header className="text-center flex flex-col gap-4">
          <h1 className="text-5xl font-bold tracking-tight text-amber-500">Chimera Chess Academy</h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Elevate your game. Specialized training for mid-level players focusing on advanced concepts, position mastery, and game theory.
          </p>
        </header>

        <section className="grid sm:grid-cols-2 gap-6">
          <Link href="/minigames" className="group p-6 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-amber-600 transition-all flex flex-col gap-3">
            <h2 className="text-2xl font-semibold group-hover:text-amber-400">Minigames & Concepts &rarr;</h2>
            <p className="text-neutral-400">Interactive drills to master advanced chess concepts.</p>
          </Link>

          <Link href="/positions" className="group p-6 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-amber-600 transition-all flex flex-col gap-3">
            <h2 className="text-2xl font-semibold group-hover:text-amber-400">Master Positions &rarr;</h2>
            <p className="text-neutral-400">Learn to navigate entering games, the turbulent mid-game, precise endgames, and titled player positions.</p>
          </Link>

          <Link href="/theory" className="group p-6 border border-neutral-800 rounded-xl hover:bg-neutral-800 hover:border-amber-600 transition-all flex flex-col gap-3 sm:col-span-2 text-center">
            <h2 className="text-2xl font-semibold group-hover:text-amber-400">Game Theory &rarr;</h2>
            <p className="text-neutral-400">Apply mathematical and strategic game theory to out-calculate your opponents.</p>
          </Link>
        </section>
      </main>

      <footer className="mt-20 text-center text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} Chimera Chess Academy
      </footer>
    </div>
  );
}
