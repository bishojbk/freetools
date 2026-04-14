"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function TileCalculator() {
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth] = useState("");
  const [tileLength, setTileLength] = useState("30");
  const [tileWidth, setTileWidth] = useState("30");
  const [wastage, setWastage] = useState("10");

  const result = (() => {
    const rl = parseFloat(roomLength), rw = parseFloat(roomWidth);
    const tl = parseFloat(tileLength) / 100, tw = parseFloat(tileWidth) / 100;
    const w = parseFloat(wastage) || 0;
    if (!rl || !rw || !tl || !tw) return null;
    const roomArea = rl * rw;
    const tileArea = tl * tw;
    const tilesExact = roomArea / tileArea;
    const tilesWithWaste = Math.ceil(tilesExact * (1 + w / 100));
    return { roomArea, tileArea, tilesExact: Math.ceil(tilesExact), tilesWithWaste };
  })();

  return (
    <ToolLayout title="Tile Calculator" description="Calculate tiles needed for a floor area">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Room Length (m)</label>
          <input type="number" value={roomLength} onChange={(e) => setRoomLength(e.target.value)} placeholder="5" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Room Width (m)</label>
          <input type="number" value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} placeholder="4" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Tile Length (cm)</label>
          <input type="number" value={tileLength} onChange={(e) => setTileLength(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Tile Width (cm)</label>
          <input type="number" value={tileWidth} onChange={(e) => setTileWidth(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Wastage (%)</label>
          <input type="number" value={wastage} onChange={(e) => setWastage(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-stone-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-stone-900">{result.roomArea.toFixed(1)} m&sup2;</div>
            <div className="text-xs text-stone-400 mt-1">Floor Area</div>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-stone-900">{result.tilesExact}</div>
            <div className="text-xs text-stone-400 mt-1">Tiles (exact)</div>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 text-center col-span-2">
            <div className="text-3xl font-bold text-stone-900">{result.tilesWithWaste}</div>
            <div className="text-xs text-stone-400 mt-1">Tiles (with {wastage}% wastage)</div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
