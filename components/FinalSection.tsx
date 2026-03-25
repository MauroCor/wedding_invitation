"use client";

import Image from "next/image";
import CountdownSection from "./CountdownSection";
import TriviaSection from "./TriviaSection";

export default function FinalSection() {
  return (
    <section id="final" className="relative min-h-[75vh] overflow-hidden py-0!">
      <Image
        src="/v-gallery/IMG_FINAL.jpg"
        alt="Nabila y Mauro en la cascada"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div
        className="pointer-events-none absolute inset-0 bg-black/40"
        aria-hidden
      />
      <div className="relative z-10 pt-4 md:pt-6">
        <CountdownSection />
      </div>
      <div className="relative z-10 flex min-h-[75vh] items-end justify-center px-4 pb-[8vh] pt-6 md:px-6 md:pb-[10vh]">
        <TriviaSection />
      </div>
    </section>
  );
}
