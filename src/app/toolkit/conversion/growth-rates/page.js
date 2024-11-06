"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function GrowthRateCalculator() {
  const [initialValue, setInitialValue] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [growthRate, setGrowthRate] = useState(null);
  const [timeUnit, setTimeUnit] = useState('years');

  // Function to calculate growth rate
  const calculateGrowthRate = () => {
    if (initialValue <= 0 || finalValue <= 0 || timePeriod <= 0) {
      setGrowthRate("Invalid input");
      return;
    }
    const initial = parseFloat(initialValue);
    const final = parseFloat(finalValue);
    const time = parseFloat(timePeriod);

    // Calculate Growth Rate using the formula
    const rate = Math.pow(final / initial, 1 / time) - 1;

    // Convert to percentage
    setGrowthRate((rate * 100).toFixed(2));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-12">
      <h1 className="text-3xl font-bold mt-4">Growth Rate Calculator</h1>

      <div className="flex flex-col items-center space-y-4 mt-6">
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Initial Value:</label>
          <input
            type="number"
            value={initialValue}
            onChange={(e) => setInitialValue(e.target.value)}
            className="p-2 border rounded mb-2 w-48 text-black"
            placeholder="Enter initial value"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-semibold">Final Value:</label>
          <input
            type="number"
            value={finalValue}
            onChange={(e) => setFinalValue(e.target.value)}
            className="p-2 border rounded mb-2 w-48 text-black"
            placeholder="Enter final value"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-semibold">Time Period:</label>
          <input
            type="number"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="p-2 border rounded mb-2 w-48 text-black"
            placeholder="Enter time period"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-semibold">Select Time Unit:</label>
          <select
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
            className="p-2 border rounded w-48 text-black"
          >
            <option value="years">Years</option>
            <option value="months">Months</option>
            <option value="days">Days</option>
          </select>
        </div>
      </div>

      <button
        onClick={calculateGrowthRate}
        className="mt-6 px-6 py-3 bg-blue-500 font-semibold rounded-lg hover:bg-blue-600 transition"
      >
        Calculate Growth Rate
      </button>

      {growthRate !== null && (
        <div className="mt-6 text-xl font-semibold">
          <p>Growth Rate: {growthRate}%</p>
        </div>
      )}

      <Link className="mt-4 text-blue-500 hover:underline" href="/">
        <p>Go back to main page</p>
      </Link>
    </div>
  );
}
