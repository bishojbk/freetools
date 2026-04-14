"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [dateStr, setDateStr] = useState("");

  const now = () => {
    const ts = Math.floor(Date.now() / 1000);
    setTimestamp(String(ts));
    setDateStr(new Date(ts * 1000).toISOString());
  };

  const fromTimestamp = () => {
    const num = Number(timestamp);
    if (isNaN(num)) return;
    const ms = timestamp.length > 10 ? num : num * 1000;
    setDateStr(new Date(ms).toISOString());
  };

  const fromDate = () => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return;
    setTimestamp(String(Math.floor(d.getTime() / 1000)));
  };

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert Unix timestamps to dates and back"
    >
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">
            Unix Timestamp
          </label>
          <div className="flex gap-2">
            <input
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="e.g. 1700000000"
              className="flex-1 px-3 py-2 border border-stone-200 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20"
            />
            <button
              onClick={fromTimestamp}
              className="px-4 py-2 bg-[#c2410c] text-white rounded-lg text-sm hover:bg-[#9a3412] transition-colors"
            >
              To Date
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">
            Date (ISO 8601)
          </label>
          <div className="flex gap-2">
            <input
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              placeholder="e.g. 2024-01-01T00:00:00.000Z"
              className="flex-1 px-3 py-2 border border-stone-200 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20"
            />
            <button
              onClick={fromDate}
              className="px-4 py-2 bg-[#c2410c] text-white rounded-lg text-sm hover:bg-[#9a3412] transition-colors"
            >
              To Timestamp
            </button>
          </div>
        </div>
        <button
          onClick={now}
          className="px-4 py-2 bg-stone-100 text-stone-500 rounded-lg text-sm hover:bg-stone-200 transition-colors"
        >
          Use Current Time
        </button>
      </div>
    </ToolLayout>
  );
}
