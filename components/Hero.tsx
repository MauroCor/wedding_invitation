import BeeLottie from "./BeeLottie";

export default function Hero() {
  return (
    <section className="hero relative" id="inicio">
      <div
        className="absolute top-20 left-[10%] w-16 h-16 opacity-90 pointer-events-none"
        aria-hidden
      >
        <BeeLottie />
      </div>
      <div
        className="absolute top-24 right-[10%] w-14 h-14 opacity-90 pointer-events-none"
        aria-hidden
      >
        <BeeLottie />
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center w-full max-w-md mx-auto h-[40%] top-[18%] opacity-70 pointer-events-none"
        aria-hidden
      >
        <BeeLottie src="/lottie/2 bees are flying in the background..json" className="w-full h-full" />
      </div>
      <div className="hero-content relative z-10">
        <h1 className="hero-title script-font">Nabila &amp; Mauro</h1>
        <p className="hero-subtitle hero-subtitle-secondary">LLEGÓ EL DÍA</p>
      </div>
      <div className="scroll-indicator" aria-hidden="true">
        <span className="chevron chevron-down" />
      </div>
    </section>
  );
}

