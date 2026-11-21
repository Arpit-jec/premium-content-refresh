import matapujan from "@/assets/fn-matapujan.webp";
import mandap from "@/assets/fn-mandap.webp";
import haldi from "@/assets/fn-haldi.webp";
import sangeet from "@/assets/fn-sangeet.webp";
import engagement from "@/assets/fn-engagement.webp";
import reception from "@/assets/fn-reception.webp";
import { EVENTS, T, calendarUrl, formatTime, type WeddingEvent } from "@/lib/invite-content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useLang } from "./lang";

const ART: Record<WeddingEvent["id"], string> = { matapujan, mandap, haldi, sangeet, engagement, reception };

export function Events() {
  const { t, lang } = useLang();
  return (
    <section className="section-tint px-5 py-20">
      <Reveal>
        <SectionHeading title={t(T.celebrations)} />
      </Reveal>
      <ol className="relative">
        <span className="timeline-line absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2" aria-hidden="true" />
        {EVENTS.map((e, i) => {
          const flip = i % 2 === 1;
          const time = formatTime(e.time, lang);
          return (
            <li key={e.id} className="relative mb-12 last:mb-0">
              <Reveal>
                <div className={`flex items-center gap-4 ${flip ? "flex-row-reverse" : ""}`}>
                  <div className="flex w-1/2 justify-center">
                    <div className="medallion">
                      <span className="medallion-ring animate-mandala" aria-hidden="true" />
                      <img src={ART[e.id]} alt="" loading="lazy" className="relative h-28 w-28 object-contain" />
                    </div>
                  </div>
                  <span className="marker-gem absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45" aria-hidden="true" />
                  <div className={`w-1/2 ${flip ? "pr-5 text-right" : "pl-5 text-left"}`}>
                    <p className="font-script text-3xl leading-none text-gold/80">{String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-1 text-sm italic text-muted-foreground">{t(e.dayLabel)}</p>
                    <p className="mt-1 text-[1.65rem] font-semibold leading-tight">
                      <span className="gold-ink">{t(e.name)}</span>
                    </p>
                    {time && <p className="text-lg italic text-gold-deep">{time}</p>}
                    <p className="text-sm text-muted-foreground">{t(e.place)}</p>
                    <a href={calendarUrl(e, lang)} target="_blank" rel="noreferrer" className="link-gold mt-2 inline-flex items-center gap-1 text-sm">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                        <rect x="3.5" y="5" width="17" height="15" rx="2" />
                        <path d="M3.5 10h17M8 3v4M16 3v4" />
                      </svg>
                      {t(T.addToCalendar)}
                    </a>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
