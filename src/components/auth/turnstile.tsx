"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile: {
      render: (container: string | HTMLElement, options: unknown) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

interface TurnstileProps {
  sitekey: string;
  onSuccess?: (token: string) => void;
  onError?: (error: string) => void;
  onExpired?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "flexible";
  appearance?: "always" | "execute" | "interaction-only";
  execution?: "render" | "execute";
  retry?: "auto" | "never";
  refreshExpired?: "auto" | "manual" | "never";
  refreshTimeout?: "auto" | "manual" | "never";
}

export function Turnstile({
  sitekey,
  onSuccess,
  onError,
  onExpired,
  theme = "auto",
  size = "normal",
  appearance = "always",
  execution = "render",
  retry = "auto",
  refreshExpired = "auto",
  refreshTimeout = "auto",
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  const renderTurnstile = useCallback(() => {
    if (isRendered) {
      console.log("Turnstile already rendered");
      return;
    }
    console.log("Rendering Turnstile");
    console.log("siteKey", sitekey);
    if (!containerRef.current || !window.turnstile || !sitekey) {
      console.log("cannot render Turnstile");
      return;
    }

    try {
      // 새 위젯 렌더링
      window.turnstile.render(containerRef.current, {
        sitekey,
        callback: (token: string) => {
          console.log("Turnstile success:", token);
          onSuccess?.(token);
        },
        "expired-callback": () => {
          console.log("Turnstile expired");
          onExpired?.();
        },
        "error-callback": (error: string) => {
          console.error("Turnstile error:", error);
          onError?.(error);
        },

        theme,
        size,
        appearance,
        execution,
        retry,
        "refresh-expired": refreshExpired,
        "refresh-timeout": refreshTimeout,
      });
      console.log("Turnstile rendered");
      setIsRendered(true);

      return () => {
        if (containerRef.current) {
          window.turnstile.remove(containerRef.current.id);
          setIsRendered(false);
        }
      };
    } catch (error) {
      console.error("Failed to render Turnstile:", error);
      onError?.("Failed to render Turnstile widget");
    }
  }, [
    sitekey,
    isRendered,
    onSuccess,
    onError,
    onExpired,
    theme,
    size,
    appearance,
    execution,
    retry,
    refreshExpired,
    refreshTimeout,
  ]);

  useEffect(() => {
    if (!isScriptLoaded) {
      console.log("Script not loaded yet");
      return;
    }
    console.log("Script loaded");
    renderTurnstile();
  }, [isScriptLoaded, renderTurnstile]);

  return (
    <>
      <TurnstileScript onLoad={() => setIsScriptLoaded(true)} />
      <div ref={containerRef} id="turnstile-container" />
    </>
  );
}

export function TurnstileScript({ onLoad }: { onLoad?: () => void }) {
  const handleLoad = () => {
    onLoad?.();
    console.log("Turnstile script loaded");
  };

  const handleError = () => {
    console.error("Failed to load Turnstile script");
  };

  return (
    <Script
      src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}
