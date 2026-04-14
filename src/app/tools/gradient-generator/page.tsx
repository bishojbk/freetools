"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function GradientGenerator() {
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#8b5cf6");
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<"linear" | "radial">("linear");

  const css =
    type === "linear"
      ? `background: linear-gradient(${angle}deg, ${color1}, ${color2});`
      : `background: radial-gradient(circle, ${color1}, ${color2});`;

  const style =
    type === "linear"
      ? { background: `linear-gradient(${angle}deg, ${color1}, ${color2})` }
      : { background: `radial-gradient(circle, ${color1}, ${color2})` };

  return (
    <ToolLayout
      title="Gradient Generator"
      description="Create CSS gradients visually"
    >
      <div
        className="w-full h-40 rounded-xl border border-stone-200 mb-6"
        style={style}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">
            Color 1
          </label>
          <input
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            className="w-full h-10 cursor-pointer rounded"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">
            Color 2
          </label>
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            className="w-full h-10 cursor-pointer rounded"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "linear" | "radial")}
            className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm"
          >
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </div>
        {type === "linear" && (
          <div>
            <label className="text-xs font-medium text-stone-500 mb-1 block">
              Angle: {angle}deg
            </label>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>
        )}
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
