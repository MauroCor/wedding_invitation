"use client";

type EntryOverlayProps = {
  onEnter: () => void;
  visible: boolean;
};

export default function EntryOverlay({ onEnter, visible }: EntryOverlayProps) {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onEnter}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center gap-4 bg-background text-foreground cursor-pointer border-0 outline-none focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:ring-offset-2"
      style={{
        backgroundImage: "repeating-linear-gradient(90deg, transparent 0, transparent 50px, rgba(201, 189, 167, 0.3) 50px, rgba(201, 189, 167, 0.3) 51px)",
      }}
      aria-label="Entrar a la invitación"
    >
      <span className="script-font text-4xl font-bold text-(--primary-color)">
        Nabila & Mauro
      </span>
      <span className="text-sm uppercase tracking-[0.3em] text-(--primary-color)">
        Toca para entrar
      </span>
    </button>
  );
}
