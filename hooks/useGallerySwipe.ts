"use client";

import { useMemo, useRef, type TouchEvent } from "react";

/**
 * Deslizar horizontalmente sobre la foto en el overlay:
 * izquierda → siguiente, derecha → anterior (estilo galería móvil).
 */
export function useGallerySwipe(
  enabled: boolean,
  onSwipeNext: () => void,
  onSwipePrev: () => void,
  thresholdPx = 56
) {
  const nextRef = useRef(onSwipeNext);
  const prevRef = useRef(onSwipePrev);
  nextRef.current = onSwipeNext;
  prevRef.current = onSwipePrev;

  const startRef = useRef<{ x: number; y: number } | null>(null);

  return useMemo(
    () => ({
      onTouchStart: (e: TouchEvent) => {
        if (!enabled || e.touches.length !== 1) return;
        startRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      },
      onTouchEnd: (e: TouchEvent) => {
        if (!enabled || !startRef.current) return;
        const t = e.changedTouches[0];
        if (!t) {
          startRef.current = null;
          return;
        }
        const dx = t.clientX - startRef.current.x;
        const dy = t.clientY - startRef.current.y;
        startRef.current = null;
        if (Math.abs(dx) < thresholdPx || Math.abs(dx) <= Math.abs(dy)) return;
        if (dx < 0) nextRef.current();
        else prevRef.current();
      },
      onTouchCancel: () => {
        startRef.current = null;
      },
    }),
    [enabled, thresholdPx]
  );
}
