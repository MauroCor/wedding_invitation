export default function FooterSection() {
  return (
    <footer
      className="footer relative z-50 border-t border-white/80 shadow-[0_-24px_52px_rgba(0,0,0,0.55)] py-2 text-center text-white"
      style={{ backgroundColor: "#5f7d4e" }}
    >
      <div className="container">
        <p>Con amor, Nabila &amp; Mauro.</p>
        <p className="footer-date">02 de abril, 2027</p>
        <p className="mt-1 text-sm text-white/75">
          Desarrollado por{" "}
          <a
            href="https://maurocor.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fff4dc] hover:text-white transition-colors underline"
          >
            maurocor
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

