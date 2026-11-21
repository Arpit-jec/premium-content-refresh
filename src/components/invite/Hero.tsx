import heroImg from "@/assets/hero-garden.webp";
import { COUPLE, T } from "@/lib/invite-content";
import { Divider } from "./Divider";
import { useLang } from "./lang";

const PETALS = [
  { left: "8%", delay: "0s", dur: "13s", size: 10 },
  { left: "22%", delay: "4s", dur: "16s", size: 8 },
  { left: "41%", delay: "8s", dur: "14s", size: 11 },
  { left: "63%", delay: "2s", dur: "17s", size: 9 },
  { left: "78%", delay: "6s", dur: "12s", size: 12 },
  { left: "90%", delay: "10s", dur: "15s", size: 8 },
];

export function Hero({ revealed }: { revealed: boolean }) {
  const { t } = useLang();
  return (
    <section data-revealed={revealed} className="relative h-[100dvh] min-h-[640px] overflow-hidden">
      <img
        src={heroImg}
        alt=""
        className="hero-photo absolute inset-0 h-full w-full object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-[image:var(--gradient-fade-bottom)]" />

      <div className="pointer-events-none absolute inset-0">
        {PETALS.map((p, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className="animate-petal absolute top-0 text-gold-soft"
            style={{ left: p.left, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.dur }}
            aria-hidden="true"
          >
            <path d="M10 1 C15 5 15 13 10 19 C5 13 5 5 10 1z" fill="currentColor" />
          </svg>
        ))}
      </div>

      <div className="relative flex h-full flex-col items-center px-6 pt-[15%] text-center">
        <p className="hero-in eyebrow text-gold-deep [transition-delay:300ms]">{t(T.shubhVivah)}</p>
        <h1 className="mt-4 flex flex-col items-center">
          <span className="hero-in font-script text-6xl leading-tight [transition-delay:550ms]">
            <span className="gold-ink animate-shimmer">{t(COUPLE.groom.first)}</span>
          </span>
          <span className="hero-in my-1 text-lg italic text-foreground/70 [transition-delay:850ms]">{t(T.weds)}</span>
          <span className="hero-in font-script text-6xl leading-tight [transition-delay:1100ms]">
            <span className="gold-ink animate-shimmer">{t(COUPLE.bride.first)}</span>
          </span>
        </h1>
        <div className="hero-in [transition-delay:1400ms]">
          <Divider className="mt-4" />
        </div>
        <p className="hero-in mt-2 text-lg text-foreground/80 [transition-delay:1600ms]">{t(T.dateCaption)}</p>
      </div>

      <a
        href="#date"
        className="hero-in absolute inset-x-0 bottom-6 flex flex-col items-center text-sm text-foreground/70 [transition-delay:2200ms]"
      >
        {t(T.scrollDown)}
        <svg viewBox="0 0 24 24" className="animate-bob mt-1 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
