import { useEffect, useRef, useState } from "react";
import { T } from "@/lib/invite-content";
import { Toran } from "./Ornaments";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useLang } from "./lang";

function ScratchCard({ value, label, onCleared }: { value: string; label: string; onCleared: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cleared, setCleared] = useState(false);
  const drawing = useRef(false);
  const moves = useRef(0);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = c.getBoundingClientRect();
    c.width = width * dpr;
    c.height = height * dpr;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    const css = getComputedStyle(document.documentElement);
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, css.getPropertyValue("--gold-deep").trim() || "#9a7b45");
    g.addColorStop(0.4, css.getPropertyValue("--gold-soft").trim() || "#e8d3a6");
    g.addColorStop(0.6, css.getPropertyValue("--gold").trim() || "#c9a35e");
    g.addColorStop(1, css.getPropertyValue("--gold-deep").trim() || "#9a7b45");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
    // fine sparkle grain
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    for (let i = 0; i < 140; i++) ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
    // star mark
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = `${Math.round(width * 0.22)}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦", width / 2, height / 2);
  }, []);

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || cleared) return;
    const c = e.currentTarget;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const r = c.getBoundingClientRect();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(e.clientX - r.left, e.clientY - r.top, 18, 0, Math.PI * 2);
    ctx.fill();
    moves.current += 1;
    if (moves.current % 8 === 0) {
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      let clear = 0;
      for (let i = 3; i < data.length; i += 16) if (data[i] === 0) clear++;
      if (clear / (data.length / 16) > 0.45) {
        setCleared(true);
        onCleared();
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-32 w-[6.5rem] overflow-hidden rounded-xl border border-gold/60 bg-card shadow-[var(--shadow-soft)]">
        <div className="flex h-full items-center justify-center">
          <span className="text-4xl font-medium text-gold-deep">{value}</span>
        </div>
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full touch-none transition-opacity duration-700 ${
            cleared ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          onPointerDown={(e) => {
            drawing.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            scratch(e);
          }}
          onPointerMove={scratch}
          onPointerUp={() => (drawing.current = false)}
          onPointerCancel={() => (drawing.current = false)}
          aria-label={label}
        />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export function ScratchDate() {
  const { t } = useLang();
  const [count, setCount] = useState(0);
  const done = count >= 3;
  const inc = () => setCount((c) => c + 1);

  return (
    <section id="date" className="pb-20">
      <Toran className="mb-14" />
      <Reveal className="px-6">
        <SectionHeading title={t(T.auspiciousDate)} />
        <p className="mb-6 text-center text-base text-foreground/80">✦ {t(T.scratchHint)} ✦</p>
        <div className="flex justify-center gap-4">
          <ScratchCard value="1–4" label={t(T.day)} onCleared={inc} />
          <ScratchCard value={t(T.monthName)} label={t(T.month)} onCleared={inc} />
          <ScratchCard value="2026" label={t(T.year)} onCleared={inc} />
        </div>
        <div
          className={`mt-8 text-center transition-all duration-700 ${
            done ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <p className="text-xl text-foreground">{t(T.dateCaption)}</p>
          <p className="mt-1 text-base italic text-muted-foreground">{t(T.dateSub)}</p>
        </div>
      </Reveal>
    </section>
  );
}
