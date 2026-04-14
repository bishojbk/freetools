"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const ROMAN: [number, string][] = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];

function toRoman(n: number): string {
  if (n < 1 || n > 3999) return "Out of range (1-3999)";
  let result = "";
  for (const [value, numeral] of ROMAN) { while (n >= value) { result += numeral; n -= value; } }
  return result;
}

function fromRoman(s: string): number | null {
  const map: Record<string, number> = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
  const upper = s.toUpperCase().trim();
  if (!/^[IVXLCDM]+$/.test(upper)) return null;
  let result = 0;
  for (let i = 0; i < upper.length; i++) {
    const cur = map[upper[i]], next = map[upper[i + 1]] || 0;
    result += cur < next ? -cur : cur;
  }
  return result;
}

export default function RomanNumerals() {
  const [number, setNumber] = useState("");
  const [roman, setRoman] = useState("");

  return (
    <ToolLayout title="Roman Numerals" description="Convert between numbers and roman numerals">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Number to Roman</label>
          <div className="flex gap-3">
            <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="42" min={1} max={3999} className="flex-1 px-3 py-2 border border-stone-200 rounded-lg text-sm" />
            <div className="flex items-center px-4 bg-stone-50 rounded-lg font-mono text-lg font-bold text-stone-900 min-w-[80px] justify-center">
              {number ? toRoman(parseInt(number)) : "\u2014"}
            </div>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Roman to Number</label>
          <div className="flex gap-3">
            <input value={roman} onChange={(e) => setRoman(e.target.value.toUpperCase())} placeholder="XLII" className="flex-1 px-3 py-2 border border-stone-200 rounded-lg text-sm font-mono uppercase" />
            <div className="flex items-center px-4 bg-stone-50 rounded-lg font-mono text-lg font-bold text-stone-900 min-w-[80px] justify-center">
              {roman ? (fromRoman(roman) ?? "Invalid") : "\u2014"}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
