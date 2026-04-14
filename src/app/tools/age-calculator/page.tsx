"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");

  const result = (() => {
    if (!dob) return null;
    const birth = new Date(dob);
    const now = new Date();
    if (isNaN(birth.getTime()) || birth > now) return null;

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor((now.getTime() - birth.getTime()) / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    return { years, months, days, totalDays, totalWeeks, totalMonths };
  })();

  return (
    <ToolLayout title="Age Calculator" description="Calculate exact age from date of birth">
      <div>
        <label className="text-xs font-medium text-stone-500 mb-1 block">Date of Birth</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
      </div>
      {result && (
        <>
          <div className="bg-stone-50 rounded-xl p-6 text-center mt-6">
            <div className="text-3xl font-bold text-stone-900">
              {result.years} years, {result.months} months, {result.days} days
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {[
              ["Total Months", result.totalMonths],
              ["Total Weeks", result.totalWeeks.toLocaleString()],
              ["Total Days", result.totalDays.toLocaleString()],
            ].map(([label, value]) => (
              <div key={label as string} className="bg-stone-50 rounded-xl p-3 text-center">
                <div className="text-lg font-bold text-stone-900">{value}</div>
                <div className="text-xs text-stone-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </ToolLayout>
  );
}
