import BeeLottie from "./BeeLottie";

export default function Hero() {
  return (
    <section className="hero relative w-full h-screen flex items-center justify-center" id="inicio">
      {/* Background Image */}
      <img
        src="/h-gallery/IMG_INIT.JPG"
        alt="Portada de boda"
        className="absolute inset-0 w-full h-full object-cover object-bottom -z-10"
      />
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 -z-5"
        aria-hidden
      />

      {/* Animated Bees Background */}
      <div
        className="absolute top-6 right-6 w-52 md:w-72 opacity-100 pointer-events-none"
        style={{ transform: "rotate(40deg)" }}
        aria-hidden
      >
        <BeeLottie src="/lottie/two-bees.json" className="w-full h-full" />
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 -mt-140 md:mt-120 flex flex-col items-start justify-center px-4 pl-10 md:pl-20"
        style={{ transform: "rotate(-8deg)" }}
      >
        <div className="animate-fade-in" style={{ animationDuration: "1s" }}>
          {/* Nabila */}
          <div className="flex items-baseline">
            <span
              className="text-7xl md:text-9xl font-light"
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: "#fff4dc",
                transform: "translateY(2px)",
                textShadow: "0 3px 10px rgba(0,0,0,0.6)",
                lineHeight: "0.80",
              }}
            >
              N
            </span>

            <span
              className="text-6xl md:text-8xl font-light"
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: "#fff4dc",
                textShadow: "0 3px 10px rgba(0,0,0,0.6)",
                marginLeft: "-0.1em",
                lineHeight: "0.80",
              }}
            >
              abila
            </span>
          </div>

          {/* y */}
          <p
            className="text-3xl md:text-4xl font-light"
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              color: "#fff4dc",
              marginLeft: "1.8em",
              textShadow: "0 3px 10px rgba(0,0,0,0.6)",
              marginTop: "-0.4em",
              marginBottom: "-0.4em",
            }}
          >
            y
          </p>

          {/* Mauro */}
          <div
            className="flex items-baseline"
            style={{
              marginLeft: "3em",
            }}
          >
            <span
              className="text-7xl md:text-9xl font-light"
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: "#fff4dc",
                transform: "translateY(2px)",
                textShadow: "0 3px 10px rgba(0,0,0,0.6)",
                lineHeight: "0.80",
              }}
            >
              M
            </span>

            <span
              className="text-6xl md:text-8xl font-light"
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: "#fff4dc",
                textShadow: "0 3px 10px rgba(0,0,0,0.6)",
                marginLeft: "-0.1em",
                lineHeight: "0.80",
              }}
            >
              auro
            </span>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <span
          className="chevron chevron-down"
          style={{
            borderColor: "#e0e0c8",
          }}
        />
      </div>
    </section>
  );
}

