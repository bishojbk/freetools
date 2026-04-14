"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});

  const generate = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const results: Record<string, string> = {};
    for (const algo of ["SHA-1", "SHA-256", "SHA-384", "SHA-512"]) {
      const hash = await crypto.subtle.digest(algo, data);
      results[algo] = Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
    setHashes(results);
  };

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate SHA-1, SHA-256, SHA-384, and SHA-512 hashes"
    >
      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="flex-1 px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20"
          onKeyDown={(e) => e.key === "Enter" && generate()}
        />
        <button
          onClick={generate}
          className="px-4 py-2 bg-[#c2410c] text-white rounded-lg text-sm hover:bg-[#9a3412] transition-colors"
        >
          Hash
        </button>
      </div>
      {Object.keys(hashes).length > 0 && (
        <div className="mt-4 space-y-3">
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-stone-500">
                  {algo}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(hash)}
                  className="text-xs text-[#c2410c] hover:text-[#9a3412]"
                >
                  Copy
                </button>
              </div>
              <input
                readOnly
                value={hash}
                className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono text-xs bg-stone-50"
              />
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
