// All wedding facts and both languages live here so copy and dates stay in one place.

export type Lang = "en" | "hi";
export type Bi = Record<Lang, string>;

export type WeddingEvent = {
  id: "matapujan" | "mandap" | "haldi" | "sangeet" | "engagement" | "reception";
  name: Bi;
  date: string; // YYYY-MM-DD (IST)
  time: string | null; // HH:mm 24h IST, null when no time is given
  place: Bi;
  dayLabel: Bi;
};

export const VENUE = {
  name: { en: "The Orika Club & Resort", hi: "द ओरिका क्लब एंड रिसॉर्ट" },
  address: { en: "Tilwara Road, Jabalpur, Madhya Pradesh", hi: "तिलवारा रोड, जबलपुर, मध्य प्रदेश" },
  city: { en: "Jabalpur", hi: "जबलपुर" },
  mapsQuery: "The Orika Club & Resort, Tilwara Road, Jabalpur",
} as const;

const atVenue: Bi = { en: "The Orika Club & Resort", hi: "द ओरिका क्लब एंड रिसॉर्ट" };

export const EVENTS: WeddingEvent[] = [
  {
    id: "matapujan",
    name: { en: "Matapujan", hi: "मातापूजन" },
    date: "2026-12-01",
    time: null,
    place: { en: "At our residence", hi: "निवास स्थान पर" },
    dayLabel: { en: "Tuesday, 1 December", hi: "मंगलवार, 1 दिसंबर" },
  },
  {
    id: "mandap",
    name: { en: "Mandap", hi: "मंडप" },
    date: "2026-12-02",
    time: null,
    place: { en: "At our residence", hi: "निवास स्थान पर" },
    dayLabel: { en: "Wednesday, 2 December", hi: "बुधवार, 2 दिसंबर" },
  },
  {
    id: "haldi",
    name: { en: "Haldi", hi: "हल्दी" },
    date: "2026-12-03",
    time: "12:00",
    place: atVenue,
    dayLabel: { en: "Thursday, 3 December", hi: "गुरुवार, 3 दिसंबर" },
  },
  {
    id: "sangeet",
    name: { en: "Sangeet", hi: "संगीत" },
    date: "2026-12-03",
    time: "19:00",
    place: atVenue,
    dayLabel: { en: "Thursday, 3 December", hi: "गुरुवार, 3 दिसंबर" },
  },
  {
    id: "engagement",
    name: { en: "Engagement", hi: "सगाई" },
    date: "2026-12-04",
    time: "13:00",
    place: atVenue,
    dayLabel: { en: "Friday, 4 December", hi: "शुक्रवार, 4 दिसंबर" },
  },
  {
    id: "reception",
    name: { en: "Reception", hi: "स्वागत समारोह" },
    date: "2026-12-04",
    time: "19:00",
    place: atVenue,
    dayLabel: { en: "Friday, 4 December", hi: "शुक्रवार, 4 दिसंबर" },
  },
];

/** Moment an event starts, as a real instant (venue is in IST, UTC+5:30). */
export function eventStart(e: WeddingEvent): Date {
  return new Date(`${e.date}T${e.time ?? "00:00"}:00+05:30`);
}

/** The celebrations begin at the first event. */
export const CELEBRATION_START = eventStart(EVENTS[0]!);

export function formatTime(time: string | null, lang: Lang): string | null {
  if (!time) return null;
  const [hStr, mStr] = time.split(":");
  const h = Number(hStr);
  const m = mStr ?? "00";
  const h12 = ((h + 11) % 12) + 1;
  if (lang === "en") return `${h12}:${m} ${h < 12 ? "AM" : "PM"}`;
  const part = h < 12 ? "सुबह" : h < 16 ? "दोपहर" : "शाम";
  return `${part} ${h12}:${m} बजे`;
}

