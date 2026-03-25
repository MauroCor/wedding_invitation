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
    <div
      className="w-full bg-[#789966]/92 px-4 py-3 text-center shadow-xl backdrop-blur-sm md:px-6 md:py-4"
      aria-label="Cuenta regresiva para la boda"
    >
      <h2
        className="mb-2 text-xl text-white tracking-[0.12em] md:text-2xl"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        ¡NOS VEMOS!
      </h2>

      <div className="flex items-start justify-center gap-1 text-white md:gap-2">
        <div className="flex flex-col items-center leading-none min-w-[54px] md:min-w-[62px]">
          <span
            className="text-2xl font-semibold tabular-nums md:text-3xl"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            {formatNumber(timeLeft.days)}
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-wide text-white/80 md:text-xs">
            Días
          </span>
        </div>
        <span className="pt-[2px] text-2xl md:text-3xl text-white/90">:</span>
        <div className="flex flex-col items-center leading-none min-w-[54px] md:min-w-[62px]">
          <span
            className="text-2xl font-semibold tabular-nums md:text-3xl"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            {formatNumber(timeLeft.hours)}
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-wide text-white/80 md:text-xs">
            Horas
          </span>
        </div>
        <span className="pt-[2px] text-2xl md:text-3xl text-white/90">:</span>
        <div className="flex flex-col items-center leading-none min-w-[54px] md:min-w-[62px]">
          <span
            className="text-2xl font-semibold tabular-nums md:text-3xl"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            {formatNumber(timeLeft.minutes)}
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-wide text-white/80 md:text-xs">
            Min
          </span>
        </div>
        <span className="pt-[2px] text-2xl md:text-3xl text-white/90">:</span>
        <div className="flex flex-col items-center leading-none min-w-[54px] md:min-w-[62px]">
          <span
            className="text-2xl font-semibold tabular-nums md:text-3xl"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            {formatNumber(timeLeft.seconds)}
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-wide text-white/80 md:text-xs">
            Seg
          </span>
        </div>
      </div>
    </div>
  );
}

