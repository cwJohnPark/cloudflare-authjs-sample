"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface TurnstileScriptProps {
  onLoad?: () => void;
  onError?: () => void;
}

export function TurnstileScript({ onLoad, onError }: TurnstileScriptProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if turnstile is already loaded
    if (typeof window !== "undefined" && window.turnstile) {
      setScriptLoaded(true);
      onLoad?.();
    }
  }, [onLoad]);

  if (scriptLoaded) {
    return null;
  }

  return (
    <Script
      src="https://challenges.cloudflare.com/turnstile/v0/api.js"
      strategy="lazyOnload"
      onLoad={() => {
        setScriptLoaded(true);
        onLoad?.();
      }}
      onError={() => {
        onError?.();
      }}
    />
  );
}
