"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function RandomNumber() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const lo = parseInt(min) || 0, hi = parseInt(max) || 100, n = Math.min(parseInt(count) || 1, 100);
    const nums = Array.from({ length: n }, () => Math.floor(Math.random() * (hi - lo + 1)) + lo);
    setResults(nums);
  };

  return (
    <ToolLayout title="Random Number" description="Generate random numbers in a range">
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Min</label>
          <input type="number" value={min} onChange={(e) => setMin(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Max</label>
          <input type="number" value={max} onChange={(e) => setMax(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Count</label>
          <input type="number" value={count} onChange={(e) => setCount(e.target.value)} min={1} max={100} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
      </div>
      <button onClick={generate} className="px-4 py-2 bg-[#c2410c] text-white rounded-lg text-sm hover:bg-[#9a3412] transition-colors">
        Generate
      </button>
      {results.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {results.map((n, i) => (
            <span key={i} className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg font-mono text-sm font-semibold text-stone-900">
              {n}
            </span>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
