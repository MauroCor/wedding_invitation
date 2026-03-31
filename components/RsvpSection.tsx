 "use client";

import { useState, type CSSProperties } from "react";
import FullscreenOverlay from "./FullscreenOverlay";

const CONFETTI_PIECES = 20;

type Explosion = {
  id: number;
  top: number;
  left: number;
};

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export default function RsvpSection() {
  const [isValueModalOpen, setIsValueModalOpen] = useState(false);
  const [isAliasCopied, setIsAliasCopied] = useState(false);

  const [isHoveringConfirm, setIsHoveringConfirm] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleConfirmClick = () => {
    // Reproducir sonido yay
    const audio = new Audio("/audio/yay.mp3");
    audio.play().catch(() => {
      // Ignorar errores de reproducción
    });

    setHasConfirmed(true);
    // Varias explosiones de confetti solapadas
    const baseDelay = 0;
    const interval = 400;
    const count = 8;

    Array.from({ length: count }).forEach((_, index) => {
      const delay = baseDelay + index * interval;
      const id = Date.now() + index;
      setTimeout(() => {
        // Origen aleatorio, pero en zonas agradables visualmente
        const top = randomBetween(25, 75); // porcentaje de alto de viewport
        const left = randomBetween(20, 80); // porcentaje de ancho de viewport

        setExplosions((prev) => [...prev, { id, top, left }]);
        // Remover cada explosión después de un tiempo para no acumular
        setTimeout(() => {
          setExplosions((prev) => prev.filter((explosion) => explosion.id !== id));
        }, 1200);
      }, delay);
    });

    setTimeout(() => {
      setIsConfirmModalOpen(true);
    }, 2000);

    setTimeout(() => {
      setHasConfirmed(false);
      setIsHoveringConfirm(false);
    }, 5000);
  };

  const handleCopyAlias = async () => {
    try {
      await navigator.clipboard.writeText("nabimauro.boda");
      setIsAliasCopied(true);
      setTimeout(() => setIsAliasCopied(false), 1800);
    } catch {
      setIsAliasCopied(false);
    }
  };

  return (
    <>
      <section className="rsvp py-16 md:py-20" id="rsvp">
        <div className="w-full">
          <div className="w-full bg-white/90 border border-neutral-200 shadow-md px-6 py-8 md:px-10 md:py-10 text-center">
              <div className="mb-5">
                <h2
                  className="text-[1.9rem] md:text-[2.2rem] font-semibold leading-tight text-[#2C3E50]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Confirmá tu asistencia
                </h2>
                <p className="mt-3 mx-auto max-w-xl text-[15px] md:text-lg leading-relaxed text-[#2C3E50]/75">
                  Nos encantaría contar con tu presencia
                </p>
              </div>

              <div className="flex flex-col items-center gap-8">
                <button
                  type="button"
                  onClick={() => setIsValueModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-full border border-[#2C3E50]/25 px-5 py-2 text-sm md:text-base text-[#2C3E50] font-semibold tracking-wide transition-all hover:bg-[#2C3E50]/5 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#789966] focus-visible:ring-offset-2"
                  style={{ animation: "heartbeat 6s ease-in-out infinite" }}
                >
                  Ver valor de tarjeta
                </button>

                <button
                  type="button"
                  className={`w-full max-w-xs px-8 py-3.5 rounded-2xl font-bold text-lg text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#789966] focus-visible:ring-offset-2 ${
                    hasConfirmed
                      ? "btn-multicolor text-white cursor-default"
                      : "bg-[#789966] text-white hover:bg-[#789966]"
                    }`}
                  onClick={handleConfirmClick}
                  onMouseEnter={() => !hasConfirmed && setIsHoveringConfirm(true)}
                  onMouseLeave={() => !hasConfirmed && setIsHoveringConfirm(false)}
                >
                  {hasConfirmed || isHoveringConfirm ? "¡Sí voy!" : "Confirmar asistencia"}
                </button>
              </div>
          </div>
        </div>
      </section>

      {isValueModalOpen && (
        <FullscreenOverlay
          open={isValueModalOpen}
          onClose={() => setIsValueModalOpen(false)}
          contentClassName="w-full h-full flex items-center justify-center px-4"
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-6 relative text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-1 right-3 text-lg text-[#2C3E50]/70 hover:text-[#2C3E50] transition-colors cursor-pointer"
              onClick={() => setIsValueModalOpen(false)}
              aria-label="Cerrar"
            >
              ×
            </button>

            <h3 className="mb-2 text-xl md:text-2xl font-semibold text-[#4E6545]">
              Valor de la tarjeta
            </h3>
            <div className="mx-auto mb-5 h-0.5 w-16 rounded-full bg-[#FFDEA5]" />

            <div className="rounded-2xl bg-[#F3F4F3] border border-[#2C3E50]/10 px-8 py-3 mb-3 flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.12em] font-bold text-[#4E6545]">
                Adultos
              </p>
              <p className="text-xl md:text-2xl font-semibold text-[#303333]">$140.000</p>
            </div>

            <div className="rounded-2xl bg-[#F3F4F3] border border-[#2C3E50]/10 px-8 py-3 mb-6 flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.12em] font-bold text-[#4E6545]">
                Niños (3 a 10)
              </p>
              <p className="text-xl md:text-2xl font-semibold text-[#303333]">$93.000</p>
            </div>

            <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-[#785A1A]/80 text-center">
              Medios de pago
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between w-full px-6 py-4 bg-white border border-[#b0b2b1]/20 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#ffdea5]/30 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#785a1a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 7h12" />
                      <path d="M12 3l4 4-4 4" />
                      <path d="M20 17H8" />
                      <path d="M12 13l-4 4 4 4" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#b0b2b1] font-bold leading-tight">
                      Alias
                    </span>
                    <span className="text-[16px] md:text-[17px] font-semibold text-[#303333]">
                      nabimauro.boda
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyAlias}
                  className="p-1 text-[#4e6545] hover:scale-110 active:scale-90 transition-transform duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#789966] focus-visible:ring-offset-2 rounded-md"
                  aria-label="Copiar alias"
                  title={isAliasCopied ? "Copiado" : "Copiar alias"}
                >
                  {isAliasCopied ? (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M4.5 10L8.2 13.7L15.5 6.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4e6545"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="9" y="9" width="10" height="10" rx="2" />
                      <path d="M7 15H6C4.9 15 4 14.1 4 13V6C4 4.9 4.9 4 6 4H13C14.1 4 15 4.9 15 6V7" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between w-full px-6 py-4 bg-white border border-[#b0b2b1]/20 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#728C69]/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4e6545"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <circle cx="12" cy="12" r="2.5" />
                      <path d="M6 12h.01M18 12h.01" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[16px] md:text-[17px] font-semibold text-[#303333]">
                      Recibimos efectivo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/5493515515392"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#1ebe5d] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#789966] focus-visible:ring-offset-2"
              aria-label="Contactanos por WhatsApp"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 32 32"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M19.11 17.24C18.82 17.09 17.39 16.39 17.13 16.29C16.87 16.19 16.68 16.14 16.49 16.43C16.31 16.72 15.79 17.33 15.64 17.51C15.49 17.68 15.35 17.71 15.06 17.56C14.77 17.42 13.84 17.12 12.75 16.15C11.9 15.39 11.32 14.45 11.17 14.16C11.03 13.87 11.16 13.72 11.28 13.58C11.4 13.46 11.57 13.26 11.72 13.09C11.86 12.92 11.91 12.8 12.01 12.6C12.1 12.41 12.06 12.24 11.99 12.1C11.91 11.95 11.35 10.53 11.12 10.01C10.89 9.5 10.66 9.57 10.49 9.56C10.32 9.55 10.13 9.55 9.94 9.55C9.75 9.55 9.45 9.62 9.2 9.9C8.95 10.18 8.25 10.84 8.25 12.2C8.25 13.56 9.22 14.87 9.36 15.05C9.51 15.24 11.43 18.29 14.39 19.57C15.1 19.88 15.65 20.07 16.08 20.21C16.79 20.44 17.44 20.41 17.96 20.33C18.54 20.24 19.73 19.64 19.97 18.97C20.21 18.31 20.21 17.74 20.14 17.62C20.07 17.5 19.89 17.42 19.59 17.27L19.11 17.24Z"
                  transform="translate(2 0)"
                />
                <path d="M16 3C8.82 3 3 8.82 3 16C3 18.55 3.74 20.94 5.01 22.96L3.31 29L9.54 27.35C11.47 28.48 13.71 29.13 16 29.13C23.18 29.13 29 23.31 29 16.13C29 8.82 23.18 3 16 3ZM16 26.78C13.92 26.78 11.88 26.2 10.11 25.1L9.75 24.88L6.06 25.86L7.05 22.26L6.81 21.89C5.66 20.07 5.06 17.98 5.06 15.96C5.06 9.96 9.99 5.06 16 5.06C22.01 5.06 26.94 9.99 26.94 16C26.94 22.01 22.01 26.78 16 26.78Z" />
              </svg>
              <span className="text-lg md:text-xl font-semibold">Contactanos</span>
            </a>

            <p className="mt-4 flex items-center justify-center gap-2 text-xs md:text-sm text-[#2C3E50]/75">
              <svg
                className="w-4 h-4 shrink-0 text-[#2C3E50]"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
                <path d="M9.5 8.5H10.5V14H9.5V8.5Z" fill="currentColor" />
                <circle cx="10" cy="6" r="0.8" fill="currentColor" />
              </svg>
              <span className="italic text-sm">Aumentos mensuales por inflación.</span>
            </p>
          </div>
        </FullscreenOverlay>
      )}

      {isConfirmModalOpen && (
        <FullscreenOverlay
          open={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          contentClassName="w-full h-full flex items-center justify-center px-4"
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-6 relative text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-1 right-3 text-lg text-[#2C3E50]/70 hover:text-[#2C3E50] transition-colors cursor-pointer"
              onClick={() => setIsConfirmModalOpen(false)}
              aria-label="Cerrar"
            >
              ×
            </button>

            <h3 className="mb-2 text-xl md:text-2xl font-semibold text-[#4E6545]">
              ¡Qué buena noticia!
            </h3>
            <div className="mx-auto mb-5 h-0.5 w-16 rounded-full bg-[#FFDEA5]" />

            <p className="mb-6 text-[15px] md:text-[17px] leading-relaxed text-[#303333]">
              Completá el formulario para confirmar.
            </p>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc8yg7aRSw-l-nQ8E2xO2JMBD7PR5jMwVYpQ7B_K4-HY5Ysvw/viewform?usp=pp_url&entry.849895179=Ninguno&entry.1718304354=Ninguno&entry.229254228=Ninguna&entry.510319893=No,+ninguna"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#789966] px-5 py-2.5 text-lg md:text-xl font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#6d8a5c] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#789966] focus-visible:ring-offset-2"
            >
              Ver formulario
            </a>
          </div>
        </FullscreenOverlay>
      )}

      {explosions.map((explosion) => (
        <div key={explosion.id} className="pinata-explosion">
          <div
            className="pinata-explosion-inner"
            style={
              {
                "--explosion-top": `${explosion.top}%`,
                "--explosion-left": `${explosion.left}%`,
              } as CSSProperties
            }
          >
            {Array.from({ length: CONFETTI_PIECES }).map((_, index) => {
              const direction = Math.floor(Math.random() * 3); // 0: izq, 1: arriba, 2: der

              let x: number;
              let y: number;

              if (direction === 0) {
                // arriba-izquierda
                x = randomBetween(-220, -80);
                y = randomBetween(-220, -120);
              } else if (direction === 1) {
                // arriba casi vertical
                x = randomBetween(-40, 40);
                y = randomBetween(-260, -180);
              } else {
                // arriba-derecha
                x = randomBetween(80, 220);
                y = randomBetween(-220, -120);
              }

              return (
                <div
                  key={index}
                  className="confetti-piece"
                  style={
                    {
                      "--confetti-x": `${x}px`,
                      "--confetti-y": `${y}px`,
                    } as CSSProperties
                  }
                />
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
