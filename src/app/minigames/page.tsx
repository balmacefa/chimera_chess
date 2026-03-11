import Link from 'next/link';

export default function Minigames() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <Link href="/" className="text-amber-500 hover:underline mb-8 inline-block">&larr; Back to Academy</Link>
      <h1 className="text-4xl font-bold mb-6 text-amber-500">Minigames & Concepts</h1>
      <p className="text-xl text-neutral-300 mb-8">Drill advanced concepts through targeted minigames.</p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="p-6 bg-neutral-800 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2 text-amber-400">Pawn Structure Puzzles</h2>
          <p className="text-neutral-400">Master the foundation of positional play.</p>
        </div>
        <div className="p-6 bg-neutral-800 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2 text-amber-400">Knight Outpost Drills</h2>
          <p className="text-neutral-400">Learn to maneuver knights into dominating positions.</p>
        </div>
      </div>
    </div>
  );
}