"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export type MusicToggleHandle = { startMusic: () => void };

type MusicToggleProps = {
  hidden: boolean;
};

const MusicToggle = forwardRef<MusicToggleHandle, MusicToggleProps>(function MusicToggle(
  { hidden },
  ref,
) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startMusicRef = useRef<() => void>(() => {});
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/audio/boda.mp3");
    if (audioRef.current) {
      audioRef.current.loop = true;
    }

    const startMusic = () => {
      if (!audioRef.current || !audioRef.current.paused) return;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    };
    startMusicRef.current = startMusic;

    const handleFirstInteraction = () => {
      startMusic();
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    startMusic: () => startMusicRef.current?.(),
  }), []);

  const toggleMusic = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Ignorar errores de reproducción manual
        });
    }
  };

  const statusClass = hidden ? "" : isPlaying ? "active" : "paused opacity-70";

  return (
    <button
      className={`music-toggle fixed top-5 right-5 z-10000 w-[45px] h-[45px] rounded-full flex items-center justify-center border-0 cursor-pointer shadow-[0_6px_16px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_10px_24px_rgba(0,0,0,0.2)] active:translate-y-0 active:scale-[0.97] ${
        statusClass
      } ${hidden ? "opacity-0 pointer-events-none" : ""}`}
      style={{ background: "var(--primary-color)", color: "var(--white)" }}
      aria-label="Control de música"
      onClick={toggleMusic}
      type="button"
    >
      <span className="music-icon inline-flex items-center justify-center">
        {/* Estado activo: bocina sonando (volumen ON) */}
        <svg
          className="icon-music icon-music-playing w-[22px] h-[22px] shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* cuerpo del altavoz */}
          <path
            d="M4 9H7L11 5V19L7 15H4V9Z"
            fill="currentColor"
          />
          {/* ondas de sonido */}
          <path
            d="M15 9.5C15.8 10.3 16.25 11.1 16.25 12C16.25 12.9 15.8 13.7 15 14.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M17.5 7.5C18.8 8.8 19.5 10.3 19.5 12C19.5 13.7 18.8 15.2 17.5 16.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>

        {/* Estado inactivo: bocina muteada (volumen OFF) */}
        <svg
          className="icon-music icon-music-muted w-[22px] h-[22px] shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* cuerpo del altavoz */}
          <path
            d="M4 9H7L11 5V19L7 15H4V9Z"
            fill="currentColor"
          />
          {/* aspa de mute */}
          <path
            d="M16 9L20 13M20 9L16 13"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </button>
  );
});

export default MusicToggle;

