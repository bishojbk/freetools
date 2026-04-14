"use client";
import { useState, useRef, useCallback } from "react";
import ToolLayout from "@/components/ToolLayout";

function fmt(ms: number) {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef(0);

  const start = useCallback(() => {
    startRef.current = Date.now() - time;
    intervalRef.current = setInterval(() => setTime(Date.now() - startRef.current), 10);
    setRunning(true);
  }, [time]);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    setTime(0);
    setLaps([]);
  }, []);

  const lap = useCallback(() => {
    setLaps((prev) => [time, ...prev]);
  }, [time]);

  return (
    <ToolLayout title="Stopwatch" description="Precise stopwatch with lap times">
      <div className="text-center">
        <div className="font-mono text-6xl font-bold text-stone-900 tracking-tight py-8">
          {fmt(time)}
        </div>
        <div className="flex justify-center gap-3">
          {!running ? (
            <button onClick={start} className="px-6 py-2.5 bg-[#c2410c] text-white rounded-lg text-sm font-semibold hover:bg-[#9a3412] transition-colors">
              {time > 0 ? "Resume" : "Start"}
            </button>
          ) : (
            <button onClick={stop} className="px-6 py-2.5 bg-stone-900 text-white rounded-lg text-sm font-semibold hover:bg-stone-800 transition-colors">
              Stop
            </button>
          )}
          {running && (
            <button onClick={lap} className="px-6 py-2.5 bg-stone-100 text-stone-600 rounded-lg text-sm font-semibold hover:bg-stone-200 transition-colors">
              Lap
            </button>
          )}
          {!running && time > 0 && (
            <button onClick={reset} className="px-6 py-2.5 bg-stone-100 text-stone-600 rounded-lg text-sm font-semibold hover:bg-stone-200 transition-colors">
              Reset
            </button>
          )}
        </div>
      </div>
      {laps.length > 0 && (
        <div className="mt-6 space-y-1">
          {laps.map((t, i) => (
            <div key={i} className="flex items-center justify-between bg-stone-50 rounded-lg px-4 py-2 text-sm">
              <span className="text-stone-400">Lap {laps.length - i}</span>
              <span className="font-mono font-semibold text-stone-900">{fmt(t)}</span>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
