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
      <div className="hero-content relative z-10 flex flex-col items-center gap-6 w-full mt-24">
        <div className="relative inline-block">
          <h1
            className="hero-title script-font !text-5xl"
            style={{ color: "#789966" }}
          >
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
      </div>
      <div className="scroll-indicator flex flex-col items-center gap-16" aria-hidden="true">
        <p
          className="text-[0.8rem] font-bold md:text-xl tracking-[0.3em] uppercase"
          style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.3em", color: "#789966" }}
        >
         ¡ Nos casamos !
        </p>
        <span className="chevron chevron-down" />
      </div>
    </section>
  );
}

