"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState(15);
  const [people, setPeople] = useState(1);

  const billNum = parseFloat(bill) || 0;
  const tip = (billNum * tipPct) / 100;
  const total = billNum + tip;
  const perPerson = people > 0 ? total / people : total;

  return (
    <ToolLayout
      title="Tip Calculator"
      description="Calculate tip and split the bill"
    >
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">
            Bill Amount
          </label>
          <input
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            type="number"
            placeholder="0.00"
            className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 flex justify-between">
            <span>Tip</span>
            <span>{tipPct}%</span>
          </label>
          <div className="flex gap-2 mb-2">
            {[10, 15, 18, 20, 25].map((p) => (
              <button
                key={p}
                onClick={() => setTipPct(p)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  tipPct === p
                    ? "bg-[#c2410c] text-white"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
          <input
            type="range"
            min={0}
            max={50}
            value={tipPct}
            onChange={(e) => setTipPct(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">
            Split Between
          </label>
          <input
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
            type="number"
            min={1}
            className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-6">
        {(
          [
            ["Tip", `$${tip.toFixed(2)}`],
            ["Total", `$${total.toFixed(2)}`],
            ["Per Person", `$${perPerson.toFixed(2)}`],
            ["Tip Per Person", `$${(tip / (people || 1)).toFixed(2)}`],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="bg-stone-50 rounded-xl p-4 text-center">
            <div className="text-xl font-bold text-stone-900">{value}</div>
            <div className="text-xs text-stone-500 mt-1">{label}</div>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
