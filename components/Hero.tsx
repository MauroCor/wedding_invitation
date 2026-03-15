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
      <div className="hero-content relative z-10 flex flex-col items-center gap-4 w-full">
        <div className="flex items-center gap-4 w-full max-w-sm">
          <span className="flex-1 h-px shrink-0" style={{ backgroundColor: "rgba(93, 122, 113, 0.5)" }} aria-hidden />
          <p
            className="text-xs tracking-[0.3em] uppercase shrink-0"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.3em", color: "#5d7a71" }}
          >
            Nos casamos
          </p>
          <span className="flex-1 h-px shrink-0" style={{ backgroundColor: "rgba(93, 122, 113, 0.5)" }} aria-hidden />
        </div>
        <h1 className="hero-title script-font" style={{ color: "#5d7a71" }}>Nabila &amp; Mauro</h1>
        <p className="hero-subtitle hero-subtitle-secondary" style={{ color: "#5d7a71" }}>LLEGÓ EL DÍA</p>
      </div>
      <div className="scroll-indicator" aria-hidden="true">
        <span className="chevron chevron-down" />
      </div>
    </section>
  );
}

