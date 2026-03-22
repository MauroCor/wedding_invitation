 "use client";

import { useEffect, useRef, useState } from "react";
import FullscreenOverlay from "./FullscreenOverlay";

// Placeholders de colores para simular fotos (luego reemplazar por <img src="..." />)
const SLIDES = [
  { id: 1, src: "/h-gallery/carrousel/IMG_0146.jpg", label: "1" },
  { id: 2, src: "/h-gallery/carrousel/IMG_0148.jpg", label: "2" },
  { id: 3, src: "/h-gallery/carrousel/IMG_0207.JPG", label: "3" },
  { id: 4, src: "/h-gallery/carrousel/IMG_0154.jpg", label: "4" },
  { id: 5, src: "/h-gallery/carrousel/IMG_0216.JPG", label: "5" },
  { id: 6, src: "/h-gallery/carrousel/IMG_0264.JPG", label: "6" },
];

// Triplicar slides para efecto infinito seamless sin saltos
const INFINITE_SLIDES = [...SLIDES, ...SLIDES, ...SLIDES];

const SCROLL_INTERVAL_MS = 4000;
const SWIPE_THRESHOLD_PX = 50;

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const isOverlayOpen = selectedIndex !== null;

  // Auto-scroll horizontal continuo y constante
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollStep = 1.5; // Píxeles por frame para suavidad
    let isResetting = false;

    const interval = setInterval(() => {
      if (isResetting) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      const thresholdScroll = maxScroll * 0.65; // Reiniciar cuando llegue a 65% del scroll

      // Si llega al umbral, reiniciar al inicio de forma instantánea
      if (scrollLeft >= thresholdScroll) {
        isResetting = true;
        container.scrollLeft = 0;
        setTimeout(() => {
          isResetting = false;
        }, 50);
      } else {
        container.scrollLeft += scrollStep;
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleOpen = (slideIndex: number) => {
    setSelectedIndex(slideIndex);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = endX - touchStartXRef.current;
    const container = scrollContainerRef.current;
    if (!container) return;

    if (deltaX > SWIPE_THRESHOLD_PX) {
      // Swipe derecha: scroll izquierda
      container.scrollBy({ left: -300, behavior: "smooth" });
    } else if (deltaX < -SWIPE_THRESHOLD_PX) {
      // Swipe izquierda: scroll derecha
      container.scrollBy({ left: 300, behavior: "smooth" });
    }

    touchStartXRef.current = null;
  };

  const selectedSlide =
    selectedIndex !== null ? SLIDES[selectedIndex] : null;

  return (
    <section className="gallery py-16 md:py-20 overflow-hidden" id="galeria">
        <h2 className="section-title">Nosotros</h2>

        {/* Vitrina: múltiples fotos con auto-scroll horizontal */}
        <div className="w-full">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
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

      {/* Overlay al hacer click en la foto */}
      {selectedSlide && (
        <FullscreenOverlay
          open={isOverlayOpen}
          onClose={handleClose}
          contentClassName="w-full h-full flex items-center justify-center px-4"
        >
          <div
            className="relative max-w-4xl w-[90%] aspect-4/3 z-65"
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
