"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const bmi = (() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w) return null;
    if (unit === "metric") return w / ((h / 100) ** 2);
    return (w / (h ** 2)) * 703;
  })();

  const category = bmi
    ? bmi < 18.5 ? { label: "Underweight", color: "text-amber-700 bg-amber-50" }
    : bmi < 25 ? { label: "Normal", color: "text-emerald-700 bg-emerald-50" }
    : bmi < 30 ? { label: "Overweight", color: "text-amber-700 bg-amber-50" }
    : { label: "Obese", color: "text-red-700 bg-red-50" }
    : null;

  return (
    <ToolLayout title="BMI Calculator" description="Calculate your Body Mass Index">
      <div className="flex gap-2 mb-4">
        {(["metric", "imperial"] as const).map((u) => (
          <button key={u} onClick={() => setUnit(u)} className={`px-3 py-1.5 rounded-lg text-sm transition-colors capitalize ${unit === u ? "bg-[#c2410c] text-white" : "bg-stone-100 text-stone-500 hover:bg-stone-200"}`}>
            {u}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Height ({unit === "metric" ? "cm" : "inches"})</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder={unit === "metric" ? "170" : "67"} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Weight ({unit === "metric" ? "kg" : "lbs"})</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={unit === "metric" ? "70" : "154"} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
      </div>
      {bmi && category && (
        <div className="bg-stone-50 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-stone-900">{bmi.toFixed(1)}</div>
          <div className={`inline-block text-sm font-medium px-3 py-1 rounded-full mt-2 ${category.color}`}>{category.label}</div>
        </div>
      )}
    </ToolLayout>
  );
}
