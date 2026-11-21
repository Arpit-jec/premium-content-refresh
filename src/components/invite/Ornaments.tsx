import type { ReactNode } from "react";

/* Hand-drawn style ornaments. All colour comes from currentColor / design tokens. */

export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M2 78 V16 Q2 2 16 2 H78" strokeWidth="0.9" />
      <path d="M8 70 V22 Q8 8 22 8 H70" strokeWidth="0.5" strokeOpacity="0.6" />
      <path d="M15 15 c11 0 19 6 21 17 c-11 -1 -19 -7 -21 -17z" fill="currentColor" fillOpacity="0.18" strokeWidth="0.7" />
      <path d="M15 15 c0 11 6 19 17 21 c-1 -11 -7 -19 -17 -21z" fill="currentColor" fillOpacity="0.18" strokeWidth="0.7" />
      <path d="M38 8 c7 0 9 7 4 9 c-3 1 -5 -2 -3 -4" strokeWidth="0.7" />
      <path d="M8 38 c0 7 7 9 9 4 c1 -3 -2 -5 -4 -3" strokeWidth="0.7" />
      <circle cx="15" cy="15" r="2" fill="currentColor" stroke="none" />
      <circle cx="52" cy="8" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="8" cy="52" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="60" cy="8" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="8" cy="60" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function OrnateFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  const c = "pointer-events-none absolute h-14 w-14 text-gold";
  return (
    <div className={`ornate-panel ${className}`}>
      <CornerFlourish className={`${c} left-2 top-2`} />
      <CornerFlourish className={`${c} right-2 top-2 -scale-x-100`} />
      <CornerFlourish className={`${c} bottom-2 left-2 -scale-y-100`} />
      <CornerFlourish className={`${c} bottom-2 right-2 rotate-180`} />
      <div className="relative">{children}</div>
    </div>
  );
}

const PETALS16 = Array.from({ length: 16 }, (_, i) => i * 22.5);
const PETALS8 = Array.from({ length: 8 }, (_, i) => i * 45);
const DOTS = Array.from({ length: 32 }, (_, i) => i * 11.25);

export function Mandala({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-100 -100 200 200" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <circle r="98" strokeWidth="0.6" />
      <circle r="91" strokeWidth="0.4" strokeDasharray="2 3" />
      {DOTS.map((a) => (
        <circle key={a} cx="0" cy="-95" r="1.1" fill="currentColor" stroke="none" transform={`rotate(${a})`} />
      ))}
      {PETALS16.map((a) => (
        <path key={a} d="M0 -32 C11 -50 11 -70 0 -86 C-11 -70 -11 -50 0 -32z" strokeWidth="0.7" transform={`rotate(${a})`} />
      ))}
      {PETALS16.map((a) => (
        <circle key={a} cx="0" cy="-62" r="2.4" strokeWidth="0.6" transform={`rotate(${a + 11.25})`} />
      ))}
      <circle r="30" strokeWidth="0.7" />
      {PETALS8.map((a) => (
        <path key={a} d="M0 -28 C7 -20 7 -10 0 -4 C-7 -10 -7 -20 0 -28z" fill="currentColor" fillOpacity="0.2" strokeWidth="0.6" transform={`rotate(${a})`} />
      ))}
      <circle r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 26" className={className} fill="currentColor" stroke="currentColor" aria-hidden="true">
      <path d="M20 22 C10 23 3 20 0 16 C7 15 14 17 20 22z" fillOpacity="0.15" strokeWidth="0.7" />
      <path d="M20 22 C30 23 37 20 40 16 C33 15 26 17 20 22z" fillOpacity="0.15" strokeWidth="0.7" />
      <path d="M20 22 C12 20 6 14 4 8 C11 9 17 14 20 22z" fillOpacity="0.22" strokeWidth="0.7" />
      <path d="M20 22 C28 20 34 14 36 8 C29 9 23 14 20 22z" fillOpacity="0.22" strokeWidth="0.7" />
      <path d="M20 1 C26 8 26 16 20 22 C14 16 14 8 20 1z" fillOpacity="0.32" strokeWidth="0.7" />
      <path d="M8 25 H32" fill="none" strokeWidth="0.7" />
    </svg>
  );
}

export function GemRule({ className = "" }: { className?: string }) {
  return (
    <div className={`gem-rule ${className}`} aria-hidden="true">
      <span />
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-gold">
        <path d="M6 0 L12 6 L6 12 L0 6z" fill="currentColor" />
      </svg>
      <span />
    </div>
  );
}

/* Marigold toran (garland) that hangs across the top of a section. */
const W = 480;
const SWAGS = 5;
const SW = W / SWAGS;
const TOP = 5;
const SAG = 26;
const CTRL = TOP + SAG * 2;

const BEADS = Array.from({ length: SWAGS }).flatMap((_, s) => {
  const x0 = s * SW;
  const x1 = x0 + SW / 2;
  const x2 = x0 + SW;
  return Array.from({ length: 11 }, (_, k) => {
    const t = (k + 0.5) / 11;
    const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * x1 + t * t * x2;
    const y = (1 - t) ** 2 * TOP + 2 * (1 - t) * t * CTRL + t * t * TOP;
    return { x, y, deep: k % 2 === 1 };
  });
});
const ROPE = Array.from({ length: SWAGS }, (_, s) => `M${s * SW} ${TOP} Q${s * SW + SW / 2} ${CTRL} ${(s + 1) * SW} ${TOP}`).join(" ");
const DROPS = Array.from({ length: SWAGS + 1 }, (_, s) => Math.min(W - 7, Math.max(7, s * SW)));

export function Toran({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 62" className={`block w-full ${className}`} aria-hidden="true">
      <path d={`M0 2 H${W}`} className="stroke-gold-deep" strokeWidth="1.2" />
      <path d={ROPE} fill="none" className="stroke-gold-deep" strokeWidth="0.8" />
      {DROPS.map((x, i) => (
        <g key={i} className="toran-drop" style={{ animationDelay: `${i * -0.7}s` }}>
          <path d={`M${x} 2 V44`} className="stroke-gold-deep" strokeWidth="0.7" />
          {[9, 18, 27].map((y, j) => (
            <g key={y}>
              <circle cx={x} cy={y} r="4.4" className={j % 2 ? "fill-marigold-deep" : "fill-marigold"} />
              <circle cx={x} cy={y} r="1.6" className="fill-gold-soft" fillOpacity="0.7" />
            </g>
          ))}
          <ellipse cx={x - 3.5} cy="35" rx="2" ry="4.5" transform={`rotate(-30 ${x - 3.5} 35)`} className="fill-leaf" />
          <ellipse cx={x + 3.5} cy="35" rx="2" ry="4.5" transform={`rotate(30 ${x + 3.5} 35)`} className="fill-leaf" />
          <path d={`M${x - 3.5} 49 C${x - 3.5} 43 ${x + 3.5} 43 ${x + 3.5} 49 L${x + 4.5} 50.5 H${x - 4.5}z`} className="fill-gold" />
          <circle cx={x} cy="52" r="1.3" className="fill-gold-deep" />
        </g>
      ))}
      {BEADS.map((b, i) => (
        <g key={i}>
          <circle cx={b.x} cy={b.y} r="4.6" className={b.deep ? "fill-marigold-deep" : "fill-marigold"} />
          <circle cx={b.x} cy={b.y} r="1.7" className="fill-gold-soft" fillOpacity="0.65" />
        </g>
      ))}
    </svg>
  );
}
