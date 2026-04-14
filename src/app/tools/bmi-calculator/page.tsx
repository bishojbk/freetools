"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const LIMITS = {
  metric:   { height: { min: 50, max: 270, unit: "cm" },  weight: { min: 2, max: 350, unit: "kg" } },
  imperial: { height: { min: 20, max: 107, unit: "inches" }, weight: { min: 4, max: 770, unit: "lbs" } },
};

export default function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const limits = LIMITS[unit];
  const h = parseFloat(height);
  const w = parseFloat(weight);

  const warning = (() => {
    if (!h && !w) return null;
    const msgs: string[] = [];
    if (h && (h < limits.height.min || h > limits.height.max))
      msgs.push(`Height should be ${limits.height.min}–${limits.height.max} ${limits.height.unit}`);
    if (w && (w < limits.weight.min || w > limits.weight.max))
      msgs.push(`Weight should be ${limits.weight.min}–${limits.weight.max} ${limits.weight.unit}`);
    return msgs.length > 0 ? msgs.join(". ") + "." : null;
  })();

  const bmi = (() => {
    if (!h || !w) return null;
    if (h < limits.height.min || h > limits.height.max) return null;
    if (w < limits.weight.min || w > limits.weight.max) return null;
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
          <button
            key={u}
            onClick={() => { setUnit(u); setHeight(""); setWeight(""); }}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors capitalize ${unit === u ? "bg-[#c2410c] text-white" : "bg-stone-100 text-stone-500 hover:bg-stone-200"}`}
          >
            {u}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">
            Height ({limits.height.unit})
          </label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder={unit === "metric" ? "170" : "67"} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
          <span className="text-[11px] text-stone-300 mt-1 block">{limits.height.min}–{limits.height.max} {limits.height.unit}</span>
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">
            Weight ({limits.weight.unit})
          </label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={unit === "metric" ? "70" : "154"} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
          <span className="text-[11px] text-stone-300 mt-1 block">{limits.weight.min}–{limits.weight.max} {limits.weight.unit}</span>
        </div>
      </div>
      {warning && (
        <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">{warning}</div>
      )}
      {bmi && category && (
        <div className="bg-stone-50 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold text-stone-900">{bmi.toFixed(1)}</div>
          <div className={`inline-block text-sm font-medium px-3 py-1 rounded-full mt-2 ${category.color}`}>{category.label}</div>
        </div>
      )}
    </ToolLayout>
  );
}
