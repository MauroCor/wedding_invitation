 "use client";

import { useEffect, useState } from "react";

export default function RsvpSection() {
  const [isValueModalOpen, setIsValueModalOpen] = useState(false);

  const [isHoveringConfirm, setIsHoveringConfirm] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const [showPinataExplosion, setShowPinataExplosion] = useState(false);

  const handleConfirmClick = () => {
    setHasConfirmed(true);
    // Explosiones de confetti casi consecutivas
    setShowPinataExplosion(true);
    setTimeout(() => setShowPinataExplosion(false), 600);
    setTimeout(() => setShowPinataExplosion(true), 1200);
    setTimeout(() => setShowPinataExplosion(false), 1800);
    setTimeout(() => setShowPinataExplosion(true), 2400);
    setTimeout(() => setShowPinataExplosion(false), 3000);
    setTimeout(() => setShowPinataExplosion(true), 3600);
    setTimeout(() => setShowPinataExplosion(false), 4200);
    setTimeout(() => setShowPinataExplosion(true), 4600);
    setTimeout(() => setShowPinataExplosion(false), 5000);

    // Abrir el Google Form en una nueva pestaña ~3 segundos después del click
    setTimeout(() => {
      window.open(
        "https://docs.google.com/forms/d/FORM_ID_AQUI/viewform",
        "_blank",
        "noopener,noreferrer"
      );
    }, 3000);

    setTimeout(() => {
      setHasConfirmed(false);
      setIsHoveringConfirm(false);
    }, 5000);
  };

  useEffect(() => {
    if (!isValueModalOpen) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [isValueModalOpen]);
  return (
    <>
      <section className="rsvp py-16 md:py-20" id="rsvp">
        <div className="container">
          <h2 className="section-title">Confirmar asistencia</h2>

          <div className="max-w-xl mx-auto text-center">
            <p
              className="text-xl md:text-3xl text-[#2C3E50] mb-8 whitespace-nowrap md:whitespace-normal"
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
                    : "bg-[#5d7a71] text-white hover:bg-[#4a6560]"
                }`}
                onClick={handleConfirmClick}
                onMouseEnter={() => !hasConfirmed && setIsHoveringConfirm(true)}
                onMouseLeave={() => !hasConfirmed && setIsHoveringConfirm(false)}
              >
                {hasConfirmed || isHoveringConfirm ? "¡ Si voy !" : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {isValueModalOpen && (
        <div
          className="fixed inset-0 z-10000 bg-black/80"
          onClick={() => setIsValueModalOpen(false)}
        >
          <div className="w-full h-full flex items-center justify-center px-4">
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
                <span>Aumentos trimestrales por IPC</span>
              </p>

              <div className="w-full h-px bg-[#2C3E50]/20 mb-3" />

              <p className="text-sm text-[#2C3E50]/80">
                Alias: <span className="font-semibold text-[#2C3E50]">casorio.nym</span>
              </p>

              <p className="text-sm text-[#2C3E50]/80 mt-1">
                Recibimos efectivo.
              </p>
            </div>
          </div>
        </div>
      )}

      {showPinataExplosion && (
        <div className="pinata-explosion">
          <div className="pinata-explosion-inner">
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
            <div className="confetti-piece" />
          </div>
        </div>
      )}
    </>
  );
}
