import ganesha from "@/assets/ganesha.webp";
import { COUPLE, SHLOK, T, VENUE } from "@/lib/invite-content";
import { Divider } from "./Divider";
import { Reveal } from "./Reveal";
import { useLang } from "./lang";

export function InvitationCard() {
  const { t } = useLang();
  return (
    <section className="px-5 pb-20">
      <Reveal>
        <div className="arch-card p-3">
          <div className="arch-frame px-6 pb-10 pt-14 text-center">
            <img src={ganesha} alt="Shri Ganesh" className="mx-auto h-28 w-28 object-contain" loading="lazy" />
            <p className="mt-3 font-deva text-lg text-gold-deep">{SHLOK.ganesh}</p>
            <div className="mt-2 font-deva text-[0.95rem] leading-relaxed text-foreground/80">
              {SHLOK.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <Divider className="mt-4" />

            <p className="mt-4 text-base italic text-muted-foreground">{t(T.blessings)}</p>

            <h3 className="mt-5 font-script text-5xl leading-tight text-gold-deep">{t(COUPLE.groom.full)}</h3>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{t(T.sonOf)}</p>
            <p className="mt-1 text-lg text-foreground">{t(COUPLE.groom.parents)}</p>

            <p className="my-5 text-2xl italic text-gold">{t(T.weds)}</p>

            <h3 className="font-script text-5xl leading-tight text-gold-deep">{t(COUPLE.bride.full)}</h3>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{t(T.daughterOf)}</p>
            <p className="mt-1 text-lg text-foreground">{t(COUPLE.bride.parents)}</p>

            <p className="mx-auto mt-6 max-w-xs text-base text-foreground/80">{t(T.inviteLine)}</p>

            <blockquote className="mx-auto mt-6 max-w-xs border-y border-gold/40 py-4 text-lg italic leading-relaxed text-gold-deep">
              “{t(T.quote)}”
            </blockquote>

            <p className="mt-6 text-xl text-foreground">{t(T.dateCaption)}</p>
            <p className="mt-1 text-base text-muted-foreground">
              {t(VENUE.name)}, {t(VENUE.city)}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
