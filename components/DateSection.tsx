"use client";

import Image from "next/image";
import Script from "next/script";
import { createElement, useState } from "react";

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

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=La+Cayetana+Río+Negro+4000+Córdoba+Argentina";

const topCard =
  "w-full border-0 border-b border-white/25 bg-[#789966]/10 px-5 py-3 shadow-lg shadow-black/10 backdrop-blur-md md:px-8 md:py-6";

const bottomCard =
  "w-full border-0 border-t border-white/35 bg-white/10 px-5 py-3 shadow-lg shadow-black/10 backdrop-blur-md md:px-8 md:py-6";

const LORDICON_CALENDAR_SRC =
  "https://cdn.lordicon.com/mzfjzfjs.json";

export default function DateSection() {
  const [lordIconReady, setLordIconReady] = useState(false);

  return (
    <section
      id="fecha"
      className="relative grid min-h-[min(88vh,920px)] min-h-[min(88svh,920px)] grid-rows-[auto_1fr_auto] overflow-hidden py-0!"
    >
      <Script
        src="https://cdn.lordicon.com/lordicon.js"
        strategy="lazyOnload"
        onLoad={() => setLordIconReady(true)}
      />
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <Image
          src="/h-gallery/IMG_DATE.jpg"
          alt=""
          fill
          className="object-cover object-[center_35%] md:object-center"
          sizes="100vw"
          quality={90}
          priority
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-black/35 via-black/20 to-black/40"
          aria-hidden
        />
      </div>

      {/* Fila superior: fecha pegada al borde superior de la sección */}
      <div className={`relative z-10 ${topCard}`}>
        <div className="text-center">
          {lordIconReady ? (
            <div
              className="flex justify-center drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]"
              aria-hidden
            >
              {createElement("lord-icon", {
                className:
                  "h-[68px] w-[68px] md:h-[76px] md:w-[76px]",
                src: LORDICON_CALENDAR_SRC,
                trigger: "loop",
                stroke: "light",
                delay: "300",
                colors: "primary:#ffffff,secondary:#fff4dc",
              })}
            </div>
          ) : null}
          <time
            dateTime="2027-04-02"
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-4xl font-light tabular-nums tracking-wide text-white drop-shadow-sm sm:gap-x-4 md:text-5xl lg:text-6xl lg:gap-x-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span>02</span>
            <span
              className="text-white/45 font-extralight select-none"
              aria-hidden
            >
              |
            </span>
            <span className="uppercase tracking-[0.12em] sm:tracking-[0.18em]">
              abril
            </span>
            <span
              className="text-white/45 font-extralight select-none"
              aria-hidden
            >
              |
            </span>
            <span>27</span>
          </time>
        </div>
      </div>

      {/* Centro: el espacio 1fr deja ver la foto de fondo */}
      <div className="relative z-0 min-h-0" aria-hidden />

      {/* Fila inferior: lugar pegado al borde inferior de la sección */}
      <div className={`relative z-10 ${bottomCard}`}>
        <div className="text-center text-[#2C3E50]">
          <h2
            className="mx-auto mb-4 max-w-md text-2xl font-light italic tracking-wide text-white md:mb-5 md:text-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ceremonia y Fiesta
          </h2>
          <div className="text-white text-sm md:text-base">
            <p className="text-base">20:30 hs</p>
            <p>SALÓN LA CAYETANA</p>
            <p className="text-xs md:text-sm">Río Negro N° 4000, B° Los Olmos</p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:mt-5 md:gap-4">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/75 px-4 py-2.5 text-sm font-medium text-[#2C3E50] shadow-sm backdrop-blur-sm transition-all hover:border-[#789966]/50 hover:bg-white/90 hover:shadow-md md:px-5 md:py-3 md:text-base"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <Image
                src="/icons/calendar.png"
                alt=""
                width={20}
                height={20}
                className="shrink-0"
                aria-hidden
              />
              Agendar fecha
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200/80 bg-white/70 px-4 py-2.5 text-sm font-medium text-[#2C3E50] shadow-sm backdrop-blur-sm transition-all hover:border-[#789966]/60 hover:bg-white/85 hover:shadow-md md:px-5 md:py-3 md:text-base"
            >
              <Image
                src="/icons/maps-pin.png"
                alt=""
                width={20}
                height={20}
                className="shrink-0"
                aria-hidden
              />
              Ver ubicación
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
