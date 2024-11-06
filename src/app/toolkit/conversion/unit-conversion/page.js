"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [unitFrom, setUnitFrom] = useState('meter');
  const [unitTo, setUnitTo] = useState('kilometer');
  const [valueFrom, setValueFrom] = useState('');
  const [valueTo, setValueTo] = useState('');
  const [lastUpdated, setLastUpdated] = useState('from');

  const categories = {
    length: {
      units: ['kilometer', 'meter', 'centimeter', 'millimeter', 'micrometer', 'nanometer', 'mile', 'yard', 'foot', 'inch'],
      convert: (value, from, to) => {
        const lengthConversions = {
          meter: 1,
          kilometer: 1000,
          centimeter: 0.01,
          millimeter: 0.001,
          micrometer: 1e-6,
          nanometer: 1e-9,
          mile: 1609.34,
          yard: 0.9144,
          foot: 0.3048,
          inch: 0.0254,
        };
        return (value * lengthConversions[from]) / lengthConversions[to];
      },
    },
    digitalStorage: {
      units: ['bit', 'byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte', 'petabyte'],
      convert: (value, from, to) => {
        const storageConversions = {
          bit: 1,
          byte: 8,
          kilobyte: 8192,
          megabyte: 8.388608e6,
          gigabyte: 8.589934592e9,
          terabyte: 8.796093022208e12,
          petabyte: 9.007199254740992e15,
        };
        return (value * storageConversions[from]) / storageConversions[to];
      },
    },
    time: {
      units: ['millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'decade', 'century'],
      convert: (value, from, to) => {
        const timeConversions = {
          millisecond: 0.001,
          second: 1,
          minute: 60,
          hour: 3600,
          day: 86400,
          week: 604800,
          month: 2.628e6,
          year: 3.154e7,
          decade: 3.154e8,
          century: 3.154e9,
        };
        return (value * timeConversions[from]) / timeConversions[to];
      },
    },
    temperature: {
      units: ['Celsius', 'Fahrenheit', 'Kelvin'],
      convert: (value, from, to) => {
        if (from === to) return value;
        if (from === 'Celsius' && to === 'Fahrenheit') return (value * 9 / 5) + 32;
        if (from === 'Fahrenheit' && to === 'Celsius') return (value - 32) * 5 / 9;
        if (from === 'Celsius' && to === 'Kelvin') return value + 273.15;
        if (from === 'Kelvin' && to === 'Celsius') return value - 273.15;
        if (from === 'Fahrenheit' && to === 'Kelvin') return ((value - 32) * 5 / 9) + 273.15;
        if (from === 'Kelvin' && to === 'Fahrenheit') return ((value - 273.15) * 9 / 5) + 32;
      },
    },
    mass: {
      units: ['metric ton', 'kilogram', 'gram', 'milligram', 'imperial ton', 'us ton', 'stone', 'pound', 'ounce'],
      convert: (value, from, to) => {
        const massConversions = {
          'metric ton': 1000,
          kilogram: 1,
          gram: 0.001,
          milligram: 1e-6,
          'imperial ton': 1016.05,
          'us ton': 907.185,
          stone: 6.35029,
          pound: 0.453592,
          ounce: 0.0283495,
        };
        return (value * massConversions[from]) / massConversions[to];
      },
    },
  };

  // Perform conversion based on which input was last updated
  useEffect(() => {
    const performConversion = () => {
      const value = lastUpdated === 'from' ? parseFloat(valueFrom) : parseFloat(valueTo);
      if (isNaN(value)) {
        setValueFrom('');
        setValueTo('');
        return;
      }

      const result = lastUpdated === 'from'
        ? categories[category].convert(value, unitFrom, unitTo)
        : categories[category].convert(value, unitTo, unitFrom);

      if (lastUpdated === 'from') {
        setValueTo(result.toFixed(2));
      } else {
        setValueFrom(result.toFixed(2));
      }
    };

    const timer = setTimeout(performConversion, 300); // Delay to allow typing

    return () => clearTimeout(timer); // Clear the timer if input changes
  }, [valueFrom, valueTo, unitFrom, unitTo, lastUpdated, category]);

  const handleInputChange = (e, direction) => {
    const newValue = e.target.value;
    if (direction === 'from') {
      setValueFrom(newValue);
      setLastUpdated('from');
    } else {
      setValueTo(newValue);
      setLastUpdated('to');
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    const [firstUnit, secondUnit] = categories[newCategory].units;
    setUnitFrom(firstUnit);
    setUnitTo(secondUnit);
    setValueFrom('');
    setValueTo('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-12">
      <h1 className="text-3xl font-bold mt-4">Unit Converter</h1>

      {/* <label className="text-lg font-semibold">Select Category:</label> */}
      
      <select
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="mb-6 p-2 border rounded text-black"
      >
        {Object.keys(categories).map((key) => (
          <option key={key} value={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </option>
        ))}
      </select>

      <div className="flex items-center space-x-4 mb-4">
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={valueFrom}
            onChange={(e) => handleInputChange(e, 'from')}
            placeholder="Enter value"
            className="p-2 border rounded mb-2 w-32 text-black"
          />
          <select
            value={unitFrom}
            onChange={(e) => setUnitFrom(e.target.value)}
            className="p-2 border rounded w-32 text-black"
          >
            {categories[category].units.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        <span className="text-2xl font-bold">=</span>

        <div className="flex flex-col items-center">
          <input
            type="text"
            value={valueTo}
            onChange={(e) => handleInputChange(e, 'to')}
            placeholder="Enter value"
            className="p-2 border rounded mb-2 w-32 text-black"
          />
          <select
            value={unitTo}
            onChange={(e) => setUnitTo(e.target.value)}
            className="p-2 border rounded w-32 text-black"
          >
            {categories[category].units.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>

      <Link className="mb-4 text-blue-500 hover:underline" href="/">
        <p>Go back to main page</p>
      </Link>
    </div>
  );
}
