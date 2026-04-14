"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const result = (() => {
    const p = parseFloat(principal), r = parseFloat(rate), y = parseFloat(years);
    if (!p || !r || !y) return null;
    const monthlyRate = r / 100 / 12;
    const payments = y * 12;
    const monthly = p * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);
    const totalPaid = monthly * payments;
    const totalInterest = totalPaid - p;
    return { monthly, totalPaid, totalInterest, payments };
  })();

  return (
    <ToolLayout title="Loan Calculator" description="Calculate monthly payments and total interest">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Loan Amount</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="10000" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Interest Rate (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="5" step="0.1" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Term (years)</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="5" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3 mt-6">
          {([
            ["Monthly Payment", `$${result.monthly.toFixed(2)}`],
            ["Total Interest", `$${result.totalInterest.toFixed(2)}`],
            ["Total Paid", `$${result.totalPaid.toFixed(2)}`],
            ["Payments", result.payments],
          ] as const).map(([label, value]) => (
            <div key={label} className="bg-stone-50 rounded-xl p-4 text-center">
              <div className="text-xl font-bold text-stone-900">{value}</div>
              <div className="text-xs text-stone-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
