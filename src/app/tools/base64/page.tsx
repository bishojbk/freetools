"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const encode = () => {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
      setError("");
    } catch {
      setError("Failed to encode");
    }
  };

  const decode = () => {
    try {
      setOutput(decodeURIComponent(escape(atob(input))));
      setError("");
    } catch {
      setError("Invalid Base64 string");
    }
  };

  return (
    <ToolLayout
      title="Base64 Encode/Decode"
      description="Encode or decode Base64 strings"
    >
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to encode or Base64 to decode..."
        className="w-full h-32 p-3 border border-stone-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20 focus:border-transparent font-mono text-sm"
      />
      <div className="flex gap-3 mt-4">
        <button
          onClick={encode}
          className="px-4 py-2 bg-[#c2410c] text-white rounded-lg text-sm hover:bg-[#9a3412] transition-colors"
        >
          Encode
        </button>
        <button
          onClick={decode}
          className="px-4 py-2 bg-stone-100 text-stone-500 rounded-lg text-sm hover:bg-stone-200 transition-colors"
        >
          Decode
        </button>
      </div>
      {error && (
        <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}
      {output && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-stone-500">Result</span>
            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="text-sm text-[#c2410c] hover:text-[#9a3412]"
            >
              Copy
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            className="w-full h-32 p-3 border border-stone-200 rounded-lg resize-y font-mono text-sm bg-stone-50"
          />
        </div>
      )}
    </ToolLayout>
  );
}
