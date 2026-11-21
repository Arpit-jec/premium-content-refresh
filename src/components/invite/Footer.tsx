import { COUPLE, T, VENUE } from "@/lib/invite-content";
import { Divider } from "./Divider";
import { Mandala } from "./Ornaments";
import { Reveal } from "./Reveal";
import { useLang } from "./lang";

export function Footer() {
  const { t } = useLang();
  // Ring stays in Latin letters: spaced Devanagari breaks its conjuncts on a curved path.
  const ring = `${COUPLE.groom.first.en} ✦ ${COUPLE.bride.first.en} ✦ 01 · 12 · 2026 ✦ ${VENUE.city.en} ✦ `;
  return (
    <footer className="band-rich px-6 pb-32 pt-16 text-center">
      <Reveal>
        <Divider className="text-gold-soft" />
        <p className="mt-4 text-lg italic text-band-foreground">{t(T.withLove)}</p>

        <div className="relative mx-auto mt-10 h-48 w-48">
          <Mandala className="animate-mandala absolute -inset-10 text-gold-soft/15" />
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <path id="mono-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <circle cx="100" cy="100" r="96" fill="none" className="stroke-gold-soft" strokeOpacity="0.6" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="62" fill="none" className="stroke-gold-soft" strokeOpacity="0.6" strokeWidth="0.8" />
            <g className="animate-mandala origin-center [transform-box:fill-box]">
              <text className="mono-ring-text">
                <textPath href="#mono-ring" textLength="488" lengthAdjust="spacing">
                  {ring}
                </textPath>
              </text>
            </g>
          </svg>
          <div className="monogram-disc absolute inset-[24%] flex items-center justify-center rounded-full">
            <span className="gold-text text-5xl font-medium tracking-tighter">
              A<span className="-ml-1 align-sub text-4xl">E</span>
            </span>
          </div>
        </div>

        <p className="mt-8 font-script text-5xl leading-tight">
          <span className="gold-text">
            {t(COUPLE.groom.first)} <span className="text-2xl">&amp;</span> {t(COUPLE.bride.first)}
          </span>
        </p>
        <p className="mt-3 text-sm tracking-[0.3em] text-band-foreground/70">01 · 12 · 2026 — 04 · 12 · 2026</p>
      </Reveal>
    </footer>
  );
}
