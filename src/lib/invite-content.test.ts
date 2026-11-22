import { describe, expect, it } from "vitest";
import { CELEBRATION_START, DRESS_CODES, EVENTS, FROM, RSVP_FAMILY, eventStart, formatTime, timeLeft } from "./invite-content";

const byId = (id: string) => EVENTS.find((e) => e.id === id)!;

describe("wedding schedule", () => {
  it("Matapujan is on 1 Dec 2026", () => expect(byId("matapujan").date).toBe("2026-12-01"));
  it("Mandap is on 2 Dec 2026", () => expect(byId("mandap").date).toBe("2026-12-02"));
  it("Haldi starts 3 Dec 2026 at 12:00 PM IST", () =>
    expect(eventStart(byId("haldi")).toISOString()).toBe("2026-12-03T06:30:00.000Z"));
  it("Sangeet starts 3 Dec 2026 at 7:00 PM IST", () =>
    expect(eventStart(byId("sangeet")).toISOString()).toBe("2026-12-03T13:30:00.000Z"));
  it("Engagement starts 4 Dec 2026 at 1:00 PM IST", () =>
    expect(eventStart(byId("engagement")).toISOString()).toBe("2026-12-04T07:30:00.000Z"));
  it("Reception starts 4 Dec 2026 at 7:00 PM IST", () =>
    expect(eventStart(byId("reception")).toISOString()).toBe("2026-12-04T13:30:00.000Z"));
  it("shows times in both languages", () => {
    expect(formatTime("19:00", "en")).toBe("7:00 PM");
    expect(formatTime("12:00", "hi")).toBe("दोपहर 12:00 बजे");
  });
  it("countdown runs to the start of 1 Dec IST", () => {
    const left = timeLeft(CELEBRATION_START, new Date("2026-11-29T18:30:00Z"));
    expect(left).toMatchObject({ days: 1, hours: 0, minutes: 0, seconds: 0, done: false });
  });
  it("Mandap is at our residence", () => expect(byId("mandap").place.en).toBe("At our residence"));
});

describe("dress code", () => {
  const look = (id: string) => DRESS_CODES.find((d) => d.eventId === id)?.look.en;
  it("Haldi is kurta in royal blue and powder blue", () =>
    expect(look("haldi")).toBe("Kurta in shades of royal blue and powder blue"));
  it("Sangeet is a formal suit", () => expect(look("sangeet")).toBe("Formal suit"));
});

describe("host details", () => {
  it("address says Behind Starbucks", () => expect(FROM.address.en).toContain("Behind Starbucks"));
  it("firm is Infinity Dog Ventures Pvt. Ltd.", () => expect(FROM.firms.en).toBe("Infinity Dog Ventures Pvt. Ltd."));
});

describe("welcoming family", () => {
  it("lists the loving stars line right after Rajveer", () => {
    const names = RSVP_FAMILY.map((p) => p.en);
    expect(names.slice(-2)).toEqual(["Rajveer Patariya", "Our loving stars: Misthi, Vaishnavi, Abhijeet"]);
  });
});
