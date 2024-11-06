"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [charType, setCharType] = useState('all');

  const generatePassword = () => {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    if (charType === 'letters') {
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }
    setPassword(generatedPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-12">
      <h1 className="text-3xl font-bold mt-4">Password Generator</h1>

      <div className="flex flex-col items-center mt-6">
        {/* Length Selection */}
        <label className="text-lg font-semibold mb-2">Password Length: {length}</label>
        <input
          type="range"
          min="1"
          max="30"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-64 mb-4"
        />

        {/* Type Selection */}
        <label className="text-lg font-semibold mb-2 ">Character Type</label>
        <select
          value={charType}
          onChange={(e) => setCharType(e.target.value)}
          className="mb-4 p-2 border rounded text-black"
        >
          <option value="all">All Characters</option>
          <option value="letters">Uppercase & Lowercase Only</option>
        </select>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          Generate Password
        </button>

        {/* Display Generated Password */}
        {password && (
          <p className="text-2xl font-semibold mt-8 break-all">Generated Password: {password}</p>
        )}
      </div>

      <Link className="mb-4 text-blue-500 hover:underline" href="/">
        <p>Go back to main page</p>
      </Link>
    </div>
  );
}
