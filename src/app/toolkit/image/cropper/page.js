"use client"

import { useState } from 'react';
import Link from 'next/link';

export default function DiceRoller() {
  const [diceNumber, setDiceNumber] = useState(null);

  const rollDice = () => {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(randomNum);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-12">
      {/* Title at the top center */}
      <h1 className="text-3xl font-bold mt-4">Dice Roller</h1>

      {/* Main content in the center */}
      <div className="flex flex-col items-center">
        <button
          onClick={rollDice}
          className="px-6 py-3 bg-blue-500 font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Roll Dice
        </button>
        {diceNumber && (
          <p className="text-2xl font-semibold mt-4">You rolled a {diceNumber}!</p>
        )}
      </div>

      {/* Return link at the bottom */}
      <Link className="mb-4 text-blue-500 hover:underline" href="/">
        <p>Go back to main page</p>
      </Link>
    </div>
  );
}
