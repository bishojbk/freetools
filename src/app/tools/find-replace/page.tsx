"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function FindReplace() {
  const [text, setText] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [useRegex, setUseRegex] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);

  const getResult = () => {
    if (!find || !text) return text;
    try {
      if (useRegex) {
        return text.replace(
          new RegExp(find, caseSensitive ? "g" : "gi"),
          replace,
        );
      }
      const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return text.replace(
        new RegExp(escaped, caseSensitive ? "g" : "gi"),
        replace,
      );
    } catch {
      return text;
    }
  };

  const getMatchCount = () => {
    if (!find || !text) return 0;
    try {
      const pattern = useRegex
        ? find
        : find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return (
        text.match(new RegExp(pattern, caseSensitive ? "g" : "gi")) || []
      ).length;
    } catch {
      return 0;
    }
  };

  const result = getResult();
  const matchCount = getMatchCount();

  return (
    <ToolLayout
      title="Find & Replace"
      description="Find and replace text with regex support"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        className="w-full h-32 p-3 border border-stone-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20 text-sm"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        <input
          value={find}
          onChange={(e) => setFind(e.target.value)}
          placeholder="Find..."
          className="px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20"
        />
        <input
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
          placeholder="Replace with..."
          className="px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20"
        />
      </div>
      <div className="flex items-center gap-4 mt-3">
        <label className="flex items-center gap-2 text-sm text-stone-500">
          <input
            type="checkbox"
            checked={useRegex}
            onChange={(e) => setUseRegex(e.target.checked)}
            className="rounded"
          />
          Regex
        </label>
        <label className="flex items-center gap-2 text-sm text-stone-500">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="rounded"
          />
          Case sensitive
        </label>
        <span className="text-sm text-stone-500">
          {matchCount} match{matchCount !== 1 ? "es" : ""}
        </span>
      </div>
      {text && find && (
        <div className="mt-4">
          <div className="text-sm font-medium text-stone-500 mb-2">
            Result:
          </div>
          <textarea
            readOnly
            value={result}
            className="w-full h-32 p-3 border border-stone-200 rounded-lg resize-y text-sm bg-stone-50"
          />
        </div>
      )}
    </ToolLayout>
  );
}
