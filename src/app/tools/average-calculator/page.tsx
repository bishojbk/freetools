"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function AverageCalculator() {
  const [input, setInput] = useState("");

  const nums = input.split(/[,\s\n]+/).map(Number).filter((n) => !isNaN(n) && n !== 0 || input.includes("0"));
  const validNums = input.split(/[,\s\n]+/).map(Number).filter((n) => !isNaN(n));

  const stats = validNums.length > 0 ? {
    mean: validNums.reduce((a, b) => a + b, 0) / validNums.length,
    median: (() => { const s = [...validNums].sort((a, b) => a - b); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; })(),
    sum: validNums.reduce((a, b) => a + b, 0),
    min: Math.min(...validNums),
    max: Math.max(...validNums),
    count: validNums.length,
  } : null;

  return (
    <ToolLayout title="Average Calculator" description="Calculate mean, median, min, max, and sum">
      <div>
        <label className="text-xs font-medium text-stone-500 mb-1 block">Numbers (comma or space separated)</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="10, 20, 30, 40, 50" className="w-full h-24 p-3 border border-stone-200 rounded-lg text-sm font-mono resize-y" />
      </div>
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {([["Mean", stats.mean.toFixed(2)], ["Median", stats.median.toFixed(2)], ["Sum", stats.sum.toLocaleString()], ["Min", stats.min], ["Max", stats.max], ["Count", stats.count]] as const).map(([label, value]) => (
            <div key={label} className="bg-stone-50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-stone-900">{value}</div>
              <div className="text-xs text-stone-400 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
