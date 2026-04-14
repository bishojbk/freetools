"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function PaintCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [doors, setDoors] = useState("1");
  const [windows, setWindows] = useState("2");
  const [coats, setCoats] = useState("2");

  const result = (() => {
    const l = parseFloat(length), w = parseFloat(width), h = parseFloat(height);
    if (!l || !w || !h) return null;
    const d = parseInt(doors) || 0, win = parseInt(windows) || 0, c = parseInt(coats) || 1;
    const wallArea = 2 * (l + w) * h;
    const doorArea = d * 1.9 * 0.8;
    const windowArea = win * 1.2 * 1.0;
    const paintableArea = wallArea - doorArea - windowArea;
    const coveragePerLitre = 10;
    const litres = (paintableArea * c) / coveragePerLitre;
    return { paintableArea: Math.max(0, paintableArea), litres: Math.max(0, litres) };
  })();

  return (
    <ToolLayout title="Paint Calculator" description="Estimate paint needed for a room">
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Length (m)</label>
          <input type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="5" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Width (m)</label>
          <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="4" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Height (m)</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="2.5" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Doors</label>
          <input type="number" value={doors} onChange={(e) => setDoors(e.target.value)} min={0} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Windows</label>
          <input type="number" value={windows} onChange={(e) => setWindows(e.target.value)} min={0} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Coats</label>
          <input type="number" value={coats} onChange={(e) => setCoats(e.target.value)} min={1} max={4} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-stone-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-stone-900">{result.paintableArea.toFixed(1)} m&sup2;</div>
            <div className="text-xs text-stone-400 mt-1">Paintable Area</div>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-stone-900">{result.litres.toFixed(1)} L</div>
            <div className="text-xs text-stone-400 mt-1">Paint Needed</div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
