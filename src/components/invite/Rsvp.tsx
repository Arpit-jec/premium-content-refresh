import { useState } from "react";
import { EVENTS, RSVP_WHATSAPP, T, rsvpMessage, type WeddingEvent } from "@/lib/invite-content";
import { OrnateFrame } from "./Ornaments";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useLang } from "./lang";

export function Rsvp() {
  const { t, lang } = useLang();
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [picked, setPicked] = useState<WeddingEvent["id"][]>(EVENTS.map((e) => e.id));
  const [error, setError] = useState(false);

  const toggle = (id: WeddingEvent["id"]) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError(true);
    const text = rsvpMessage(lang, name.trim(), guests, picked);
    window.open(`https://wa.me/${RSVP_WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section className="px-5 py-20">
      <Reveal>
        <SectionHeading title={t(T.rsvpTitle)} />
        <p className="mx-auto -mt-2 mb-8 max-w-xs text-center text-base text-muted-foreground">{t(T.rsvpSub)}</p>

        <OrnateFrame className="px-6 py-10">
        <form onSubmit={send} className="space-y-6">
          <label className="block">
            <span className="eyebrow text-gold-deep">{t(T.yourName)}</span>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(false);
              }}
              placeholder={t(T.namePlaceholder)}
              className="field mt-1 w-full rounded-xl px-4 py-3 text-lg"
              aria-invalid={error}
            />
            {error && <span className="mt-1 block text-sm text-destructive">{t(T.nameRequired)}</span>}
          </label>

          <div className="flex items-center justify-between border-y border-gold/30 py-4">
            <span className="text-lg text-foreground">{t(T.guests)}</span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="−"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="chip-gold h-10 w-10 rounded-full text-xl"
              >
                −
              </button>
              <span className="w-6 text-center text-xl tabular-nums">{guests}</span>
              <button
                type="button"
                aria-label="+"
                onClick={() => setGuests((g) => Math.min(20, g + 1))}
                className="chip-gold h-10 w-10 rounded-full text-xl"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-3 text-gold-deep">{t(T.attending)}</p>
            <div className="flex flex-wrap gap-2">
              {EVENTS.map((e) => {
                const on = picked.includes(e.id);
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => toggle(e.id)}
                    aria-pressed={on}
                    className={`rounded-full border px-4 py-1.5 text-base transition-colors ${
                      on ? "btn-bronze border-transparent" : "chip-gold"
                    }`}
                  >
                    {t(e.name)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 text-center">
            <button type="submit" className="btn-bronze btn-shine inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-lg">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
              </svg>
              {t(T.sendWhatsapp)}
            </button>
            <p className="mx-auto mt-3 max-w-xs text-sm text-muted-foreground">{t(T.rsvpNote)}</p>
          </div>
        </form>
        </OrnateFrame>
      </Reveal>
    </section>
  );
}
