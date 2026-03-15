import Image from "next/image";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=La+Cayetana+Río+Negro+4000+Córdoba+Argentina";

export default function LocationSection() {
  return (
    <section className="location" id="ubicacion">
      <div className="container">
        <h2 className="section-title">Lugar</h2>
        <div className="location-content !text-center">
          <div className="location-info text-center">
            <p>
              <strong>SALÓN LA CAYETANA</strong>
            </p>
            <p>Río Negro N° 4000, B° Los Olmos.</p>
          </div>
          <div className="flex justify-center mt-4">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white border border-neutral-200 shadow-sm hover:shadow-md hover:border-[#5d7a71]/30 transition-all text-[#2C3E50] font-medium"
            >
            <Image
              src="/maps-pin.png"
              alt=""
              width={20}
              height={20}
              className="shrink-0"
              aria-hidden
            />
            Ver ubicación
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
