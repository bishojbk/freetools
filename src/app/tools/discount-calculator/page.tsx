"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const p = parseFloat(price) || 0;
  const d = parseFloat(discount) || 0;
  const savings = p * d / 100;
  const finalPrice = p - savings;

  return (
    <ToolLayout title="Discount Calculator" description="Calculate sale price and savings">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Original Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="100" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Discount (%)</label>
          <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="20" className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm" />
        </div>
      </div>
      {p > 0 && d > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-stone-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-stone-900">${finalPrice.toFixed(2)}</div>
            <div className="text-xs text-stone-400 mt-1">Sale Price</div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-700">${savings.toFixed(2)}</div>
            <div className="text-xs text-stone-400 mt-1">You Save</div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
