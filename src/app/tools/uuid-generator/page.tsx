"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);

  const generate = () => {
    setUuids(Array.from({ length: count }, () => crypto.randomUUID()));
  };

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate random UUIDs (v4)"
    >
      <div className="flex items-center gap-3">
        <label className="text-sm text-stone-500">Count:</label>
        <input
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-20 px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20"
        />
        <button
          onClick={generate}
          className="px-4 py-2 bg-[#c2410c] text-white rounded-lg text-sm hover:bg-[#9a3412] transition-colors"
        >
          Generate
        </button>
        {uuids.length > 0 && (
          <button
            onClick={() => navigator.clipboard.writeText(uuids.join("\n"))}
            className="px-4 py-2 bg-stone-100 text-stone-500 rounded-lg text-sm hover:bg-stone-200 transition-colors"
          >
            Copy All
          </button>
        )}
      </div>
      {uuids.length > 0 && (
        <div className="mt-4 space-y-1">
          {uuids.map((uuid, i) => (
            <div key={i} className="flex items-center gap-2">
              <code className="flex-1 px-3 py-1.5 bg-stone-50 border border-stone-200 rounded text-sm font-mono">
                {uuid}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(uuid)}
                className="text-xs text-[#c2410c] hover:text-[#9a3412] shrink-0"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
