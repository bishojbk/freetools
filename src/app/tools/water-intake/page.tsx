"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function WaterIntake() {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState<"low" | "moderate" | "high">("moderate");

  const factors = { low: 30, moderate: 35, high: 40 };
  const w = parseFloat(weight);
  const ml = w ? Math.round(w * factors[activity]) : null;

  return (
    <ToolLayout title="Water Intake" description="Calculate recommended daily water intake">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-2 block">Activity Level</label>
          <div className="flex gap-2">
            {(["low", "moderate", "high"] as const).map((a) => (
              <button key={a} onClick={() => setActivity(a)} className={`px-3 py-1.5 rounded-lg text-sm transition-colors capitalize ${activity === a ? "bg-[#c2410c] text-white" : "bg-stone-100 text-stone-500 hover:bg-stone-200"}`}>
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>
      {ml && (
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-stone-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-stone-900">{ml} ml</div>
            <div className="text-xs text-stone-400 mt-1">Per day</div>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-stone-900">{Math.ceil(ml / 250)}</div>
            <div className="text-xs text-stone-400 mt-1">Glasses (250ml)</div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
