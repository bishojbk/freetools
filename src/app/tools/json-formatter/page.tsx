"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate, and minify JSON"
    >
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Paste JSON here, e.g. {"key": "value"}'
        className="w-full h-40 p-3 border border-stone-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20 focus:border-transparent font-mono text-sm"
      />
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={format}
          className="px-4 py-2 bg-[#c2410c] text-white rounded-lg text-sm hover:bg-[#9a3412] transition-colors"
        >
          Format
        </button>
        <button
          onClick={minify}
          className="px-4 py-2 bg-stone-100 text-stone-500 rounded-lg text-sm hover:bg-stone-200 transition-colors"
        >
          Minify
        </button>
        <label className="flex items-center gap-2 text-sm text-stone-500 ml-auto">
          Indent:
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="px-2 py-1 border border-stone-200 rounded text-sm"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
          </select>
        </label>
      </div>
      {error && (
        <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}
      {output && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-stone-500">Output</span>
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
            className="w-full h-40 p-3 border border-stone-200 rounded-lg resize-y font-mono text-sm bg-stone-50"
          />
        </div>
      )}
    </ToolLayout>
  );
}
