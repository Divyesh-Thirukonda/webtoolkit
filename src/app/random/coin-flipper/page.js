"use client"

import { useState } from 'react';
import Link from 'next/link';

export default function CoinFlipper() {
  const [coin, setCoin] = useState(null);

  const flipCoin = () => {
    const randomNum = Math.random(0, 1);
    if (randomNum > .5) {
      setCoin("heads");
    } else {
      setCoin("tails");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-12">
      {/* Title at the top center */}
      <h1 className="text-3xl font-bold mt-4">Coin Flipper</h1>

      {/* Main content in the center */}
      <div className="flex flex-col items-center">
        <button
          onClick={flipCoin}
          className="px-6 py-3 bg-blue-500 font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Flip Coin
        </button>
        {coin && (
          <p className="text-2xl font-semibold mt-4">You flipped {coin}</p>
        )}
      </div>

      {/* Return link at the bottom */}
      <Link className="mb-4 text-blue-500 hover:underline" href="/">
        <p>Go back to main page</p>
      </Link>
    </div>
  );
}
