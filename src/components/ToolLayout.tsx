import Link from "next/link";
import NavSearch from "@/components/NavSearch";

export default function ToolLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-[#fafaf7]/80 backdrop-blur-xl border-b border-stone-200/50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-3">
          <Link
            href="/"
            className="font-display text-[22px] text-stone-900 tracking-tight hover:text-[#c2410c] transition-colors"
          >
            FreeTools
          </Link>
          <span className="text-stone-300 text-sm">/</span>
          <span className="text-[14px] font-medium text-stone-400 truncate">
            {title}
          </span>
          <div className="ml-auto">
            <NavSearch />
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-10 animate-fade-in">
        <Link
          href="/"
          className="inline-flex items-center text-[13px] font-semibold text-[#c2410c] hover:text-[#9a3412] mb-10 transition-colors"
        >
          &larr; All tools
        </Link>
        <h1 className="font-display text-[28px] text-stone-900 mb-1.5">
          {title}
        </h1>
        <p className="text-stone-500 mb-8 text-[15px] leading-relaxed">
          {description}
        </p>
        <div className="bg-white rounded-2xl border border-stone-200/60 p-7 shadow-[0_1px_3px_rgba(28,25,23,0.04)]">
          {children}
        </div>
      </main>
    </div>
  );
}
