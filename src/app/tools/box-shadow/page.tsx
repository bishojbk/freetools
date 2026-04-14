"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function BoxShadow() {
  const [x, setX] = useState(4);
  const [y, setY] = useState(4);
  const [blur, setBlur] = useState(10);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(25);
  const [inset, setInset] = useState(false);

  const rgba = (() => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  })();

  const shadow = `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px ${rgba}`;
  const css = `box-shadow: ${shadow};`;

  const sliders = [
    { label: "X Offset", value: x, set: setX, min: -50, max: 50 },
    { label: "Y Offset", value: y, set: setY, min: -50, max: 50 },
    { label: "Blur", value: blur, set: setBlur, min: 0, max: 100 },
    { label: "Spread", value: spread, set: setSpread, min: -50, max: 50 },
  ];

  return (
    <ToolLayout
      title="Box Shadow"
      description="Generate CSS box-shadow values"
    >
      <div className="flex items-center justify-center p-12 bg-stone-50 rounded-xl mb-6">
        <div
          className="w-32 h-32 bg-white rounded-xl"
          style={{ boxShadow: shadow }}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {sliders.map((s) => (
          <div key={s.label}>
            <label className="text-xs font-medium text-stone-500 mb-1 flex justify-between">
              <span>{s.label}</span>
              <span>{s.value}px</span>
            </label>
            <input
              type="range"
              min={s.min}
              max={s.max}
              value={s.value}
              onChange={(e) => s.set(Number(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">
            Color
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-16 h-8 cursor-pointer rounded"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs font-medium text-stone-500 mb-1 flex justify-between">
            <span>Opacity</span>
            <span>{opacity}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-stone-500 mt-4">
          <input
            type="checkbox"
            checked={inset}
            onChange={(e) => setInset(e.target.checked)}
            className="rounded"
          />
          Inset
        </label>
      </div>
      <div className="flex items-center gap-2">
        <code className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm font-mono overflow-x-auto">
          {css}
        </code>
        <button
          onClick={() => navigator.clipboard.writeText(css)}
          className="px-4 py-2 bg-[#c2410c] text-white rounded-lg text-sm hover:bg-[#9a3412] transition-colors shrink-0"
        >
          Copy
        </button>
      </div>
    </ToolLayout>
  );
}
