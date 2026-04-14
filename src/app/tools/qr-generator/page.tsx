"use client";

import { useState, useRef } from "react";
import QRCode from "qrcode";
import ToolLayout from "@/components/ToolLayout";

export default function QrGenerator() {
  const [text, setText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generated, setGenerated] = useState(false);

  const generate = async () => {
    if (!text || !canvasRef.current) return;
    await QRCode.toCanvas(canvasRef.current, text, {
      width: 256,
      margin: 2,
    });
    setGenerated(true);
  };

  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes from text or URLs"
    >
      <div className="flex gap-3 mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL..."
          className="flex-1 px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c2410c]/20"
          onKeyDown={(e) => e.key === "Enter" && generate()}
        />
        <button
          onClick={generate}
          className="px-4 py-2 bg-[#c2410c] text-white rounded-lg text-sm hover:bg-[#9a3412] transition-colors"
        >
          Generate
        </button>
      </div>
      <div className="flex flex-col items-center">
        <canvas ref={canvasRef} className={generated ? "" : "hidden"} />
        {generated && (
          <button
            onClick={download}
            className="mt-4 px-4 py-2 bg-stone-100 text-stone-500 rounded-lg text-sm hover:bg-stone-200 transition-colors"
          >
            Download PNG
          </button>
        )}
      </div>
    </ToolLayout>
  );
}
