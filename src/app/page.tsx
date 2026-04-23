import Link from "next/link";
import { categories, getToolsByCategory, tools } from "@/lib/tools";
import NavSearch from "@/components/NavSearch";
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
          <div className="flex items-center gap-3">
            <NavSearch />
            <span className="text-[11px] font-medium text-stone-400 font-mono tracking-wide uppercase">
              {tools.length} tools
            </span>
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 10% 0%, rgba(194,65,12,0.04) 0%, transparent 55%), radial-gradient(ellipse at 90% 100%, rgba(120,53,15,0.02) 0%, transparent 50%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 pt-24 sm:pt-32 pb-20 relative flex items-start justify-between gap-8">
          <div className="flex-1 min-w-0">
            <div className="animate-fade-in-up">
              <h1 className="text-[clamp(3rem,7.5vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-stone-900">
                Free Online
                <br />
                <span className="text-[#c2410c]">Tools</span>
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

          {/* Floating illustration */}
          <div className="hidden lg:block w-[380px] shrink-0 relative h-[380px] animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            {/* Gear */}
            <svg className="absolute top-0 right-[40px] hero-float" width="72" height="72" viewBox="0 0 90 90" fill="none" style={{ animationDelay: "0s" }}>
              <path d="M45 18a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v5.1a22 22 0 0 1 7.6 4.4l4.4-2.5a2 2 0 0 1 2.7.7l3 5.2a2 2 0 0 1-.7 2.7l-4.4 2.6a22 22 0 0 1 0 8.8l4.4 2.5a2 2 0 0 1 .7 2.7l-3 5.2a2 2 0 0 1-2.7.7L57.6 53a22 22 0 0 1-7.6 4.4V63a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-5.1a22 22 0 0 1-7.6-4.4l-4.4 2.5a2 2 0 0 1-2.7-.7l-3-5.2a2 2 0 0 1 .7-2.7l4.4-2.6a22 22 0 0 1 0-8.8l-4.4-2.5a2 2 0 0 1-.7-2.7l3-5.2a2 2 0 0 1 2.7-.7l4.4 2.5A22 22 0 0 1 43 23.1V18z" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.45"/>
              <circle cx="48" cy="42" r="9" stroke="#c2410c" strokeWidth="2" opacity="0.45"/>
            </svg>

            {/* Brackets */}
            <svg className="absolute top-[20px] right-[220px] hero-float" width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ animationDelay: "0.7s" }}>
              <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
            </svg>

            {/* Wrench */}
            <svg className="absolute top-[110px] right-0 hero-float" width="52" height="52" viewBox="0 0 24 24" fill="none" style={{ animationDelay: "1.4s" }}>
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="#d6d3d1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {/* Lock / Key */}
            <svg className="absolute top-[100px] right-[190px] hero-float" width="42" height="42" viewBox="0 0 24 24" fill="none" style={{ animationDelay: "2.1s" }}>
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="#d6d3d1" strokeWidth="1.5"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#d6d3d1" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>

            {/* Hash */}
            <svg className="absolute top-[195px] right-[120px] hero-float" width="44" height="44" viewBox="0 0 24 24" fill="none" style={{ animationDelay: "0.3s" }}>
              <path d="M4 9h16M4 15h16M10 3l-2 18M16 3l-2 18" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
            </svg>

            {/* Color palette circle */}
            <svg className="absolute top-[190px] right-[10px] hero-float" width="50" height="50" viewBox="0 0 55 55" fill="none" style={{ animationDelay: "1.8s" }}>
              <circle cx="27.5" cy="27.5" r="22" stroke="#d6d3d1" strokeWidth="1.5"/>
              <circle cx="27.5" cy="13" r="4" fill="#c2410c" opacity="0.4"/>
              <circle cx="17" cy="33" r="4" fill="#0ea5e9" opacity="0.3"/>
              <circle cx="38" cy="33" r="4" fill="#d97706" opacity="0.3"/>
            </svg>

            {/* Ruler */}
            <svg className="absolute top-[200px] right-[260px] hero-float" width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ animationDelay: "2.5s" }}>
              <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0z" stroke="#d6d3d1" strokeWidth="1.5"/>
              <path d="M14.5 12.8l-2-2M11.5 9.8l-2-2M17.5 15.8l-2-2" stroke="#d6d3d1" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>

            {/* Terminal */}
            <svg className="absolute top-[290px] right-[55px] hero-float" width="52" height="42" viewBox="0 0 56 44" fill="none" style={{ animationDelay: "0.9s" }}>
              <rect x="1" y="1" width="54" height="42" rx="6" stroke="#d6d3d1" strokeWidth="1.5"/>
              <path d="M14 16l6 6-6 6M24 28h10" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45"/>
            </svg>

            {/* Calculator */}
            <svg className="absolute top-[300px] right-[200px] hero-float" width="38" height="38" viewBox="0 0 24 24" fill="none" style={{ animationDelay: "1.1s" }}>
              <rect x="4" y="2" width="16" height="20" rx="2" stroke="#c2410c" strokeWidth="1.5" opacity="0.3"/>
              <path d="M8 6h8M8 12h2M14 12h2M8 16h2M14 16h2" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
            </svg>

            {/* QR small */}
            <svg className="absolute top-[95px] right-[95px] hero-float" width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ animationDelay: "2.8s" }}>
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="#d6d3d1" strokeWidth="1.5"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="#d6d3d1" strokeWidth="1.5"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="#d6d3d1" strokeWidth="1.5"/>
              <rect x="14" y="14" width="3" height="3" stroke="#d6d3d1" strokeWidth="1.5"/>
              <rect x="18" y="18" width="3" height="3" stroke="#d6d3d1" strokeWidth="1.5"/>
            </svg>
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

      <div className="border-t border-stone-200/50 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-[15px] text-stone-400 italic">
            Free forever
          </span>
          <span className="text-[12px] text-stone-300">
            No tracking. No ads. Your data never leaves your device.
          </span>
        </div>
      </div>
    </div>
  );
}
