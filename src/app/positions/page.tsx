import Link from 'next/link';

export default function Positions() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <Link href="/" className="text-amber-500 hover:underline mb-8 inline-block">&larr; Back to Academy</Link>
      <h1 className="text-4xl font-bold mb-6 text-amber-500">Master Positions</h1>
      <p className="text-xl text-neutral-300 mb-8">Navigate every stage of the game with precision.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-neutral-800 rounded-xl">
          <h2 className="text-xl font-semibold mb-2 text-amber-400">Opening Repertoire</h2>
          <p className="text-neutral-400">Enter the game with a solid foundation.</p>
        </div>
        <div className="p-6 bg-neutral-800 rounded-xl">
          <h2 className="text-xl font-semibold mb-2 text-amber-400">Middlegame Tactics</h2>
          <p className="text-neutral-400">Dominate the complex battles.</p>
        </div>
        <div className="p-6 bg-neutral-800 rounded-xl">
          <h2 className="text-xl font-semibold mb-2 text-amber-400">Endgame Technique</h2>
          <p className="text-neutral-400">Convert advantages into wins.</p>
        </div>
        <div className="p-6 bg-neutral-800 rounded-xl border border-amber-600">
          <h2 className="text-xl font-semibold mb-2 text-amber-400">Titled Play</h2>
          <p className="text-neutral-400">Analyze games and positions of Grandmasters.</p>
        </div>
      </div>
    </div>
  );
}