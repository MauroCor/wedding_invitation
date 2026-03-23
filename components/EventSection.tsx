export default function EventSection() {
  return (
    <section className="event py-8!" id="evento" style={{ backgroundColor: '#789966' }}>
      <div className="container">
        <div className="event-header text-center">
          <div className="text-center">
            <h2
              className="text-white text-3xl md:text-5xl"
              style={{
                fontFamily: "'Playfair Display', serif",
                marginBottom: "0.5rem",
              }}
            >
              ¡NOS CASAMOS!
            </h2>
          </div>
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

