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
        <div className="max-w-4xl mx-auto">
          {/* Card ¿Cuándo? */}
          <div className="bg-white/90 border border-neutral-200 rounded-3xl shadow-md px-6 py-8 md:px-10 md:py-10">
            <div className="text-center">
              <h2 className="section-title !mb-3 md:!mb-4">¿Cuándo?</h2>
              <p
                className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mb-1 md:mb-2 text-[#789966] italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Viernes{" "}
                <span className="text-4xl md:text-5xl lg:text-6xl font-normal">
                  02
                </span>{" "}
                abril 2027
              </p>
              <p
                className="mt-4 text-lg md:text-xl font-light tracking-wide text-[#789966]"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                20:30 hs ceremonia y fiesta
              </p>

              <div
                className="mt-6 w-12 h-px mx-auto bg-[#789966]/30"
                aria-hidden
              />

              <div className="mt-6 flex justify-center">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#789966] text-white font-medium hover:bg-[#3a5b30] transition-colors"
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
            </div>
          </div>

          {/* Separación tipo sección entre cards */}
          <div className="h-32" aria-hidden />

          {/* Card ¿Dónde? */}
          <div className="bg-white/90 border border-neutral-200 rounded-3xl shadow-md px-6 py-8 md:px-10 md:py-10">
            <div className="text-center">
              <h2 className="section-title !mb-3 md:!mb-4">¿Dónde?</h2>
              <div className="space-y-2">
                <p className="text-[#2C3E50]">
                  <strong>SALÓN LA CAYETANA</strong>
                </p>
                <p className="text-[#2C3E50]">
                  Río Negro N° 4000, B° Los Olmos.
                </p>
              </div>
              <div className="mt-6 flex justify-center">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white border border-neutral-200 shadow-sm hover:shadow-md hover:border-[#789966]/30 transition-all text-[#2C3E50] font-medium"
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
    </section>
  );
}
