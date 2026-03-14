"use client";

import { FormEvent, useState } from "react";

export default function ExtrasSection() {
  const [songSent, setSongSent] = useState(false);

  const handleSongSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log("Sugerencia de canción:", data);
    form.reset();
    setSongSent(true);
  };

  return (
    <section className="extras" id="extras">
      <div className="container">
        <div className="extras-grid">
          <div className="songs-suggestion">
            <h2 className="section-title small-title">Sugerir canciones</h2>
            <p className="extras-text">
              ¿Tienes una canción especial que no puede faltar en la fiesta?
              Cuéntanosla.
            </p>
            <form className="songs-form" onSubmit={handleSongSubmit}>
              <div className="form-group">
                <label htmlFor="song">Canción o artista</label>
                <input
                  type="text"
                  id="song"
                  name="song"
                  placeholder="Ej. Perfect - Ed Sheeran"
                />
              </div>
              <button
                type="submit"
                className="btn-submit btn-submit-secondary"
              >
                Enviar sugerencia
              </button>
            </form>
            {songSent && (
              <div className="songs-success">
                <p>
                  ¡Gracias por tu sugerencia! La tendremos en cuenta para la
                  playlist.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

