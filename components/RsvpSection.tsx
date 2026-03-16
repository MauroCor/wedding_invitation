 "use client";

import { useEffect, useState } from "react";

export default function RsvpSection() {
  const [isValueModalOpen, setIsValueModalOpen] = useState(false);

  useEffect(() => {
    if (!isValueModalOpen) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [isValueModalOpen]);
  return (
    <section className="rsvp py-16 md:py-20" id="rsvp">
      <div className="container">
        <h2 className="section-title">Confirmar asistencia</h2>

        <div className="max-w-xl mx-auto text-center">
          <p
            className="text-xl md:text-3xl text-[#2C3E50] mb-10 whitespace-nowrap md:whitespace-normal"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nos encantaría contar con tu presencia.
          </p>

          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => setIsValueModalOpen(true)}
              className="text-sm md:text-base text-[#2C3E50] font-semibold uppercase tracking-wider border-b border-[#2C3E50] pb-2 hover:text-[#1a252f] transition-colors"
            >
              Ver valor de la tarjeta
            </button>

            <button
              type="button"
              className="px-8 py-3 rounded-lg bg-[#5d7a71] text-white font-medium hover:bg-[#4a6560] transition-colors"
            >
              ¡ Sí voy !
            </button>
          </div>
        </div>
      </div>

      {isValueModalOpen && (
        <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl p-6 relative text-center">
            <button
              type="button"
              className="absolute top-3 right-3 text-[#2C3E50]/60 hover:text-[#2C3E50] transition-colors"
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
      )}
    </section>
  );
}
