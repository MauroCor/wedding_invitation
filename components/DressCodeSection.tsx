"use client";

import Image from "next/image";

export default function DressCodeSection() {
  return (
    <section
      className="py-8! md:py-10!"
      id="dress-code"
      style={{ backgroundColor: "#789966" }}
    >
      <div className="container">
        <div className="text-center">
          <div className="flex items-center justify-center gap-0 -mb-1">
            <div className="relative h-20 w-14 md:h-24 md:w-18">
              <Image
                src="/icons/tie.png"
                alt=""
                fill
                className="object-contain"
                aria-hidden
              />
            </div>
            <div className="relative h-22 w-16 md:h-28 md:w-20 -ml-1">
              <Image
                src="/icons/dress.png"
                alt=""
                fill
                className="object-contain"
                aria-hidden
              />
            </div>
          </div>

          <h2
            className="mb-2 text-3xl md:text-4xl text-white font-light"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            DRESS CODE
          </h2>

          <p
            className="text-xl md:text-2xl text-white/95"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Vestimenta formal elegante
          </p>

          <p className="mt-4 mb-1 flex items-center justify-center gap-2 text-sm md:text-lg text-white/85">
            <svg
              className="w-4 h-4 shrink-0 text-white/90"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
              <path d="M9.5 8.5H10.5V14H9.5V8.5Z" fill="currentColor" />
              <circle cx="10" cy="6" r="0.8" fill="currentColor" />
            </svg>
            <span>Verde y blanco reservados para los novios</span>
          </p>
        </div>
      </div>
    </section>
  );
}
