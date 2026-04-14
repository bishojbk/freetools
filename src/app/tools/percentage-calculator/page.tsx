"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function PercentageCalculator() {
  const [pct, setPct] = useState("");
  const [val, setVal] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [incFrom, setIncFrom] = useState("");
  const [incTo, setIncTo] = useState("");

  const calc1 =
    pct && val
      ? ((parseFloat(pct) / 100) * parseFloat(val)).toFixed(2)
      : null;
  const calc2 =
    a && b
      ? ((parseFloat(a) / parseFloat(b)) * 100).toFixed(2) + "%"
      : null;
  const calc3 =
    incFrom && incTo
      ? (
          ((parseFloat(incTo) - parseFloat(incFrom)) /
            Math.abs(parseFloat(incFrom))) *
          100
        ).toFixed(2) + "%"
      : null;

  return (
    <ToolLayout
      title="Percentage Calculator"
      description="Calculate percentages easily"
    >
      <div className="space-y-6">
        <div className="bg-stone-50 rounded-xl p-4">
          <p className="text-sm text-stone-500 mb-3">
            What is <strong>X%</strong> of <strong>Y</strong>?
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              value={pct}
              onChange={(e) => setPct(e.target.value)}
              placeholder="X"
              type="number"
              className="w-24 px-3 py-2 border border-stone-200 rounded-lg text-sm"
            />
            <span className="text-sm text-stone-500">% of</span>
            <input
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="Y"
              type="number"
              className="w-24 px-3 py-2 border border-stone-200 rounded-lg text-sm"
            />
            <span className="text-sm text-stone-500">=</span>
            <span className="text-lg font-bold text-stone-900">
              {calc1 ?? "\u2014"}
            </span>
          </div>
        </div>

        <div className="bg-stone-50 rounded-xl p-4">
          <p className="text-sm text-stone-500 mb-3">
            <strong>A</strong> is what percent of <strong>B</strong>?
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="A"
              type="number"
              className="w-24 px-3 py-2 border border-stone-200 rounded-lg text-sm"
            />
            <span className="text-sm text-stone-500">is</span>
            <span className="text-lg font-bold text-stone-900">
              {calc2 ?? "\u2014"}
            </span>
            <span className="text-sm text-stone-500">of</span>
            <input
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="B"
              type="number"
              className="w-24 px-3 py-2 border border-stone-200 rounded-lg text-sm"
            />
          </div>
        </div>

        <div className="bg-stone-50 rounded-xl p-4">
          <p className="text-sm text-stone-500 mb-3">
            Percentage change from <strong>A</strong> to <strong>B</strong>
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              value={incFrom}
              onChange={(e) => setIncFrom(e.target.value)}
              placeholder="From"
              type="number"
              className="w-24 px-3 py-2 border border-stone-200 rounded-lg text-sm"
            />
            <span className="text-sm text-stone-500">to</span>
            <input
              value={incTo}
              onChange={(e) => setIncTo(e.target.value)}
              placeholder="To"
              type="number"
              className="w-24 px-3 py-2 border border-stone-200 rounded-lg text-sm"
            />
            <span className="text-sm text-stone-500">=</span>
            <span className="text-lg font-bold text-stone-900">
              {calc3 ?? "\u2014"}
            </span>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
