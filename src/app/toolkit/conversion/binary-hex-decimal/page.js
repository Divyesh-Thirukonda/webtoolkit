"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function BinaryHexDecimalConverter() {
  const [binary, setBinary] = useState('');
  const [decimal, setDecimal] = useState('');
  const [hex, setHex] = useState('');
  const [inputType, setInputType] = useState('binary');

  const convertValues = () => {
    if (inputType === 'binary') {
      const dec = parseInt(binary, 2);
      const hexa = parseInt(binary, 2).toString(16).toUpperCase();
      setDecimal(isNaN(dec) ? '' : dec.toString());
      setHex(isNaN(hexa) ? '' : hexa);
    } else if (inputType === 'decimal') {
      const bin = parseInt(decimal).toString(2);
      const hexa = parseInt(decimal).toString(16).toUpperCase();
      setBinary(bin);
      setHex(hexa);
    } else if (inputType === 'hex') {
      const dec = parseInt(hex, 16);
      const bin = parseInt(hex, 16).toString(2);
      setDecimal(isNaN(dec) ? '' : dec.toString());
      setBinary(bin);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (inputType === 'binary') {
      setBinary(value);
      convertValues();
    } else if (inputType === 'decimal') {
      setDecimal(value);
      convertValues();
    } else if (inputType === 'hex') {
      setHex(value);
      convertValues();
    }
  };

  const handleInputTypeChange = (e) => {
    setInputType(e.target.value);
    setBinary('');
    setDecimal('');
    setHex('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-12">
      <h1 className="text-3xl font-bold mt-4">Binary, Hex, and Decimal Converter</h1>

      <div>
        <label className="text-lg font-semibold mb-2">Select Input Type: </label>
        <select
          value={inputType}
          onChange={handleInputTypeChange}
          className="mb-6 p-2 border rounded text-black"
        >
          <option value="binary">Binary</option>
          <option value="decimal">Decimal</option>
          <option value="hex">Hexadecimal</option>
        </select>
      </div>

      <div className="flex flex-col items-center space-y-4 mt-6">
        {inputType === 'binary' && (
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Binary:</label>
            <input
              type="text"
              value={binary}
              onChange={handleInputChange}
              className="p-2 border rounded mb-2 w-48 text-black"
              placeholder="Enter binary"
            />
          </div>
        )}

        {inputType === 'decimal' && (
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Decimal:</label>
            <input
              type="number"
              value={decimal}
              onChange={handleInputChange}
              className="p-2 border rounded mb-2 w-48 text-black"
              placeholder="Enter decimal"
            />
          </div>
        )}

        {inputType === 'hex' && (
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Hexadecimal:</label>
            <input
              type="text"
              value={hex}
              onChange={handleInputChange}
              className="p-2 border rounded mb-2 w-48 text-black"
              placeholder="Enter hexadecimal"
            />
          </div>
        )}
      </div>

      <div className="mt-6 text-xl font-semibold">
        <p>Binary: {binary}</p>
        <p>Decimal: {decimal}</p>
        <p>Hexadecimal: {hex}</p>
      </div>

      <Link className="mt-4 text-blue-500 hover:underline" href="/">
        <p>Go back to main page</p>
      </Link>
    </div>
  );
}
