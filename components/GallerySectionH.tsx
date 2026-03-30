"use client";

import { useEffect, useRef, useState } from "react";
import { useGallerySwipe } from "@/hooks/useGallerySwipe";
import FullscreenOverlay from "./FullscreenOverlay";

// Placeholders de colores para simular fotos (luego reemplazar por <img src="..." />)
const SLIDES = [
  { id: 1, src: "/h-gallery/carrousel/IMG_0154.jpg", label: "1" },
  { id: 2, src: "/h-gallery/carrousel/IMG_0148.jpg", label: "2" },
  { id: 3, src: "/h-gallery/carrousel/IMG_0207.jpg", label: "3" },
  { id: 4, src: "/h-gallery/carrousel/IMG_0146.jpg", label: "4" },
  { id: 5, src: "/h-gallery/carrousel/IMG_0216.jpg", label: "5" },
  { id: 6, src: "/h-gallery/carrousel/IMG_0264.jpg", label: "6" },
];

// Triplicar slides para efecto infinito seamless sin saltos
const INFINITE_SLIDES = [...SLIDES, ...SLIDES, ...SLIDES];

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef(0);

  const isOverlayOpen = selectedIndex !== null;

  const swipeHandlers = useGallerySwipe(
    isOverlayOpen,
    () =>
      setSelectedIndex((i) => (i === null ? 0 : (i + 1) % SLIDES.length)),
    () =>
      setSelectedIndex((i) =>
        i === null ? 0 : (i - 1 + SLIDES.length) % SLIDES.length
      )
  );

  // Auto-scroll horizontal continuo y constante (sin saltos)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Velocidad un poco más lenta y estable por tiempo (independiente de FPS)
    const speedPxPerSecond = 60;
    let rafId = 0;
    let lastTime = performance.now();
    let initialized = false;

    const normalizePosition = (position: number, oneSetWidth: number) => {
      let normalized = position;
      while (normalized < oneSetWidth) normalized += oneSetWidth;
      while (normalized >= oneSetWidth * 2) normalized -= oneSetWidth;
      return normalized;
    };

    const tick = (now: number) => {
      const oneSetWidth = container.scrollWidth / 3;
      if (!oneSetWidth || !Number.isFinite(oneSetWidth)) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (!initialized) {
        // Empezar en el set del medio para poder "envolver" sin corte visual
        scrollPositionRef.current = oneSetWidth;
        container.scrollLeft = scrollPositionRef.current;
        initialized = true;
        lastTime = now;
      }

      // Clamp para evitar saltos grandes si la pestaña estuvo pausada
      const deltaSeconds = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      scrollPositionRef.current += speedPxPerSecond * deltaSeconds;
      scrollPositionRef.current = normalizePosition(
        scrollPositionRef.current,
        oneSetWidth
      );
      container.scrollLeft = scrollPositionRef.current;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleOpen = (slideIndex: number) => {
    setSelectedIndex(slideIndex);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const selectedSlide =
    selectedIndex !== null ? SLIDES[selectedIndex] : null;

  return (
    <section className="gallery py-16 md:py-20 overflow-hidden" id="galeria">
        {/* Vitrina: múltiples fotos con auto-scroll horizontal */}
        <div className="w-full">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-hidden pb-4"
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              touchAction: "pan-y",
              overscrollBehaviorX: "none",
            }}
            onWheel={(event) => {
              if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
                event.preventDefault();
              }
            }}
          >
            {INFINITE_SLIDES.map((slide, i) => (
              <button
                key={`${slide.id}-${i}`}
                type="button"
                onClick={() => handleOpen(i % SLIDES.length)}
                className="shrink-0 w-92 md:w-120 aspect-4/3 rounded-lg overflow-hidden shadow-lg bg-neutral-200 cursor-pointer hover:shadow-xl transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                aria-label={`Foto ${slide.label}`}
              >
                <img
                  src={slide.src}
                  alt={`Foto ${slide.label}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 md:mt-12 px-6 text-center">
          <p
            className="mx-auto max-w-2xl text-lg font-bold italic leading-relaxed tracking-[0.04em] text-[#1f2937] md:text-xl md:leading-loose md:tracking-[0.05em] lg:text-2xl inline"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow:
                "0 1px 2px rgba(255, 255, 255, 0.9), 0 0 8px rgba(255, 255, 255, 0.45)",
            }}
          >
             «Todo lo hizo hermoso en su tiempo»
          </p>
        </div>

      {/* Overlay al hacer click en la foto */}
      {selectedSlide && (
        <FullscreenOverlay
          open={isOverlayOpen}
          onClose={handleClose}
          contentClassName="w-full h-full flex items-center justify-center px-4"
        >
          <div
            className="relative max-w-4xl w-[90%] aspect-4/3 z-65"
            style={{ touchAction: "pan-y" }}
            onClick={(event) => event.stopPropagation()}
            {...swipeHandlers}
          >
            <div
              className="w-full h-full rounded-xl overflow-hidden shadow-2xl relative"
            >
              <img
                src={selectedSlide.src}
                alt={`Foto ${selectedSlide.label}`}
                className="w-full h-full object-cover"
              />
              
              {/* Botón cerrar */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center text-xs hover:bg-black/80"
                aria-label="Cerrar foto"
              >
                ✕
              </button>
            </div>

            {/* Flecha izquierda */}
            <button
              type="button"
              onClick={() => {
                const newIndex =
                  selectedIndex === null ? 0 : (selectedIndex - 1 + SLIDES.length) % SLIDES.length;
                setSelectedIndex(newIndex);
              }}
              className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 z-70"
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
              onClick={() => {
                const newIndex = selectedIndex === null ? 0 : (selectedIndex + 1) % SLIDES.length;
                setSelectedIndex(newIndex);
              }}
              className="absolute -right-6 md:-right-10 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 z-70"
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
        </FullscreenOverlay>
      )}
    </section>
  );
}
