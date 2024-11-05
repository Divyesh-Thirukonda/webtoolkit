// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Random Generators</h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <Link className="p-6 bg-slate-900 shadow rounded-lg hover:bg-slate-800 transition" href="random/dice-roller">
              <h2 className="text-xl font-semibold mb-2">Dice Roller</h2>
              <p>Roll a dice to get a random number between 1 and 6.</p>
          </Link>
          {/* Add other cards for Random Password, Random Number, etc., in a similar way */}
        </div>
      </div>
    </div>
  );
}
