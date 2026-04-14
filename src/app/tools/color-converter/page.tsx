"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16) || 0,
    g: parseInt(clean.slice(2, 4), 16) || 0,
    b: parseInt(clean.slice(4, 6), 16) || 0,
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <ToolLayout
      title="Color Converter"
      description="Convert between HEX, RGB, and HSL"
    >
      <div className="flex flex-col sm:flex-row gap-6">
        <div
          className="w-full sm:w-32 h-32 rounded-xl border border-stone-200 shrink-0"
          style={{ backgroundColor: hex }}
        />
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-xs font-medium text-stone-500 mb-1 block">
              Color Picker
            </label>
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-full h-10 cursor-pointer rounded"
            />
          </div>
          {[
            { label: "HEX", value: hex, editable: true },
            { label: "RGB", value: rgbStr, editable: false },
            { label: "HSL", value: hslStr, editable: false },
          ].map((row) => (
            <div key={row.label}>
              <label className="text-xs font-medium text-stone-500 mb-1 block">
                {row.label}
              </label>
              <div className="flex gap-2">
                <input
                  readOnly={!row.editable}
                  value={row.value}
                  onChange={
                    row.editable ? (e) => setHex(e.target.value) : undefined
                  }
                  className={`flex-1 px-3 py-2 border border-stone-200 rounded-lg font-mono text-sm ${!row.editable ? "bg-stone-50" : ""}`}
                />
                <button
                  onClick={() => navigator.clipboard.writeText(row.value)}
                  className="text-sm text-[#c2410c] hover:text-[#9a3412]"
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
