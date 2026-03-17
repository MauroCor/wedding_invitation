 "use client";

import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type FullscreenOverlayProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  backdropClassName?: string;
  contentClassName?: string;
};

export default function FullscreenOverlay({
  open,
  onClose,
  children,
  backdropClassName = "",
  contentClassName = "",
}: FullscreenOverlayProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-10000 flex items-center justify-center bg-black/80 ${backdropClassName}`}
      onClick={onClose}
    >
      <div className={contentClassName}>{children}</div>
    </div>,
    document.body
  );
}


