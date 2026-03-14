"use client";

import { FormEvent, useState } from "react";

export default function RsvpSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log("Datos del RSVP:", data);
    setSent(true);
  };

  return (
    <section className="rsvp" id="rsvp">
      <div className="container">
        <h2 className="section-title">Confirma tu Asistencia</h2>
        <p className="rsvp-subtitle">
          Por favor, confirma tu asistencia antes del 1 de marzo de 2027.
          <br />
          <strong>Evento exclusivo para mayores de edad.</strong>
        </p>
        {!sent ? (
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="guests">Número de invitados</label>
              <input
                type="number"
                id="guests"
                name="guests"
                min={1}
                max={10}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="attendance">¿Asistirás?</label>
              <select id="attendance" name="attendance" required>
                <option value="">Selecciona una opción</option>
                <option value="yes">Sí, con mucho gusto</option>
                <option value="no">Lamentablemente no podré asistir</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje (opcional)</label>
              <textarea id="message" name="message" rows={4} />
            </div>
            <button type="submit" className="btn-submit">
              Enviar confirmación
            </button>
          </form>
        ) : (
          <div className="rsvp-success">
            <p>
              ¡Gracias por confirmar tu asistencia! Te esperamos en nuestro día
              especial.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

