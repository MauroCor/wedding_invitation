"use client";

import { useEffect, useState } from "react";

// Placeholders de colores para simular fotos (luego reemplazar por <img src="..." />)
const SLIDES = [
  { id: 1, color: "#97ae8b", label: "1" },
  { id: 2, color: "#bda491", label: "2" },
  { id: 3, color: "#5d7a71", label: "3" },
  { id: 4, color: "#e8ddd4", label: "4" },
  { id: 5, color: "#c4a77d", label: "5" },
  { id: 6, color: "#a8c5b5", label: "6" },
];

const INTERVAL_MS = 4000;

export default function GallerySection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="gallery py-16 md:py-20 overflow-hidden" id="galeria">
      <div className="container">
        <h2 className="section-title">Nosotros</h2>

        {/* Vitrina: marco que muestra una "foto" a la vez */}
        <div className="max-w-2xl mx-auto">
          <div className="relative aspect-4/3 rounded-lg overflow-hidden shadow-lg bg-neutral-200">
            {SLIDES.map((slide, i) => (
              <div
                key={slide.id}
                className="absolute inset-0 transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(${(i - index) * 100}%)`,
                  backgroundColor: slide.color,
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white/30 text-4xl font-serif">
                    {slide.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores de posición */}
          <div className="flex justify-center gap-2 mt-4">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir a foto ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === index ? "bg-[#5d7a71]" : "bg-neutral-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
