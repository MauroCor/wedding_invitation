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

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=La+Cayetana+Río+Negro+4000+Córdoba+Argentina";

export default function DateSection() {
  return (
    <section id="fecha" className="py-14 md:py-18">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title !mb-2 md:!mb-4">¿Cuándo?</h2>
          <p
            className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mb-1 md:mb-2 text-[#5d7a71] italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Viernes{" "}
            <span className="text-4xl md:text-5xl lg:text-6xl font-normal">
              02
            </span>{" "}
            abril 2027
          </p>
          <p
            className="mt-4 text-lg md:text-xl font-light tracking-wide text-[#5d7a71]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            20:30 hs ceremonia y fiesta
          </p>

          <div
            className="mt-4 md:mt-6 w-12 h-px mx-auto bg-[#5d7a71]/40"
            aria-hidden
          />

          <div className="mt-4 md:mt-6 flex flex-col items-center gap-8">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#5d7a71] text-white font-medium hover:bg-[#4a6560] transition-colors"
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

            {/* Bloque de lugar (agrupado con la fecha) */}
            <div className="mt-8 md:mt-10 text-center">
              <h3 className="section-title !mb-4 md:!mb-8">¿Dónde?</h3>
              <div className="location-content">
                <div className="location-info text-center">
                  <p className="text-[#2C3E50]">
                    <strong>SALÓN LA CAYETANA</strong>
                  </p>
                  <p className="text-[#2C3E50]">
                    Río Negro N° 4000, B° Los Olmos.
                  </p>
                </div>
                <div className="flex justify-center mt-4">
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white border border-neutral-200 shadow-sm hover:shadow-md hover:border-[#5d7a71]/30 transition-all text-[#2C3E50] font-medium"
                  >
                    <Image
                      src="/maps-pin.png"
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
          </div>
        </div>
      </div>
    </section>
  );
}
