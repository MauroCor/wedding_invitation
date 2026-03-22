"use client";

import { useEffect, useRef, useState } from "react";

type EntryOverlayProps = {
  onEnter: () => void;
  onMusicStart?: () => void;
  visible: boolean;
};

export default function EntryOverlay({ onEnter, onMusicStart, visible }: EntryOverlayProps) {
  const [hasStartedVideo, setHasStartedVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Bloquear scroll mientras la pantalla de inicio está visible
  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [visible]);

  // Detectar si es mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    setIsHydrated(true);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (!visible) return null;

  if (!isHydrated) {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background overflow-hidden" style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent 0, transparent 50px, rgba(201, 189, 167, 0.3) 50px, rgba(201, 189, 167, 0.3) 51px)",
      }}>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-text/20 border-t-text rounded-full animate-spin" />
          <p className="text-text/60 text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  const handleClick = () => {
    if (hasStartedVideo) return;
    setHasStartedVideo(true);
    
    // Inicia la música INMEDIATAMENTE en el contexto de la interacción del usuario
    onMusicStart?.();
    
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignorar errores de reproducción automáticos
      });
    }
  };

  const handleVideoEnd = () => {
    onEnter();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-background text-foreground cursor-pointer border-0 outline-none focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:ring-offset-2 overflow-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent 0, transparent 50px, rgba(201, 189, 167, 0.3) 50px, rgba(201, 189, 167, 0.3) 51px)",
      }}
      aria-label="Entrar a la invitación"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-[50%_80%] md:object-center"
        src={isMobile ? "/envelop/envelop-sm.mp4" : "/envelop/envelop-md.mp4"}
        preload="auto"
        poster={isMobile ? "/envelop/envelop-sm.png" : "/envelop/envelop-md.png"}
        playsInline
        muted
        onEnded={handleVideoEnd}
      />

      {!hasStartedVideo && (
        <div className="relative z-10 flex flex-col items-center justify-center gap-4 mt-128 md:mt-180">
          <span
            className="text-sm uppercase tracking-[0.3em] text-black"
            style={{
              animation: "heartbeat 1.2s infinite",
            }}
          >
            Toca para abrir
          </span>
        </div>
      )}
    </button>
  );
}
