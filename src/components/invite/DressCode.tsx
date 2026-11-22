import dressArt from "@/assets/dress_code_family.webp";
import { DRESS_CODES, EVENTS, T } from "@/lib/invite-content";
import { OrnateFrame } from "./Ornaments";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useLang } from "./lang";

export function DressCode() {
  const { t } = useLang();
  return (
    <section className="px-5 py-20">
      <Reveal>
        <SectionHeading title={t(T.dressCode)} />
        <p className="mx-auto -mt-2 mb-8 max-w-xs text-balance text-center text-lg italic leading-snug text-foreground/80">
          {t(T.dressCodeSub)}
        </p>
      </Reveal>

      <Reveal>
        <figure className="photo-mount p-2.5">
          <img
            src={dressArt}
            alt="Family members in pastel chikankari kurtas, sarees and sherwanis"
            loading="lazy"
            width={1080}
            height={720}
            className="w-full rounded-[0.6rem] object-contain"
          />
        </figure>
      </Reveal>

      <Reveal>
        <OrnateFrame className="mt-8 px-6 py-6">
          <ul>
            {DRESS_CODES.map((d) => {
              const ev = EVENTS.find((e) => e.id === d.eventId)!;
              return (
                <li key={d.eventId} className="dress-row flex items-center justify-between gap-4 py-5">
                  <div>
                    <p className="text-2xl font-semibold leading-tight">
                      <span className="gold-ink">{ev.name.en}</span>{" "}
                      <span className="font-deva text-lg font-normal text-gold-deep">{ev.name.hi}</span>
                    </p>
                    <p className="mt-1 text-base text-muted-foreground">{t(d.look)}</p>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    {d.swatches.map((s) => (
                      <span
                        key={s.hex}
                        title={s.name}
                        aria-label={s.name}
                        className="dress-swatch h-8 w-8 rounded-full"
                        style={{ backgroundColor: s.hex }}
                      />
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </OrnateFrame>
      </Reveal>
    </section>
  );
}
