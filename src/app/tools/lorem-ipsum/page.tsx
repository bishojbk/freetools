"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

const PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
  "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.",
  "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.",
  "Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.",
  "Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.",
  "Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.",
];

export default function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");

  const generate = () => {
    const result = Array.from(
      { length: count },
      (_, i) => PARAGRAPHS[i % PARAGRAPHS.length],
    ).join("\n\n");
    setOutput(result);
  };

  return (
    <ToolLayout
      title="Lorem Ipsum"
      description="Generate placeholder text"
    >
      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm text-stone-500">Paragraphs:</label>
        <input
          type="number"
          min={1}
          max={50}
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
        {output && (
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="px-4 py-2 bg-stone-100 text-stone-500 rounded-lg text-sm hover:bg-stone-200 transition-colors"
          >
            Copy
          </button>
        )}
      </div>
      {output && (
        <textarea
          readOnly
          value={output}
          className="w-full h-64 p-3 border border-stone-200 rounded-lg resize-y text-sm text-stone-500 bg-stone-50"
        />
      )}
    </ToolLayout>
  );
}
