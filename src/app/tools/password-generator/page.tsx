"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = () => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) return;
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, (v) => chars[v % chars.length]).join(""));
  };

  const strength = (() => {
    let pool = 0;
    if (upper) pool += 26;
    if (lower) pool += 26;
    if (numbers) pool += 10;
    if (symbols) pool += 26;
    if (pool === 0) return { label: "None", color: "text-stone-400", bg: "bg-stone-100" };
    const entropy = Math.log2(pool) * length;
    if (entropy < 40)
      return { label: "Weak", color: "text-red-600", bg: "bg-red-50" };
    if (entropy < 60)
      return { label: "Fair", color: "text-amber-700", bg: "bg-amber-50" };
    if (entropy < 80)
      return { label: "Strong", color: "text-emerald-700", bg: "bg-emerald-50" };
    return {
      label: "Very Strong",
      color: "text-emerald-700",
      bg: "bg-emerald-50",
    };
  })();

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate secure random passwords"
    >
      {password && (
        <div className="flex items-center gap-2 mb-4">
          <code className="flex-1 px-4 py-3 bg-stone-900 text-emerald-400 rounded-lg font-mono text-lg tracking-wide overflow-x-auto">
            {password}
          </code>
          <button
            onClick={() => navigator.clipboard.writeText(password)}
            className="px-4 py-2 bg-[#c2410c] text-white rounded-lg text-sm hover:bg-[#9a3412] transition-colors shrink-0"
          >
            Copy
          </button>
        </div>
      )}
      <div className="mb-4">
        <label className="text-xs font-medium text-stone-500 mb-1 flex justify-between">
          <span>Length</span>
          <span>{length}</span>
        </label>
        <input
          type="range"
          min={4}
          max={128}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: "Uppercase (A-Z)", checked: upper, set: setUpper },
          { label: "Lowercase (a-z)", checked: lower, set: setLower },
          { label: "Numbers (0-9)", checked: numbers, set: setNumbers },
          { label: "Symbols (!@#$)", checked: symbols, set: setSymbols },
        ].map((opt) => (
          <label
            key={opt.label}
            className="flex items-center gap-2 text-sm text-stone-500"
          >
            <input
              type="checkbox"
              checked={opt.checked}
              onChange={(e) => opt.set(e.target.checked)}
              className="rounded"
            />
            {opt.label}
          </label>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={generate}
          className="px-4 py-2 bg-[#c2410c] text-white rounded-lg text-sm hover:bg-[#9a3412] transition-colors"
        >
          Generate
        </button>
        <span className={`text-xs px-2 py-1 rounded ${strength.bg} ${strength.color}`}>
          {strength.label}
        </span>
      </div>
    </ToolLayout>
  );
}
