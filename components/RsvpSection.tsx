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

  return (
    <>
      <section className="rsvp py-16 md:py-20" id="rsvp">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <div className="bg-white/90 border border-neutral-200 rounded-3xl shadow-md px-6 py-8 md:px-10 md:py-10 text-center">
              <h2
                className="section-title !mb-4 md:!mb-6"
                style={{ fontSize: "2rem" }}
              >
                ¡Te esperamos!
              </h2>

              <p
                className="text-lg md:text-3xl text-[#2C3E50] mb-8 whitespace-normal"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Nos encantaría contar con tu presencia.
              </p>

              <div className="flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsValueModalOpen(true)}
                  className="text-sm mb-8 md:text-base text-[#2C3E50] font-semibold uppercase tracking-wider border-b border-[#2C3E50] pb-1 transition-all hover:text-[#1a252f] hover:-translate-y-0.5"
                  style={{ animation: "heartbeat 6s ease-in-out infinite" }}
                >
                  Ver valor de tarjeta
                </button>

                <button
                  type="button"
                  className={`px-8 py-3 rounded-lg font-bold text-lg transition-colors ${
                    hasConfirmed
                      ? "btn-multicolor text-white cursor-default"
                      : "bg-[#789966] text-white hover:bg-[#789966]"
                    }`}
                  onClick={handleConfirmClick}
                  onMouseEnter={() => !hasConfirmed && setIsHoveringConfirm(true)}
                  onMouseLeave={() => !hasConfirmed && setIsHoveringConfirm(false)}
                >
                  {hasConfirmed || isHoveringConfirm ? "¡ Si voy !" : "Confirmar asistencia"}
                </button>
              </div>
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
            className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6 relative text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-1 right-3 text-lg text-[#2C3E50]/70 hover:text-[#2C3E50] transition-colors"
              onClick={() => setIsValueModalOpen(false)}
              aria-label="Cerrar"
            >
              ×
            </button>

            <h3 className="text-sm md:text-base text-[#2C3E50] font-semibold uppercase tracking-wider border-b border-[#2C3E50] pb-2 inline-block mb-4">
              Valor de la tarjeta
            </h3>

            <p className="text-[#2C3E50] mb-1">Adultos: $140.000</p>
            <p className="text-[#2C3E50] mb-4">Niños (3 a 10): $93.000</p>

            <p className="mt-1 mb-2 flex items-center justify-center gap-2 text-xs md:text-sm text-[#2C3E50]/80">
              <svg
                className="w-4 h-4 shrink-0 text-[#2C3E50]"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
                <path
                  d="M9.5 8.5H10.5V14H9.5V8.5Z"
                  fill="currentColor"
                />
                <circle cx="10" cy="6" r="0.8" fill="currentColor" />
              </svg>
              <span>Aumento mensual por inflación.</span>
            </p>

            <div className="w-full h-px bg-[#2C3E50]/20 mb-3" />

            <p className="mb-2 text-xl">Medios de pago</p>

            <p className="text-[15px] text-[#2C3E50]/80">
              Alias: <span className="font-semibold text-[#2C3E50]">nabimauro.boda</span>
            </p>

            <p className="text-[15px] text-[#2C3E50]/80 mt-1">Recibimos efectivo.</p>
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
            className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6 relative text-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-1 right-3 text-lg text-[#2C3E50]/70 hover:text-[#2C3E50] transition-colors"
              onClick={() => setIsConfirmModalOpen(false)}
              aria-label="Cerrar"
            >
              ×
            </button>

            <h3 className="text-sm md:text-base text-[#2C3E50] font-semibold uppercase tracking-wider border-b border-[#2C3E50] pb-2 inline-block mb-4">
              ¡Qué alegría que vayamos a vernos!
            </h3>

            <p className="text-[#2C3E50] mb-4">
              Completá el formulario para terminar de confirmar tu asistencia.
            </p>

            <div className="mt-6 flex justify-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdUIiSAHvGIK-kzWngef0hFVbgVx2FhcdEe1L-b6koV2pr38Q/viewform?usp=publish-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white bg-[#789966] hover:bg-[#789966] transition-colors"
              >
                Ver formulario
              </a>
            </div>
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
