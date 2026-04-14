"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const units: Record<string, Record<string, number>> = {
  Length: {
    Meters: 1,
    Kilometers: 1000,
    Centimeters: 0.01,
    Millimeters: 0.001,
    Miles: 1609.344,
    Yards: 0.9144,
    Feet: 0.3048,
    Inches: 0.0254,
  },
  Weight: {
    Kilograms: 1,
    Grams: 0.001,
    Milligrams: 0.000001,
    Pounds: 0.453592,
    Ounces: 0.0283495,
    Tons: 1000,
  },
  Temperature: { Celsius: 1, Fahrenheit: 1, Kelvin: 1 },
};

function convertTemp(value: number, from: string, to: string): number {
  let celsius = value;
  if (from === "Fahrenheit") celsius = ((value - 32) * 5) / 9;
  if (from === "Kelvin") celsius = value - 273.15;
  if (to === "Celsius") return celsius;
  if (to === "Fahrenheit") return (celsius * 9) / 5 + 32;
  return celsius + 273.15;
}

export default function UnitConverter() {
  const [category, setCategory] = useState("Length");
  const [from, setFrom] = useState("Meters");
  const [to, setTo] = useState("Feet");
  const [value, setValue] = useState("1");

  const convert = (): string => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";
    if (category === "Temperature")
      return convertTemp(num, from, to).toFixed(4);
    const baseValue = num * units[category][from];
    return (baseValue / units[category][to])
      .toFixed(6)
      .replace(/\.?0+$/, "");
  };

  const unitList = Object.keys(units[category]);

  return (
    <ToolLayout
      title="Unit Converter"
      description="Convert between common units"
    >
      <div className="mb-4">
        <label className="text-xs font-medium text-stone-500 mb-2 block">
          Category
        </label>
        <div className="flex gap-2">
          {Object.keys(units).map((c) => (
            <button
              key={c}
              onClick={() => {
                setCategory(c);
                setFrom(Object.keys(units[c])[0]);
                setTo(Object.keys(units[c])[1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                category === c
                  ? "bg-[#c2410c] text-white"
                  : "bg-stone-100 text-stone-500 hover:bg-stone-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">
            Value
          </label>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="number"
            className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">
            From
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm"
          >
            {unitList.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">
            To
          </label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm"
          >
            {unitList.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 p-4 bg-stone-50 rounded-xl text-center">
        <span className="text-2xl font-bold text-stone-900">
          {convert() || "\u2014"}
        </span>
        <span className="text-sm text-stone-500 ml-2">{to}</span>
      </div>
    </ToolLayout>
  );
}
