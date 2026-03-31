import Image from "next/image";

export default function EventSection() {
  return (
    <section className="event py-8! mt-20" id="evento" style={{ backgroundColor: '#789966' }}>
      <div className="container">
        <div className="event-header text-center">
          <Image
            src="/icons/nm.png"
            alt=""
            width={120}
            height={120}
            className="shrink-0 mx-auto pb-2"
            aria-hidden
          />
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

