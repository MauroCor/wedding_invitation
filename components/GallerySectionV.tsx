"use client";

import { useEffect, useRef, useState } from "react";
import FullscreenOverlay from "./FullscreenOverlay";

// Imágenes de la galería vertical
const SLIDES = [
  { id: 7, src: "/v-gallery/carrousel/IMG_0162.JPG", label: "7" },
  { id: 8, src: "/v-gallery/carrousel/IMG_0175.JPG", label: "8" },
  { id: 9, src: "/v-gallery/carrousel/IMG_0341.jpg", label: "9" },
  { id: 10, src: "/v-gallery/carrousel/IMG_0268.jpg", label: "10" },
  { id: 11, src: "/v-gallery/carrousel/IMG_0283.jpg", label: "11" },
  { id: 12, src: "/v-gallery/carrousel/IMG_0237.JPG", label: "12" },
];

// Triplicar slides para efecto infinito seamless sin saltos
const INFINITE_SLIDES = [...SLIDES, ...SLIDES, ...SLIDES];

const SWIPE_THRESHOLD_PX = 50;

export default function GallerySection2() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);
  const resumeAutoScrollAtRef = useRef(0);

  const isOverlayOpen = selectedIndex !== null;

  // Auto-scroll horizontal continuo de derecha a izquierda (sin saltos)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Velocidad más rápida y estable por tiempo (independiente de FPS)
    const speedPxPerSecond = 90;
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

      if (now >= resumeAutoScrollAtRef.current) {
        scrollPositionRef.current -= speedPxPerSecond * deltaSeconds;
        scrollPositionRef.current = normalizePosition(
          scrollPositionRef.current,
          oneSetWidth
        );
        container.scrollLeft = scrollPositionRef.current;
      }

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

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
    resumeAutoScrollAtRef.current = performance.now() + 1200;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = endX - touchStartXRef.current;
    const container = scrollContainerRef.current;
    if (!container) return;

    if (deltaX > SWIPE_THRESHOLD_PX) {
      // Swipe derecha: scroll derecha
      container.scrollBy({ left: 300, behavior: "auto" });
    } else if (deltaX < -SWIPE_THRESHOLD_PX) {
      // Swipe izquierda: scroll izquierda
      container.scrollBy({ left: -300, behavior: "auto" });
    }

    const oneSetWidth = container.scrollWidth / 3;
    if (oneSetWidth > 0) {
      let normalized = container.scrollLeft;
      while (normalized < oneSetWidth) normalized += oneSetWidth;
      while (normalized >= oneSetWidth * 2) normalized -= oneSetWidth;
      scrollPositionRef.current = normalized;
      container.scrollLeft = normalized;
    }
    resumeAutoScrollAtRef.current = performance.now() + 1200;
    touchStartXRef.current = null;
  };

  const selectedSlide =
    selectedIndex !== null ? SLIDES[selectedIndex] : null;

  return (
    <section className="gallery py-16 md:py-20 overflow-hidden" id="galeria2">
        <h2 className="section-title">Más momentos</h2>

        {/* Vitrina: múltiples fotos con auto-scroll horizontal (derecha a izquierda) */}
        <div className="w-full">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4"
            style={{
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => {
              resumeAutoScrollAtRef.current = Number.POSITIVE_INFINITY;
            }}
            onMouseLeave={() => {
              resumeAutoScrollAtRef.current = performance.now() + 150;
            }}
          >
            {INFINITE_SLIDES.map((slide, i) => (
              <button
                key={`${slide.id}-${i}`}
                type="button"
                onClick={() => handleOpen(i % SLIDES.length)}
                className="shrink-0 w-92 md:w-120 aspect-3/4 rounded-lg overflow-hidden shadow-lg bg-neutral-200 cursor-pointer hover:shadow-xl transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
          <p className="mx-auto max-w-2xl text-lg md:text-2xl italic font-light tracking-wide text-neutral-700">
            "Todo lo hizo hermoso en su tiempo"
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
            className="relative max-w-2xl w-[90%] aspect-3/4 z-65"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="w-full h-full rounded-xl overflow-hidden shadow-2xl relative"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
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
