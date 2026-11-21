import { Divider } from "./Divider";
import { Lotus, Mandala } from "./Ornaments";

export function SectionHeading({
  title,
  eyebrow,
  tone = "light",
}: {
  title: string;
  eyebrow?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="relative mb-10 text-center">
      <Mandala
        className={`animate-mandala pointer-events-none absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 ${
          dark ? "text-gold-soft/10" : "text-gold/15"
        }`}
      />
      <div className="relative">
        <Lotus className={`mx-auto mb-3 h-6 w-10 ${dark ? "text-gold-soft" : "text-gold"}`} />
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="section-title">
          <span className={dark ? "gold-text" : "gold-ink"}>{title}</span>
        </h2>
        <Divider className={`mt-3 ${dark ? "text-gold-soft" : ""}`} />
      </div>
    </div>
  );
}
