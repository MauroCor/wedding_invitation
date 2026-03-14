export default function LocationSection() {
  return (
    <section className="location" id="ubicacion">
      <div className="container">
        <h2 className="section-title">Ubicación</h2>
        <div className="location-content">
          <div className="location-info">
            <p>
              <strong>LA CAYETANA</strong>
            </p>
            <p>Río Negro N° 4000, B° Los Olmos.</p>
          </div>
        </div>
        <div className="map-container">
          <div className="map-placeholder">
            <iframe
              title="Ubicación - LA CAYETANA"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13740.87664538759!2d-64.23390548378111!3d-31.454239134597138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a343f0128009%3A0xab7f3422a7366786!2sLa%20Cayetana!5e0!3m2!1sen!2sar!4v1773496964128!5m2!1sen!2sar"
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}