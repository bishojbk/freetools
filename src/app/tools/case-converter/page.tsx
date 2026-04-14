"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const conversions = [
  { label: "UPPERCASE", fn: (t: string) => t.toUpperCase() },
  { label: "lowercase", fn: (t: string) => t.toLowerCase() },
  {
    label: "Title Case",
    fn: (t: string) =>
      t.replace(
        /\w\S*/g,
        (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(),
      ),
  },
  {
    label: "Sentence case",
    fn: (t: string) =>
      t
        .toLowerCase()
        .replace(/(^\s*|[.!?]\s+)(\w)/g, (_, p, c) => p + c.toUpperCase()),
  },
  {
    label: "camelCase",
    fn: (t: string) =>
      t
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
  },
  {
    label: "snake_case",
    fn: (t: string) =>
      t
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .replace(/^_|_$/g, ""),
  },
  {
    label: "kebab-case",
    fn: (t: string) =>
      t
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
  },
];

export default function CaseConverter() {
  const [text, setText] = useState("");

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text between different cases"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text..."
        className="w-full h-32 p-3 border border-stone-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20 focus:border-transparent text-sm"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
        {conversions.map((c) => (
          <button
            key={c.label}
            onClick={() => setText(c.fn(text))}
            className="px-3 py-2 text-sm bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors text-stone-500"
          >
            {c.label}
          </button>
        ))}
      </div>
    </ToolLayout>
  );
}
