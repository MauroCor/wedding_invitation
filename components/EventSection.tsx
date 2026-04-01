import Image from "next/image";

export default function EventSection() {
  return (
    <section className="event py-8! mt-20" id="evento" style={{ backgroundColor: '#789966' }}>
      <div className="container">
        <div className="event-header text-center">
          <h2
            className="mb-3 text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            ¡NOS CASAMOS!
          </h2>

          <p className="event-intro text-lg md:text-2xl inline text-white max-w-4xl mx-auto" style={{
            fontFamily: "'Cormorant Garamond', serif",
          }}>
            Con mucha gratitud y amor en el corazón, queremos celebrar con ustedes el comienzo de nuestra nueva familia.
          </p>
        </div>
      </div>
    </section>
  );
}

