"use client";

import { useEffect, useRef, useState } from "react";

type EntryOverlayProps = {
  onEnter: () => void;
  visible: boolean;
};

export default function EntryOverlay({ onEnter, visible }: EntryOverlayProps) {
  const [hasStartedVideo, setHasStartedVideo] = useState(false);
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

  if (!visible) return null;

  const handleClick = () => {
    if (hasStartedVideo) return;
    setHasStartedVideo(true);
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
        src="/envelop.mp4"
        preload="auto"
        poster="/envelop-poster.png"
        playsInline
        muted
        onEnded={handleVideoEnd}
      />

      {!hasStartedVideo && (
        <div className="relative z-10 flex flex-col items-center justify-center gap-4 mt-[32rem]">
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
