import Link from "next/link";
import { categories, getToolsByCategory, tools } from "@/lib/tools";
import {
  Type, Code2, Palette, Sparkles, ArrowLeftRight,
  FileText, CaseSensitive, AlignLeft, Replace,
  Braces, Binary, Fingerprint, Hash, Link as LinkIcon,
  Pipette, Blend, Square,
  KeyRound, QrCode,
  Ruler, Clock, Percent, Receipt,
  Wrench, Regex,
  Heart, Calendar, Calculator, Briefcase, Hammer,
  Scale, Flame, Droplets,
  Cake, CalendarDays, Timer,
  Dices, TrendingUp, Languages,
  Tag, Landmark, DollarSign,
  Paintbrush, Grid3X3,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>> = {
  Type, Code2, Palette, Sparkles, ArrowLeftRight,
  FileText, CaseSensitive, AlignLeft, Replace,
  Braces, Binary, Fingerprint, Hash, Link: LinkIcon,
  Pipette, Blend, Square,
  KeyRound, QrCode,
  Ruler, Clock, Percent, Receipt,
  Regex,
  Heart, Calendar, Calculator, Briefcase, Hammer,
  Scale, Flame, Droplets,
  Cake, CalendarDays, Timer,
  Dices, TrendingUp, Languages,
  Tag, Landmark, DollarSign,
  Paintbrush, Grid3X3,
};

const categoryStyle: Record<string, { iconBg: string; iconText: string }> = {
  "Text Tools":               { iconBg: "bg-sky-50",      iconText: "text-sky-700" },
  "Developer Tools":          { iconBg: "bg-violet-50",   iconText: "text-violet-700" },
  "CSS & Design":             { iconBg: "bg-rose-50",     iconText: "text-rose-700" },
  "Generators":               { iconBg: "bg-teal-50",     iconText: "text-teal-700" },
  "Converters & Calculators": { iconBg: "bg-amber-50",    iconText: "text-amber-700" },
  "Health & Fitness":         { iconBg: "bg-red-50",      iconText: "text-red-700" },
  "Date & Time":              { iconBg: "bg-cyan-50",     iconText: "text-cyan-700" },
  "Math":                     { iconBg: "bg-indigo-50",   iconText: "text-indigo-700" },
  "Business":                 { iconBg: "bg-lime-50",     iconText: "text-lime-700" },
  "DIY & Home":               { iconBg: "bg-yellow-50",   iconText: "text-yellow-700" },
};

function ToolIcon({ name, category }: { name: string; category: string }) {
  const Icon = iconMap[name] || Wrench;
  const colors = categoryStyle[category] || categoryStyle["Text Tools"];
  return (
    <div className={`w-10 h-10 rounded-xl ${colors.iconBg} ${colors.iconText} flex items-center justify-center shrink-0`}>
      <Icon size={20} strokeWidth={1.8} />
    </div>
  );
}

function CategoryIcon({ name }: { name: string }) {
  const Icon = iconMap[name] || Wrench;
  return <Icon size={16} strokeWidth={1.8} />;
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-[#fafaf7]/80 backdrop-blur-xl border-b border-stone-200/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-[22px] text-stone-900 tracking-tight">
            FreeTools
          </Link>
          <span className="text-[11px] font-medium text-stone-400 font-mono tracking-wide uppercase">
            {tools.length} tools
          </span>
        </div>
      </header>

      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 10% 0%, rgba(194,65,12,0.04) 0%, transparent 55%), radial-gradient(ellipse at 90% 100%, rgba(120,53,15,0.02) 0%, transparent 50%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 pt-24 sm:pt-32 pb-20 relative">
          <div className="animate-fade-in-up">
            <h1 className="font-display text-[clamp(3rem,7.5vw,5.5rem)] leading-[1.05] tracking-[-0.02em] text-stone-900">
              Free Online
              <br />
              <span className="italic text-[#c2410c]">Tools</span>
            </h1>
          </div>
          <div className="animate-fade-in-up mt-6" style={{ animationDelay: "0.1s" }}>
            <p className="text-[17px] text-stone-500 max-w-lg leading-[1.7]">
              Fast, private, and completely free. No signup, no tracking &mdash;
              everything runs right in your browser.
            </p>
          </div>
          <div className="animate-fade-in-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.2s" }}>
            {["No tracking", "No ads", "100% client-side"].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-stone-500 bg-white/80 rounded-full px-4 py-2 border border-stone-200/60 shadow-[0_1px_2px_rgba(28,25,23,0.04)]"
              >
                <span className="w-[7px] h-[7px] rounded-full bg-emerald-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-stone-200/60" />
      </div>

      <main className="max-w-6xl mx-auto px-6 py-14 flex-1 w-full">
        {categories.map((category, catIdx) => {
          const categoryTools = getToolsByCategory(category.name);
          const colors = categoryStyle[category.name];
          return (
            <section
              key={category.name}
              className="mb-14 animate-fade-in-up"
              style={{ animationDelay: `${0.28 + catIdx * 0.05}s` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-8 h-8 rounded-lg ${colors?.iconBg} ${colors?.iconText} flex items-center justify-center`}>
                  <CategoryIcon name={category.icon} />
                </div>
                <h2 className="font-display text-[19px] text-stone-900">
                  {category.name}
                </h2>
                <span className="flex-1 h-px bg-stone-200/50 ml-1" />
                <span className="text-[11px] font-medium text-stone-400 font-mono">
                  {categoryTools.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {categoryTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group flex items-start gap-4 bg-white rounded-2xl border border-stone-200/60 p-[18px] tool-card"
                  >
                    <ToolIcon name={tool.icon} category={tool.category} />
                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-[15px] font-semibold text-stone-900 group-hover:text-[#c2410c] transition-colors duration-200">
                        {tool.name}
                      </h3>
                      <p className="text-[13px] text-stone-400 mt-0.5 leading-[1.5]">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <footer className="border-t border-stone-200/50 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-[15px] text-stone-400 italic">
            Free forever
          </span>
          <span className="text-[12px] text-stone-300">
            No tracking. No ads. Your data never leaves your device.
          </span>
        </div>
      </footer>
    </div>
  );
}