export function timeLeft(target: Date, now: Date) {
  const ms = Math.max(0, target.getTime() - now.getTime());
  const s = Math.floor(ms / 1000);
  return {
    done: ms === 0,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function gcalStamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export function calendarUrl(e: WeddingEvent, lang: Lang): string {
  const title = `${e.name[lang]} · ${COUPLE.groom.first[lang]} & ${COUPLE.bride.first[lang]}`;
  let dates: string;
  if (e.time) {
    const start = eventStart(e);
    const end = new Date(start.getTime() + 3 * 3600 * 1000);
    dates = `${gcalStamp(start)}/${gcalStamp(end)}`;
  } else {
    const day = e.date.replace(/-/g, "");
    const next = new Date(`${e.date}T00:00:00Z`);
    next.setUTCDate(next.getUTCDate() + 1);
    dates = `${day}/${next.toISOString().slice(0, 10).replace(/-/g, "")}`;
  }
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates,
    location: e.id === "matapujan" || e.id === "mandap" ? FROM.address.en : `${VENUE.name.en}, ${VENUE.address.en}`,
    ctz: "Asia/Kolkata",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export const COUPLE = {
  groom: {
    first: { en: "Anmol", hi: "अनमोल" },
    full: { en: "Anmol Patariya", hi: "अनमोल पटारिया" },
    parents: {
      en: "Smt. Nirmala Patariya & Late Shri Sunil Patariya",
      hi: "श्रीमती निर्मला पटारिया एवं स्व. श्री सुनील पटारिया",
    },
  },
  bride: {
    first: { en: "Eesha", hi: "ईशा" },
    full: { en: "Eesha Pakhariya", hi: "ईशा पखारिया" },
    parents: {
      en: "Smt. Seema Pakhariya & Late Shri Vishnu Pakhariya",
      hi: "श्रीमती सीमा पखारिया एवं स्व. श्री विष्णु पखारिया",
    },
  },
  monogram: "AE",
} as const;

export const FROM = {
  name: { en: "Nirmal Patariya", hi: "निर्मल पटारिया" },
  address: {
    en: "Rampur, Purana Sai Mandir, Behind Starbucks, Jabalpur (M.P.)",
    hi: "रामपुर, पुराना साईं मंदिर, स्टारबक्स के पीछे, जबलपुर (म.प्र.)",
  },
  phones: ["7770904258", "8319908973"],
  firms: { en: "Infinity Dog Ventures Pvt. Ltd.", hi: "इन्फिनिटी डॉग वेंचर्स प्रा. लि." },
} as const;

export const RSVP_FAMILY: Bi[] = [
  { en: "Nirmala Patariya", hi: "निर्मला पटारिया" },
  { en: "Vikrant – Rakhi Patariya (Bhai-Bhabhi)", hi: "विक्रांत – राखी पटारिया (भाई-भाभी)" },
  { en: "Rajveer Patariya", hi: "राजवीर पटारिया" },
  { en: "Our loving stars: Misthi, Vaishnavi, Abhijeet", hi: "हमारे प्यारे सितारे: मिष्ठी, वैष्णवी, अभिजीत" },
];

export type DressCode = {
  eventId: WeddingEvent["id"];
  look: Bi;
  /** Swatch colours shown beside the look. */
  swatches: { name: string; hex: string }[];
};

/** Suggested attire per function, shown in the Dress Code section. */
export const DRESS_CODES: DressCode[] = [
  {
    eventId: "haldi",
    look: { en: "Kurta in shades of royal blue and powder blue", hi: "कुर्ता — रॉयल ब्लू और पाउडर ब्लू के रंगों में" },
    swatches: [
      { name: "Royal blue", hex: "#2B4FB3" },
      { name: "Soft royal blue", hex: "#7090D1" },
      { name: "Powder blue", hex: "#B3D1EA" },
    ],
  },
  {
    eventId: "sangeet",
    look: { en: "Formal suit", hi: "फ़ॉर्मल सूट" },
    swatches: [
      { name: "Midnight navy", hex: "#1E2A45" },
      { name: "Charcoal", hex: "#3B3B3F" },
      { name: "Black", hex: "#141414" },
    ],
  },
];

export const SHLOK = {
  ganesh: "॥ श्री गणेशाय नमः ॥",
  lines: ["मंगलम् भगवान विष्णु, मंगलम् गरुड़ ध्वजः।", "मंगलम् पुण्डरीकाक्षः, मंगलाय तनो हरिः॥"],
};

export const T = {
  invitedTitle: { en: "You are cordially invited", hi: "आप सादर आमंत्रित हैं" },
  invitedSub: { en: "to an auspicious wedding in Jabalpur", hi: "जबलपुर में एक शुभ विवाह में" },
  tapSeal: { en: "Touch the seal to open", hi: "खोलने के लिए मुहर छुएँ" },
  skip: { en: "Skip", hi: "आगे बढ़ें" },
  shubhVivah: { en: "Shubh Vivah", hi: "शुभ विवाह" },
  weds: { en: "weds", hi: "संग" },
  scrollDown: { en: "Scroll down", hi: "नीचे सरकाएँ" },
  auspiciousDate: { en: "The Auspicious Date", hi: "शुभ तिथि" },
  scratchHint: { en: "Scratch to reveal the date", hi: "तिथि देखने के लिए खुरचें" },
  day: { en: "Day", hi: "दिन" },
  month: { en: "Month", hi: "माह" },
  year: { en: "Year", hi: "वर्ष" },
  monthName: { en: "Dec", hi: "दिसं." },
  dateCaption: { en: "Tuesday 1 – Friday 4 December 2026", hi: "मंगलवार 1 – शुक्रवार 4 दिसंबर 2026" },
  dateSub: { en: "Four days of celebration", hi: "चार दिन का उत्सव" },
  blessings: { en: "With the blessings of our elders", hi: "पूज्य बुज़ुर्गों के आशीर्वाद से" },
  sonOf: { en: "son of", hi: "सुपुत्र" },
  daughterOf: { en: "daughter of", hi: "सुपुत्री" },
  inviteLine: {
    en: "request the pleasure of your company with family at their wedding celebrations.",
    hi: "के शुभ विवाह में आप सपरिवार सादर आमंत्रित हैं।",
  },
  quote: {
    en: "Love brought them together, family blesses their journey, and today we celebrate their forever.",
    hi: "प्रेम ने उन्हें मिलाया, परिवार उनके सफ़र को आशीर्वाद देता है, और आज हम उनके हमेशा के साथ का उत्सव मनाते हैं।",
  },
  celebrations: { en: "Celebrations", hi: "उत्सव" },
  addToCalendar: { en: "Add to calendar", hi: "कैलेंडर में जोड़ें" },
  countdownTitle: { en: "Celebrations begin in", hi: "उत्सव शुरू होने में" },
  countdownSub: { en: "until Matapujan on Tuesday, 1 December", hi: "मंगलवार, 1 दिसंबर को मातापूजन तक" },
  countdownDone: { en: "The celebrations have begun!", hi: "उत्सव आरंभ हो चुका है!" },
  days: { en: "Days", hi: "दिन" },
  hours: { en: "Hours", hi: "घंटे" },
  minutes: { en: "Minutes", hi: "मिनट" },
  seconds: { en: "Seconds", hi: "सेकंड" },
  venue: { en: "Venue", hi: "स्थान" },
  openMaps: { en: "Open in Google Maps", hi: "गूगल मैप में देखें" },
  families: { en: "With Love", hi: "हमारे परिवार" },
  blessingsBy: { en: "Blessings", hi: "आशीर्वाद" },
  awaitingYou: { en: "Awaiting your presence", hi: "दर्शनाभिलाषी" },
  welcomingYou: { en: "Eagerly welcoming you", hi: "स्वागतोत्सुक" },
  firms: { en: "Firm", hi: "प्रतिष्ठान" },
  contact: { en: "Contact", hi: "संपर्क" },
  dressCode: { en: "Dress Code", hi: "परिधान" },
  dressCodeSub: {
    en: "A colour for each function, if you'd like a hint.",
    hi: "हर समारोह के लिए रंग का एक सुझाव, यदि आप चाहें।",
  },
  withLove: { en: "With love, the Patariya & Pakhariya families", hi: "सप्रेम, पटारिया एवं पखारिया परिवार" },
  music: { en: "Music", hi: "संगीत" },
} satisfies Record<string, Bi>;
