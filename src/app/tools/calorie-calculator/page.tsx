"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const activityLevels = [
  { label: "Sedentary", factor: 1.2 },
  { label: "Light exercise", factor: 1.375 },
  { label: "Moderate exercise", factor: 1.55 },
  { label: "Heavy exercise", factor: 1.725 },
  { label: "Athlete", factor: 1.9 },
];

export default function CalorieCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState(1.55);

  const bmr = (() => {
    const a = parseFloat(age), h = parseFloat(height), w = parseFloat(weight);
    if (!a || !h || !w) return null;
    if (gender === "male") return 10 * w + 6.25 * h - 5 * a + 5;
    return 10 * w + 6.25 * h - 5 * a - 161;
  })();

  const tdee = bmr ? Math.round(bmr * activity) : null;

  return (
    <ToolLayout title="Calorie Calculator" description="Estimate daily calorie needs (Mifflin-St Jeor)">
      <div className="space-y-4">
        <div className="flex gap-2">
          {(["male", "female"] as const).map((g) => (
            <button key={g} onClick={() => setGender(g)} className={`px-3 py-1.5 rounded-lg text-sm transition-colors capitalize ${gender === g ? "bg-[#c2410c] text-white" : "bg-stone-100 text-stone-500 hover:bg-stone-200"}`}>
              {g}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-medium text-stone-500 mb-1 block">Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-500 mb-1 block">Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="170" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-500 mb-1 block">Weight (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(Number(e.target.value))} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm">
            {activityLevels.map((l) => <option key={l.factor} value={l.factor}>{l.label} ({l.factor}x)</option>)}
          </select>
        </div>
      </div>
      {tdee && bmr && (
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-stone-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-stone-900">{Math.round(bmr)}</div>
            <div className="text-xs text-stone-400 mt-1">BMR (cal/day)</div>
          </div>
          <div className="bg-stone-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-stone-900">{tdee}</div>
            <div className="text-xs text-stone-400 mt-1">TDEE (cal/day)</div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
