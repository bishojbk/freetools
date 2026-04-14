"use client";
import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  const matches: { match: string; index: number; groups: string[] }[] = [];
  let error = "";
  if (pattern && text) {
    try {
      const re = new RegExp(pattern, flags);
      let m;
      if (flags.includes("g")) {
        while ((m = re.exec(text)) !== null) {
          matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
          if (!m[0]) re.lastIndex++;
        }
      } else {
        m = re.exec(text);
        if (m) matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
      }
    } catch (e) {
      error = (e as Error).message;
    }
  }

  return (
    <ToolLayout title="Regex Tester" description="Test regular expressions with live matching">
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-xs font-medium text-stone-500 mb-1 block">Pattern</label>
            <input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="e.g. \\d+" className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono text-sm" />
          </div>
          <div className="w-24">
            <label className="text-xs font-medium text-stone-500 mb-1 block">Flags</label>
            <input value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="gi" className="w-full px-3 py-2 border border-stone-200 rounded-lg font-mono text-sm" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 mb-1 block">Test String</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to test against..." className="w-full h-32 p-3 border border-stone-200 rounded-lg font-mono text-sm resize-y" />
        </div>
        {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>}
        {matches.length > 0 && (
          <div>
            <div className="text-xs font-medium text-stone-500 mb-2">{matches.length} match{matches.length !== 1 ? "es" : ""}</div>
            <div className="space-y-1.5">
              {matches.map((m, i) => (
                <div key={i} className="flex items-center gap-3 bg-stone-50 rounded-lg px-3 py-2 text-sm">
                  <span className="text-stone-400 font-mono text-xs w-8">#{i + 1}</span>
                  <code className="font-mono text-stone-900">{m.match}</code>
                  <span className="text-xs text-stone-400 ml-auto">index {m.index}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {pattern && text && !error && matches.length === 0 && (
          <div className="text-sm text-stone-400">No matches found.</div>
        )}
      </div>
    </ToolLayout>
  );
}
