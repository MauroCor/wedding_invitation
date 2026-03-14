"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const DEFAULT_BEE_SRC = "/lottie/BEE-lieve.json";

function encodedLottieUrl(path: string): string {
  const parts = path.split("/");
  const file = parts.pop();
  return file ? [...parts, encodeURIComponent(file)].join("/") : path;
}

export default function BeeLottie({
  src = DEFAULT_BEE_SRC,
  className = "",
  style = {},
}: {
  src?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch(encodedLottieUrl(src))
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, [src]);

  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      loop
      className={className}
      style={style}
      aria-hidden
    />
  );
}
