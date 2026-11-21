import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; vr: number; s: number; c: string; shape: number; life: number };

const VARS = ["--gold", "--gold-deep", "--gold-soft", "--primary", "--accent"];

/** Festive gold confetti burst on every tap/click anywhere on the invitation. */
export function TapConfetti() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cs = getComputedStyle(document.documentElement);
    const colors = VARS.map((v) => cs.getPropertyValue(v).trim()).filter(Boolean);
    let parts: P[] = [];
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      cv.width = innerWidth * dpr;
      cv.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const tick = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      parts = parts.filter((p) => p.life > 0 && p.y < innerHeight + 20);
      for (const p of parts) {
        p.vy += 0.18; p.vx *= 0.985; p.vy *= 0.985;
        p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life -= 1;
        ctx.save();
        ctx.globalAlpha = Math.min(1, p.life / 30);
        ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        if (p.shape === 0) ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        else if (p.shape === 1) { ctx.beginPath(); ctx.arc(0, 0, p.s / 3, 0, 7); ctx.fill(); }
        else { ctx.beginPath(); ctx.ellipse(0, 0, p.s / 2, p.s / 5, 0, 0, 7); ctx.fill(); }
        ctx.restore();
      }
      raf = parts.length ? requestAnimationFrame(tick) : 0;
    };
    const burst = (e: PointerEvent) => {
      for (let i = 0; i < 34; i++) {
        const a = Math.random() * Math.PI * 2, sp = 3 + Math.random() * 6;
        parts.push({
          x: e.clientX, y: e.clientY, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 3,
          r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, s: 6 + Math.random() * 6,
          c: colors[i % colors.length] ?? "gold", shape: i % 3, life: 80 + Math.random() * 40,
        });
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    addEventListener("pointerdown", burst, { passive: true });
    addEventListener("resize", resize);
    return () => { removeEventListener("pointerdown", burst); removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[9999] h-full w-full" />;
}
