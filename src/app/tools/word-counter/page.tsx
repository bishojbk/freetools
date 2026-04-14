"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim()
    ? text.split(/[.!?]+/).filter(Boolean).length
    : 0;
  const paragraphs = text.trim()
    ? text.split(/\n\n+/).filter((s) => s.trim()).length
    : 0;
  const lines = text.trim() ? text.split("\n").length : 0;

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        className="w-full h-48 p-3 border border-stone-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20 focus:border-transparent font-mono text-sm"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {(
          [
            ["Words", words],
            ["Characters", chars],
            ["No Spaces", charsNoSpaces],
            ["Sentences", sentences],
            ["Paragraphs", paragraphs],
            ["Lines", lines],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="bg-stone-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-stone-900">{value}</div>
            <div className="text-xs text-stone-500 mt-1">{label}</div>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
