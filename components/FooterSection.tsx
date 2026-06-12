export default function FooterSection() {
  return (
    <footer
      className="footer relative z-50 border-t border-white/80 shadow-[0_-24px_52px_rgba(0,0,0,0.55)] py-2 text-center text-white"
      style={{ backgroundColor: "#5f7d4e" }}
    >
      <p className="mt-0.5 leading-tight text-white/85">
        © 02-04-2027 Nabila & Mauro por{" "}
        <a
          href="https://proyectito.s.gy/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#c5ebff] underline decoration-[#c5ebff]/40 underline-offset-2 transition hover:text-[#e3f5ff] hover:decoration-[#c5ebff]/65"
        >
          Proyectito
        </a>.
      </p>
    </footer>
  );
}