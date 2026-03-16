"use client";

import { useEffect, useRef, useState } from "react";

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
const SWIPE_THRESHOLD_PX = 50;

export default function GallerySection() {
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const isOverlayOpen = selectedIndex !== null;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  // Bloquear scroll del fondo cuando el overlay está abierto
  useEffect(() => {
    if (!isOverlayOpen) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [isOverlayOpen]);

  const handleOpen = (slideIndex: number) => {
    setSelectedIndex(slideIndex);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const goTo = (newIndex: number) => {
    const normalized = ((newIndex % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setIndex(normalized);
    setSelectedIndex(normalized);
  };

  const goNext = () => {
    if (selectedIndex === null) return;
    goTo(selectedIndex + 1);
  };

  const goPrev = () => {
    if (selectedIndex === null) return;
    goTo(selectedIndex - 1);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = endX - touchStartXRef.current;

    if (deltaX > SWIPE_THRESHOLD_PX) {
      goPrev();
    } else if (deltaX < -SWIPE_THRESHOLD_PX) {
      goNext();
    }

    touchStartXRef.current = null;
  };

  const selectedSlide =
    selectedIndex !== null ? SLIDES[selectedIndex] : null;

  return (
    <section className="gallery py-16 md:py-20 overflow-hidden" id="galeria">
      <div className="container">
        <h2 className="section-title">Nosotros</h2>

        {/* Vitrina: marco que muestra una "foto" a la vez */}
        <div className="max-w-2xl mx-auto">
          <div className="relative aspect-4/3 rounded-lg overflow-hidden shadow-lg bg-neutral-200">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleOpen(i)}
                className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none"
                style={{
                  transform: `translateX(${(i - index) * 100}%)`,
                  transition: "transform 700ms ease-in-out",
                  backgroundColor: slide.color,
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white/30 text-4xl font-serif">
                    {slide.label}
                  </span>
                </div>
              </button>
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

      {/* Overlay al hacer click en la foto */}
      {selectedSlide && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80"
          onClick={handleClose}
        >
          <div
            className="relative max-w-3xl w-[90%] aspect-4/3 z-[65]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full h-full rounded-xl overflow-hidden shadow-2xl"
              style={{ backgroundColor: selectedSlide.color }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Botón cerrar */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center text-xs hover:bg-black/80"
                aria-label="Cerrar foto"
              >
                ✕
              </button>

              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white/30 text-6xl font-serif">
                  {selectedSlide.label}
                </span>
              </div>
            </div>

            {/* Flecha izquierda */}
            <button
              type="button"
              onClick={goPrev}
              className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 z-[70]"
              aria-label="Foto anterior"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 md:w-5 md:h-5"
                aria-hidden="true"
              >
                <path
                  d="M15.5 5L9 11.5L15.5 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Flecha derecha */}
            <button
              type="button"
              onClick={goNext}
              className="absolute -right-6 md:-right-10 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 z-[70]"
              aria-label="Foto siguiente"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 md:w-5 md:h-5"
                aria-hidden="true"
              >
                <path
                  d="M8.5 5L15 11.5L8.5 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
