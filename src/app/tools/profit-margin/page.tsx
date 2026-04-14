"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function ProfitMargin() {
  const [cost, setCost] = useState("");
  const [revenue, setRevenue] = useState("");

  const c = parseFloat(cost) || 0;
  const r = parseFloat(revenue) || 0;
  const profit = r - c;
  const margin = r > 0 ? (profit / r) * 100 : 0;
  const markup = c > 0 ? (profit / c) * 100 : 0;

  return (
    <ToolLayout title="Profit Margin" description="Calculate profit, margin, and markup">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Cost</label>
          <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="60" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Revenue</label>
          <input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="100" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
      </div>
      {c > 0 && r > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className={`rounded-xl p-4 text-center ${profit >= 0 ? "bg-emerald-50" : "bg-red-50"}`}>
            <div className={`text-2xl font-bold ${profit >= 0 ? "text-emerald-700" : "text-red-700"}`}>${profit.toFixed(2)}</div>
            <div className="text-xs text-stone-400 mt-1">Profit</div>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-stone-900">{margin.toFixed(1)}%</div>
            <div className="text-xs text-stone-400 mt-1">Margin</div>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-stone-900">{markup.toFixed(1)}%</div>
            <div className="text-xs text-stone-400 mt-1">Markup</div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
