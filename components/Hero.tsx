import BeeLottie from "./BeeLottie";

export default function Hero() {
  return (
    <section className="hero relative" id="inicio">
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
        <div className="relative inline-block">
          <h1 className="hero-title script-font" style={{ color: "#5d7a71" }}>
            Nabila &amp; Mauro
          </h1>
          <div
            className="pointer-events-none -z-1 absolute top-1 -right-5 w-10 h-10 md:top-3 md:-right-6 md:w-15 md:h-15"
            style={{ clipPath: "inset(0 0 50% 0)" }}
            aria-hidden
          >
            <BeeLottie className="w-full h-full" />
          </div>
        </div>
        <p className="hero-subtitle hero-subtitle-secondary" style={{ color: "#5d7a71" }}>LLEGÓ EL DÍA</p>
      </div>
      <div className="scroll-indicator" aria-hidden="true">
        <span className="chevron chevron-down" />
      </div>
    </section>
  );
}

