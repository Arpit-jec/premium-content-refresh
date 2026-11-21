import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Bi, Lang } from "@/lib/invite-content";

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: (b: Bi) => string };

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Shareable links can open in Hindi with ?lang=hi
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "hi" || q === "en") setLangState(q);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", l);
    window.history.replaceState(null, "", url.toString());
  };

  return <Ctx.Provider value={{ lang, setLang, t: (b) => b[lang] }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang must be used inside LangProvider");
  return c;
}
