import { useEffect, useState } from "react";
import { CELEBRATION_START, T, timeLeft } from "@/lib/invite-content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useLang } from "./lang";

export function Countdown() {
  const { t } = useLang();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const left = now ? timeLeft(CELEBRATION_START, now) : null;
  const units = [
    { v: left?.days, l: T.days },
    { v: left?.hours, l: T.hours },
    { v: left?.minutes, l: T.minutes },
    { v: left?.seconds, l: T.seconds },
  ];

  return (
    <section className="band-rich px-5 py-20">
      <Reveal>
        <SectionHeading title={t(T.countdownTitle)} tone="dark" />
        {left?.done ? (
          <p className="text-center text-2xl text-gold-soft">{t(T.countdownDone)}</p>
        ) : (
          <>
            <div className="flex justify-center gap-2">
              {units.map((u, i) => (
                <div key={i} className="count-tile w-[5rem] pb-3 pt-6 text-center">
                  <p className="gold-text text-[2.8rem] font-light leading-none tabular-nums">
                    {u.v === undefined ? "--" : String(u.v).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-[0.62rem] uppercase tracking-[0.14em] text-band-foreground/75">{t(u.l)}</p>
                </div>
              ))}
            </div>
            <p className="mt-7 text-center text-base italic text-band-foreground/80">{t(T.countdownSub)}</p>
          </>
        )}
      </Reveal>
    </section>
  );
}
