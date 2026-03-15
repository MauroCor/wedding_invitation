"use client";

import Image from "next/image";

// Misma fecha/hora que CountdownSection; lugar según LocationSection
const EVENT_TITLE = "Boda Nabila & Mauro";
const EVENT_START = new Date("2027-04-02T20:30:00");
const EVENT_END = new Date("2027-04-02T20:30:00");
EVENT_END.setHours(EVENT_END.getHours() + 5); // 5 horas de evento
const EVENT_LOCATION = "Salón La Cayetana, Río Negro 4000, B° Los Olmos, Córdoba, Argentina";
const EVENT_DESCRIPTION = "¡Los esperamos para celebrar juntos!";

function getGoogleCalendarUrl(): string {
  const format = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "").slice(0, 15) + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_TITLE,
    dates: `${format(EVENT_START)}/${format(EVENT_END)}`,
    details: EVENT_DESCRIPTION,
    location: EVENT_LOCATION,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function DateSection() {
  return (
    <section
      id="fecha"
      className="relative flex flex-col items-center justify-center text-center min-h-screen p-8 overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        aria-hidden
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl">
        <p
          className="text-white text-2xl md:text-3xl font-light tracking-wide mb-2 md:mb-3"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          Viernes, 2 de abril
        </p>
        <p
          className="text-5xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight leading-none"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          2027
        </p>
        <p
          className="mt-4 text-white/95 text-lg md:text-xl font-light tracking-wide"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          20:30 hs ceremonia y fiesta
        </p>
        <div
          className="mt-8 md:mt-10 w-12 h-px bg-white/50"
          aria-hidden
        />
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 md:mt-10 inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#5d7a71] text-white font-medium hover:bg-[#4a6560] transition-colors"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          <Image
            src="/google-calendar-icon.png"
            alt=""
            width={20}
            height={20}
            className="shrink-0"
            aria-hidden
          />
          Agendar fecha
        </a>
      </div>
    </section>
  );
}
