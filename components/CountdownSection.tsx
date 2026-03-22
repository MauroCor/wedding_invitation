"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// 02 de abril 2027, 20:30 hs
const WEDDING_DATE = new Date("2027-04-02T20:30:00").getTime();

function formatNumber(value: number) {
  return value.toString().padStart(2, "0");
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = WEDDING_DATE - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const intervalId = window.setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="relative max-w-3xl mx-auto">
            <div
              className="relative overflow-hidden rounded-t-[100px] rounded-b-3xl px-6 py-10 md:px-10 md:py-14 flex flex-col items-center justify-center text-center shadow-xl"
              style={{
                backgroundColor: "#789966",
                backgroundImage:
                  "radial-gradient(circle at 0 0, rgba(255,255,255,0.12), transparent 55%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08), transparent 55%)",
              }}
            >
            <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full border border-white/10 opacity-40" />

            <h2
              className="text-3xl md:text-4xl lg:text-5xl mb-3 text-white"
              style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.15em" }}
            >
              ¡PREPÁRATE!
            </h2>

            <p
              className="text-sm md:text-base tracking-[0.35em] uppercase mb-8 text-white/70"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Nos vemos dentro de
            </p>

            <div className="flex flex-wrap items-end justify-center gap-4 md:gap-6 lg:gap-8 mb-2 text-white">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-4xl md:text-5xl lg:text-6xl"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {formatNumber(timeLeft.days)}
                </span>
                <span className="text-3xl md:text-4xl lg:text-5xl">:</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-4xl md:text-5xl lg:text-6xl"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {formatNumber(timeLeft.hours)}
                </span>
                <span className="text-3xl md:text-4xl lg:text-5xl">:</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-4xl md:text-5xl lg:text-6xl"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {formatNumber(timeLeft.minutes)}
                </span>
                <span className="text-3xl md:text-4xl lg:text-5xl">:</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-4xl md:text-5xl lg:text-6xl"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {formatNumber(timeLeft.seconds)}
                </span>
              </div>
            </div>

            <div
              className="flex justify-center gap-6 text-[0.65rem] md:text-xs tracking-[0.3em] uppercase text-white/80"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              <span>DÍAS</span>
              <span>HORAS</span>
              <span>MINUTOS</span>
              <span>SEGUNDOS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

