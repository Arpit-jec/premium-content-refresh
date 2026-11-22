import { useEffect, useRef, useState, type CSSProperties } from "react";
import envelopeVideo from "@/assets/envelope_opening_hd.mp4";
import envelopePoster from "@/assets/envelope-poster.webp";
import { COUPLE, T } from "@/lib/invite-content";
import { Divider } from "./Divider";
import { useLang } from "./lang";

/*
 * Opening sequence:
 *  sealed  → ambient envelope (gentle breathing, gold dust, spinning ring)
 *  pressed → finger down: the wax seal sinks in (tactile feedback)
 *  opening → seal lifts away with a gold burst while the envelope film plays
 *  bloom   → warm ivory light spreads from the centre, petals drift down
 *  leaving → overlay dissolves into the invitation
 */
type Phase = "sealed" | "opening" | "bloom" | "leaving";

// Seal position (x 362, y 630, Ø 222 in the 720×1280 poster) lives in .seal-anchor in styles.css.

// Deterministic pseudo-random so server and browser render identical markup.
function seeded(n: number) {
  let s = n * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const rnd = seeded(7);
const DUST = Array.from({ length: 26 }, () => ({
  left: `${Math.round(rnd() * 100)}%`,
  top: `${Math.round(10 + rnd() * 85)}%`,
  size: 2 + Math.round(rnd() * 3),
  delay: `${(rnd() * 6).toFixed(2)}s`,
  dur: `${(5 + rnd() * 5).toFixed(2)}s`,
}));

const SPARKS = Array.from({ length: 20 }, (_, i) => {
  const a = (i / 20) * Math.PI * 2 + rnd() * 0.3;
  const dist = 120 + Math.round(rnd() * 110);
  return {
    dx: `${Math.round(Math.cos(a) * dist)}px`,
    dy: `${Math.round(Math.sin(a) * dist)}px`,
    size: 4 + Math.round(rnd() * 5),
    delay: `${Math.round(rnd() * 120)}ms`,
  };
});

const PETALS = Array.from({ length: 18 }, () => ({
  left: `${Math.round(rnd() * 100)}%`,
  size: 9 + Math.round(rnd() * 8),
  delay: `${(rnd() * 0.9).toFixed(2)}s`,
  dur: `${(2.6 + rnd() * 1.6).toFixed(2)}s`,
  drift: `${Math.round(-60 + rnd() * 120)}px`,
}));

export function Opening({
  onOpenStart,
  onReveal,
  onDone,
}: {
  onOpenStart: () => void;
  onReveal: () => void;
  onDone: () => void;
}) {
  const { t } = useLang();
  const [phase, setPhase] = useState<Phase>("sealed");
  const [pressed, setPressed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bloomed = useRef(false);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const bloom = () => {
    if (bloomed.current) return;
    bloomed.current = true;
    setPhase("bloom");
    later(() => {
      setPhase("leaving");
      onReveal();
    }, 1100);
    later(onDone, 2300);
  };

  const open = () => {
    if (phase !== "sealed") return;
    setPressed(false);
    setPhase("opening");
    onOpenStart();
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(18);
    const v = videoRef.current;
    if (!v) return later(bloom, 1200);
    v.currentTime = 0;
    // Play inside the tap itself so phones allow the envelope sound; the lifting
    // seal and gold burst cover the first frames of the film.
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => bloom());
    });
    // Begin the light bloom just before the film ends so it flows without a pause.
    later(bloom, Math.max(1300, (v.duration || 2.07) * 1000 - 280));
    later(bloom, 5000); // safety net
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const list = timers.current;
    return () => {
      document.body.style.overflow = "";
      list.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const sealed = phase === "sealed";
  const sealStyle = {
    "--seal-bg": `url(${envelopePoster})`,
  } as CSSProperties;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center bg-backdrop transition-opacity duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div
        className="opening-stage relative h-[100dvh] w-full max-w-[480px] cursor-pointer select-none overflow-hidden"
        onClick={open}
        onPointerDown={() => sealed && setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        role="button"
        aria-label={t(T.tapSeal)}
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open()}
      >
        {/* Envelope + seal breathe together so the seal overlay always lines up */}
        <div
          className={`animate-breathe absolute inset-0 transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            sealed ? "" : "[animation-play-state:paused]"
          } ${phase === "leaving" ? "scale-[1.12]" : ""}`}
        >
          <video
            ref={videoRef}
            src={envelopeVideo.url}
            poster={envelopePoster}
            playsInline
            preload="auto"
            onEnded={bloom}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Pulsing halos + spinning inscription around the seal */}
          <div
            className={`seal-anchor transition-opacity duration-500 ${sealed ? "opacity-100" : "opacity-0"}`}
            style={{ "--k": 1.75 } as CSSProperties}
          >
            <svg viewBox="0 0 200 200" className="animate-ring-spin absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <path id="seal-ring" d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
              </defs>
              <circle cx="100" cy="100" r="97" fill="none" stroke="var(--gold)" strokeOpacity="0.55" strokeWidth="0.6" strokeDasharray="1 4" />
              <text className="seal-ring-text" fontSize="10.5" letterSpacing="3.2">
                <textPath href="#seal-ring" startOffset="0" textLength="532" lengthAdjust="spacing">
                  {/* Latin on purpose: curved SVG text breaks Devanagari letter joining. */}
                  {`${COUPLE.groom.first.en} ✦ ${COUPLE.bride.first.en} ✦ Shubh Vivah ✦ 1 · 12 · 2026 ✦ `}
                </textPath>
              </text>
            </svg>
          </div>
          <div className={`seal-anchor ${sealed ? "" : "hidden"}`} style={{ "--k": 1 } as CSSProperties}>
            <span className="animate-ripple absolute inset-0 rounded-full border border-gold-soft" />
            <span className="animate-ripple absolute inset-0 rounded-full border border-gold-soft [animation-delay:1.3s]" />
          </div>

          {/* The wax seal itself, lifted out of the poster so it can be pressed and lifted */}
          <div className="seal-anchor" style={{ "--k": 1 } as CSSProperties}>
            <div
              className={`seal-wax absolute inset-0 rounded-full ${
                phase === "sealed" ? (pressed ? "is-pressed" : "") : "is-lifting"
              }`}
              style={sealStyle}
            />
          </div>
        </div>

        {/* Soft vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-vignette)]" />

        {/* Gold dust */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
            phase === "leaving" ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        >
          {DUST.map((d, i) => (
            <span
              key={i}
              className="animate-dust absolute rounded-full bg-gold-soft shadow-[0_0_8px_2px_var(--gold-soft)]"
              style={{ left: d.left, top: d.top, width: d.size, height: d.size, animationDelay: d.delay, animationDuration: d.dur }}
            />
          ))}
        </div>

        {/* Ornamental frame */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${sealed ? "opacity-100" : "opacity-0"}`}
          aria-hidden="true"
        >
          <div className="animate-frame-in absolute inset-3 rounded-[1.4rem] border border-gold/60" />
          <div className="animate-frame-in absolute inset-[18px] rounded-[1.1rem] border border-gold/30 [animation-delay:150ms]" />
          {(["left-2 top-2", "right-2 top-2 rotate-90", "bottom-2 right-2 rotate-180", "bottom-2 left-2 -rotate-90"] as const).map(
            (pos) => (
              <svg key={pos} viewBox="0 0 40 40" className={`animate-frame-in absolute h-10 w-10 text-gold ${pos}`} fill="none" stroke="currentColor">
                <path d="M4 22 C4 11 11 4 22 4" strokeWidth="1" />
                <path d="M9 22 C9 14 14 9 22 9" strokeWidth="0.6" />
                <circle cx="6" cy="6" r="1.8" fill="currentColor" stroke="none" />
                <path d="M22 4 l3 0 M4 22 l0 3" strokeWidth="1" />
              </svg>
            ),
          )}
        </div>

        {/* Copy */}
        <div
          className={`pointer-events-none absolute inset-0 transition-all duration-700 ease-out ${
            sealed ? "opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <div className="absolute inset-x-0 top-[max(4.25rem,7%)] flex justify-center px-8">
            <div className="opening-card relative w-full max-w-[330px] px-6 pb-5 pt-4 text-center">
              <p className="animate-rise eyebrow text-gold-deep [animation-delay:200ms]">॥ {t(T.shubhVivah)} ॥</p>
              <p className="animate-rise mt-1 font-script text-[2.6rem] leading-[1.15] [animation-delay:450ms]">
                <span className="gold-ink animate-shimmer">
                  {t(COUPLE.groom.first)} <span className="text-[0.7em]">&amp;</span> {t(COUPLE.bride.first)}
                </span>
              </p>
              <div className="animate-rise [animation-delay:650ms]">
                <Divider className="!mt-0 !h-5 !w-36" />
              </div>
              <p className="animate-rise mt-1 text-xl font-medium text-gold-deep [animation-delay:800ms]">{t(T.invitedTitle)}</p>
              <p className="animate-rise text-sm italic text-foreground/75 [animation-delay:950ms]">{t(T.invitedSub)}</p>
            </div>
          </div>

          <div className="animate-rise absolute inset-x-0 bottom-[7%] flex justify-center [animation-delay:1300ms]">
            <p className="opening-hint animate-bob flex items-center gap-2 rounded-full px-5 py-2 text-base text-foreground">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold-deep" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-4.6-2.2L4 15.5a1.5 1.5 0 0 1 2.3-1.9L9 16" />
              </svg>
              <span>{t(T.tapSeal)}</span>
            </p>
          </div>
        </div>

        {/* Burst when the seal breaks */}
        {phase !== "sealed" && (
          <div className="seal-anchor pointer-events-none" style={{ "--k": 1 } as CSSProperties} aria-hidden="true">
            <span className="animate-burst-flash absolute inset-0 rounded-full bg-[image:var(--gradient-burst)]" />
            <span className="animate-shockwave absolute inset-0 rounded-full border-2 border-gold-soft" />
            {SPARKS.map((s, i) => (
              <span
                key={i}
                className="animate-spark absolute left-1/2 top-1/2 bg-gold-soft shadow-[0_0_10px_2px_var(--gold-soft)]"
                style={
                  {
                    width: s.size,
                    height: s.size,
                    animationDelay: s.delay,
                    "--dx": s.dx,
                    "--dy": s.dy,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        )}

        {/* Ivory light bloom + petals that carry us into the invitation */}
        {(phase === "bloom" || phase === "leaving") && (
          <>
            <div className="seal-anchor pointer-events-none" style={{ "--k": 1 } as CSSProperties} aria-hidden="true">
              <span className="animate-bloom absolute inset-0 rounded-full bg-[image:var(--gradient-bloom)]" />
            </div>
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              {PETALS.map((p, i) => (
                <svg
                  key={i}
                  viewBox="0 0 20 20"
                  className="animate-petal-shower absolute -top-6 text-gold-soft"
                  style={
                    {
                      left: p.left,
                      width: p.size,
                      height: p.size,
                      animationDelay: p.delay,
                      animationDuration: p.dur,
                      "--drift": p.drift,
                    } as CSSProperties
                  }
                >
                  <path d="M10 1 C15 5 15 13 10 19 C5 13 5 5 10 1z" fill="currentColor" />
                </svg>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
