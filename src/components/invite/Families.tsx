import { COUPLE, FROM, RSVP_FAMILY, T } from "@/lib/invite-content";
import { GemRule, OrnateFrame, Toran } from "./Ornaments";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useLang } from "./lang";

function Block({ label, first = false, children }: { label: string; first?: boolean; children: React.ReactNode }) {
  return (
    <div className="text-center">
      {!first && <GemRule className="my-7" />}
      <p className="eyebrow mb-3 text-gold-deep">{label}</p>
      {children}
    </div>
  );
}

export function Families() {
  const { t } = useLang();
  return (
    <section className="section-tint relative pb-20">
      <Toran className="mb-14" />
      <div className="px-5">
        <Reveal>
          <SectionHeading title={t(T.families)} />
        </Reveal>

        <Reveal>
          <OrnateFrame className="px-6 py-12">
            <Block label={t(T.blessingsBy)} first>
              <p className="text-lg text-foreground">{t(COUPLE.groom.parents)}</p>
              <p className="mt-1 text-lg text-foreground">{t(COUPLE.bride.parents)}</p>
            </Block>

            <Block label={t(T.awaitingYou)}>
              <p className="text-xl font-semibold">
                <span className="gold-ink">{t(FROM.name)}</span>
              </p>
              <p className="mx-auto mt-1 max-w-xs text-base text-muted-foreground">{t(FROM.address)}</p>
            </Block>

            <Block label={t(T.welcomingYou)}>
              <ul className="space-y-1">
                {RSVP_FAMILY.map((p) => (
                  <li key={p.en} className="text-lg text-foreground">
                    {t(p)}
                  </li>
                ))}
              </ul>
            </Block>

            <Block label={t(T.firms)}>
              <p className="text-lg text-gold-deep">{t(FROM.market)}</p>
              <p className="mt-1 text-lg text-gold-deep">{t(FROM.firms)}</p>
            </Block>

            <Block label={t(T.contact)}>
              <div className="flex flex-wrap justify-center gap-3">
                {FROM.phones.map((p) => (
                  <a key={p} href={`tel:+91${p}`} className="chip-gold inline-flex items-center gap-2 rounded-full px-4 py-2 text-base tabular-nums">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                    </svg>
                    {p}
                  </a>
                ))}
              </div>
            </Block>
          </OrnateFrame>
        </Reveal>
      </div>
    </section>
  );
}
