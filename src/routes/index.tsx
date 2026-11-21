import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import song from "@/assets/kudmayi_film_version.mp3.asset.json";
import { Countdown } from "@/components/invite/Countdown";
import { LangToggle, MusicButton } from "@/components/invite/Controls";
import { Events } from "@/components/invite/Events";
import { Families } from "@/components/invite/Families";
import { Footer } from "@/components/invite/Footer";
import { Hero } from "@/components/invite/Hero";
import { InvitationCard } from "@/components/invite/InvitationCard";
import { LangProvider, useLang } from "@/components/invite/lang";
import { Opening } from "@/components/invite/Opening";
import { Rsvp } from "@/components/invite/Rsvp";
import { ScratchDate } from "@/components/invite/ScratchDate";
import { Venue } from "@/components/invite/Venue";
import { TapConfetti } from "@/components/invite/TapConfetti";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anmol & Eesha · Wedding Invitation · 1–4 December 2026" },
      {
        name: "description",
        content:
          "You are cordially invited to the wedding of Anmol Patariya and Eesha Pakhariya at The Orika Club & Resort, Jabalpur, 1–4 December 2026.",
      },
      { property: "og:title", content: "Anmol ❤️ Eesha · Wedding Invitation" },
      {
        property: "og:description",
        content: "Join us for four days of celebration in Jabalpur, 1–4 December 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <Invitation />
    </LangProvider>
  );
}

function Invitation() {
  const { lang } = useLang();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [playing, setPlaying] = useState(false);

  const startMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.7;
    a.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) startMusic();
    else {
      a.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <audio ref={audioRef} src={song.url} loop preload="auto" />
      <LangToggle />
      <TapConfetti />
      {!opened && (
        <Opening
          onOpenStart={startMusic}
          onReveal={() => {
            window.scrollTo(0, 0);
            setRevealed(true);
          }}
          onDone={() => setOpened(true)}
        />
      )}
      <main className="paper relative mx-auto min-h-screen max-w-[480px] overflow-hidden shadow-2xl">
        <Hero revealed={revealed} />
        <ScratchDate />
        <InvitationCard />
        <Events />
        <Countdown />
        <Venue />
        <Families />
        <Rsvp />
        <Footer />
      </main>
      {opened && <MusicButton playing={playing} onToggle={toggleMusic} />}
    </>
  );
}
