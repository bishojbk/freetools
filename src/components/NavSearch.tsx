"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { tools, type Tool } from "@/lib/tools";
import { Search, X } from "lucide-react";

export default function NavSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered: Tool[] = query.trim()
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase()) ||
          t.category.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
      >
        <Search size={15} />
        <span className="hidden sm:inline text-xs">Search</span>
        <kbd className="hidden sm:inline text-[10px] font-mono text-stone-300 border border-stone-200 rounded px-1 py-0.5">
          /K
        </kbd>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-start justify-center pt-24"
            onClick={() => setOpen(false)}
          >
            <div className="fixed inset-0 bg-black/30" />
            <div
              className="relative w-full max-w-lg mx-4 bg-white rounded-2xl border border-stone-200/60 shadow-[0_16px_48px_rgba(28,25,23,0.15)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 border-b border-stone-100">
                <Search size={16} className="text-stone-400 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tools..."
                  className="flex-1 py-3.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none bg-transparent !border-none !shadow-none !ring-0"
                />
                {query ? (
                  <button
                    onClick={() => setQuery("")}
                    className="text-stone-400 hover:text-stone-600"
                  >
                    <X size={14} />
                  </button>
                ) : (
                  <kbd className="text-[10px] font-mono text-stone-300 border border-stone-200 rounded px-1.5 py-0.5">
                    ESC
                  </kbd>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {query.trim() && filtered.length === 0 && (
                  <div className="px-4 py-8 text-sm text-stone-400 text-center">
                    No tools found
                  </div>
                )}
                {filtered.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors border-b border-stone-50 last:border-0"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-stone-900">
                        {tool.name}
                      </div>
                      <div className="text-xs text-stone-400 truncate">
                        {tool.description}
                      </div>
                    </div>
                    <span className="ml-auto text-[10px] font-medium text-stone-300 shrink-0">
                      {tool.category}
                    </span>
                  </Link>
                ))}
                {!query.trim() && (
                  <div className="px-4 py-8 text-sm text-stone-400 text-center">
                    Type to search {tools.length} tools
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
