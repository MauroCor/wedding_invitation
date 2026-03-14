export default function GallerySection() {
  return (
    <section className="gallery" id="galeria">
      <div className="container">
        <h2 className="section-title">Galería</h2>
        <div className="gallery-grid gallery-grid-2x2">
          {["Foto 1", "Foto 2", "Foto 3", "Foto 4"].map((label) => (
            <div className="gallery-item" key={label}>
              <div className="gallery-placeholder">
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

