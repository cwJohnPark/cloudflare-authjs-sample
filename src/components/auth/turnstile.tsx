"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: (error: string) => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact";
          appearance?: "always" | "execute" | "interaction-only";
          "refresh-timeout"?: "auto" | "manual";
        }
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
    };
  }
}

interface TurnstileProps {
  sitekey: string;
  onSuccess?: (token: string) => void;
  onError?: (error: string) => void;
  onExpired?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
  appearance?: "always" | "execute" | "interaction-only";
}

export function Turnstile({
  sitekey,
  onSuccess,
  onError,
  onExpired,
  theme = "auto",
  size = "normal",
  appearance = "always",
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !window.turnstile) return;

    // Clean up existing widget
    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
    }

    // Render new widget
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey,
      callback: onSuccess,
      "expired-callback": onExpired,
      "error-callback": onError,
      theme,
      size,
      appearance,
      "refresh-timeout": "manual",
    });

    return () => {
      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [sitekey, onSuccess, onError, onExpired, theme, size, appearance]);

  return <div ref={containerRef} />;
}
