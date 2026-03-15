export default function RsvpSection() {
  return (
    <section className="rsvp py-16 md:py-20" id="rsvp">
      <div className="container">
        <h2 className="section-title">Confirma tu Asistencia</h2>

        <div className="max-w-xl mx-auto text-center">
          <p
            className="text-2xl md:text-3xl text-[#2C3E50] mb-10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Nos encantaría contar con tu presencia.
          </p>

          <p className="text-sm md:text-base text-[#2C3E50] font-semibold uppercase tracking-wider border-b border-[#2C3E50] pb-2 inline-block mb-6">
            Valor de la tarjeta
          </p>

          <p className="text-[#2C3E50] mb-1">Adultos: $140.000</p>
          <p className="text-[#2C3E50] mb-8">Niños (3 a 10): $93.000</p>

          <button
            type="button"
            className="px-8 py-3 rounded-lg bg-[#5d7a71] text-white font-medium hover:bg-[#4a6560] transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </section>
  );
}
