"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile: {
      ready: (callback: () => void) => void;
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: (error: string) => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
          appearance?: "always" | "execute" | "interaction-only";
          "refresh-timeout"?: "auto" | "manual" | "never";
          "refresh-expired"?: "auto" | "manual" | "never";
          retry?: "auto" | "never";
          execution?: "render" | "execute";
        }
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
      isExpired: (widgetId: string) => boolean;
      execute: (container: string | HTMLElement) => void;
    };
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
      return;
    }
    console.log("siteKey", sitekey);
    if (!containerRef.current || !window.turnstile || !sitekey) {
      console.log("Turnstile not rendered");
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
    if (!isScriptLoaded) return;
    console.log("isScriptLoaded", isScriptLoaded);
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
      strategy="lazyOnload"
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}
