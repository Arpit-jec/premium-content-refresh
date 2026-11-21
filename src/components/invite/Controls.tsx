import { T } from "@/lib/invite-content";
import { useLang } from "./lang";

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex justify-center">
      <div className="flex w-full max-w-[480px] justify-end px-4">
        <div
          className="pointer-events-auto flex rounded-full border border-gold/50 bg-card/85 p-0.5 text-sm shadow-[var(--shadow-soft)] backdrop-blur"
          role="group"
          aria-label="Language"
        >
          {(["en", "hi"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`rounded-full px-3 py-1 transition-colors ${
                lang === l ? "btn-bronze" : "text-gold-deep hover:text-foreground"
              }`}
            >
              {l === "en" ? "EN" : "हिं"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MusicButton({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  const { t } = useLang();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center">
      <div className="flex w-full max-w-[480px] justify-end px-5">
        <button
          type="button"
          onClick={onToggle}
          aria-label={`${t(T.music)}: ${playing ? "pause" : "play"}`}
          className="btn-bronze pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full ring-2 ring-gold-soft/60"
        >
          {playing ? (
            <span className="flex h-5 items-end gap-[3px]">
              {[0, 0.2, 0.4, 0.1].map((d, i) => (
                <span
                  key={i}
                  className="animate-eq block h-full w-[3px] rounded-full bg-primary-foreground"
                  style={{ animationDelay: `${d}s` }}
                />
              ))}
            </span>
          ) : (
            <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-current" aria-hidden="true">
              <path d="M7 4.5v15l12-7.5z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
