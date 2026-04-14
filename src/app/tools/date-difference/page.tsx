"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function DateDifference() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  const result = (() => {
    if (!date1 || !date2) return null;
    const d1 = new Date(date1), d2 = new Date(date2);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const days = Math.floor(diffMs / 86400000);
    const weeks = Math.floor(days / 7);
    const months = Math.abs((d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth());
    const years = Math.floor(months / 12);
    const hours = Math.floor(diffMs / 3600000);
    return { days, weeks, months, years, hours };
  })();

  return (
    <ToolLayout title="Date Difference" description="Find the difference between two dates">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Start Date</label>
          <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">End Date</label>
          <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
      </div>
      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
          {([["Years", result.years], ["Months", result.months], ["Weeks", result.weeks.toLocaleString()], ["Days", result.days.toLocaleString()], ["Hours", result.hours.toLocaleString()]] as const).map(([label, value]) => (
            <div key={label} className="bg-stone-50 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-stone-900">{value}</div>
              <div className="text-xs text-stone-400 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
