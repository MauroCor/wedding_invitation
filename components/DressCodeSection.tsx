"use client";

import Image from "next/image";

export default function DressCodeSection() {
  return (
    <section className="dress-code py-16 md:py-20" id="dress-code">
      <div className="container flex justify-center">
        <article
          className="w-full max-w-3xl mx-auto rounded-2xl shadow-lg overflow-hidden flex flex-col px-4 py-6 md:px-8 md:py-12"
          style={{ backgroundColor: "#FAF9F7" }}
        >
          <h2 className="section-title mb-4! md:mb-6!">Vestimenta formal</h2>
          <p className="text-lg text-center md:text-3xl text-[#2C3E50] mb-8 whitespace-normal">
            Colores reservados para los novios:
          </p>
          <div className="flex flex-row flex-nowrap items-center justify-center">
            <div className="shrink-0 w-14 h-20 md:w-20 md:h-24 relative">
              <Image
                src="/icons/tie.png"
                alt="tie"
                fill
                className="object-contain"
                aria-hidden
              />
            </div>
            <div className="flex-1 min-w-0 text-center px-2 md:px-6">
              <div className="flex items-center justify-center gap-1">
                <div
                  className="w-8 h-8 md:w-14 md:h-14 rounded-full border border-[#2C3E50]/40 shrink-0"
                  style={{ backgroundColor: "#789966" }}
                  title="Reservado: verde"
                  aria-hidden
                />
                <div
                  className="w-8 h-8 md:w-14 md:h-14 rounded-full border border-[#2C3E50]/40 shrink-0"
                  style={{ backgroundColor: "#ffffff" }}
                  title="Reservado: blanco"
                  aria-hidden
                />
              </div>
            </div>
            <div className="shrink-0 w-16 h-24 md:w-24 md:h-32 relative">
              <Image
                src="/icons/dress.png"
                alt="dress"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
