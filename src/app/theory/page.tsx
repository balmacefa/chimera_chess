import Link from 'next/link';

export default function Theory() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <Link href="/" className="text-amber-500 hover:underline mb-8 inline-block">&larr; Back to Academy</Link>
      <h1 className="text-4xl font-bold mb-6 text-amber-500">Game Theory</h1>
      <p className="text-xl text-neutral-300 mb-8">Apply rigorous strategic theory to your chess thinking.</p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="p-6 bg-neutral-800 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2 text-amber-400">Minimax & Game Trees</h2>
          <p className="text-neutral-400">Understand the mathematical structure of calculation.</p>
        </div>
        <div className="p-6 bg-neutral-800 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2 text-amber-400">Evaluation Function Tuning</h2>
          <p className="text-neutral-400">Learn how to intuitively evaluate positions like an engine.</p>
        </div>
        <div className="p-6 bg-neutral-800 rounded-xl">
          <h2 className="text-2xl font-semibold mb-2 text-amber-400">Nash Equilibriums in Chess</h2>
          <p className="text-neutral-400">Strategic choices when opponents play optimally.</p>
        </div>
      </div>
    </div>
  );
}