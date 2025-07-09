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
  const widgetIdRef = useRef<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  // Turnstile 위젯 렌더링 함수
  const renderTurnstile = useCallback(() => {
    console.log("siteKey", sitekey);
    if (!containerRef.current || !window.turnstile || !sitekey || isRendered) {
      console.log("Turnstile not rendered");
      return;
    }

    try {
      // 기존 위젯 정리
      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }

      // 새 위젯 렌더링
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
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

      if (widgetIdRef.current) {
        setIsRendered(true);
      }
    } catch (error) {
      console.error("Failed to render Turnstile:", error);
      onError?.("Failed to render Turnstile widget");
    }
  }, [
    sitekey,
    isRendered,
    theme,
    size,
    appearance,
    execution,
    retry,
    refreshExpired,
    refreshTimeout,
    onSuccess,
    onExpired,
    onError,
  ]);

  // 스크립트 로드 완료 후 렌더링
  useEffect(() => {
    if (!isScriptLoaded) return;

    renderTurnstile();
  }, [isScriptLoaded, renderTurnstile]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (error) {
          console.error("Failed to remove Turnstile widget:", error);
        }
      }
    };
  }, []);

  return (
    <>
      <TurnstileScript onLoad={() => setIsScriptLoaded(true)} />
      <div ref={containerRef} id="turnstile-container" />
    </>
  );
}

export function TurnstileScript({ onLoad }: { onLoad?: () => void }) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const handleLoad = () => {
    setScriptLoaded(true);
    onLoad?.();
    console.log("Turnstile script loaded");
  };

  const handleError = () => {
    console.error("Failed to load Turnstile script");
  };

  // 이미 로드된 경우 바로 콜백 호출
  useEffect(() => {
    if (typeof window !== "undefined" && window.turnstile && !scriptLoaded) {
      handleLoad();
    }
  }, [scriptLoaded]);

  return (
    <Script
      src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
      strategy="lazyOnload"
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}
