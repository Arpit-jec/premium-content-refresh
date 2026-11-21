import venuePhoto from "@/assets/venue-orika-photo.webp.asset.json";
import { T, VENUE } from "@/lib/invite-content";
import { OrnateFrame } from "./Ornaments";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useLang } from "./lang";

export function Venue() {
  const { t } = useLang();
  const q = encodeURIComponent(VENUE.mapsQuery);
  return (
    <section className="py-20">
      <Reveal className="px-5">
        <SectionHeading title={t(T.venue)} />
      </Reveal>
      <Reveal className="px-5">
        <figure className="photo-mount p-2.5">
          <div className="relative overflow-hidden rounded-[0.6rem]">
            <img
              src={venuePhoto.url}
              alt={`${VENUE.name.en} entrance`}
              loading="lazy"
              width={1400}
              height={781}
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="photo-sheen absolute inset-0" aria-hidden="true" />
          </div>
        </figure>
      </Reveal>
      <Reveal className="relative z-10 -mt-6 px-9">
        <OrnateFrame className="px-6 py-7 text-center">
          <p className="eyebrow text-gold-deep">{t(VENUE.city)}</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{t(VENUE.name)}</p>
          <p className="mt-1 text-base text-muted-foreground">{t(VENUE.address)}</p>
        </OrnateFrame>
      </Reveal>
      <Reveal className="mt-8 px-5">
        <div className="photo-mount p-2.5">
          <div className="overflow-hidden rounded-[0.6rem]">
            <iframe
              title={VENUE.name.en}
              src={`https://maps.google.com/maps?q=${q}&z=14&output=embed`}
              className="h-60 w-full grayscale-[35%] sepia-[20%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="mt-7 flex justify-center">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${q}`}
            target="_blank"
            rel="noreferrer"
            className="btn-bronze inline-flex items-center gap-2 rounded-full px-7 py-3 text-base"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            {t(T.openMaps)}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
