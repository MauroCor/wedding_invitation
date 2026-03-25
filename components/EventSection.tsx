import Image from "next/image";

export default function EventSection() {
  return (
    <section className="event py-8! mt-20" id="evento" style={{ backgroundColor: '#789966' }}>
      <div className="container">
        <div className="event-header text-center">
          <Image
            src="/icons/nm.png"
            alt=""
            width={100}
            height={100}
            className="shrink-0 mx-auto"
            aria-hidden
          />
          <p className="event-intro pt-4 text-white max-w-4xl mx-auto" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.1rem",
            lineHeight: "1.6",
            letterSpacing: "0.02em",
          }}>
            Con mucha gratitud y amor en el corazón, queremos celebrar con ustedes el comienzo de nuestra nueva familia.
          </p>
        </div>
      </div>
    </section>
  );
}

