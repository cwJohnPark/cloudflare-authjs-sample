"use client";

import Script from "next/script";
import { useEffect } from "react";
import type { LemonEvent } from "@/types/lemon";

interface LemonScriptProps {
  eventHandler?: (event: LemonEvent) => void;
}

export function LemonScript({ eventHandler }: LemonScriptProps = {}) {
  useEffect(() => {
    // Lemon.js가 로드된 후 Setup 호출
    if (typeof window !== "undefined" && window.Lemon) {
      window.Lemon.Setup({
        eventHandler,
      });
    }
  }, [eventHandler]);

  const handleLoad = () => {
    // 스크립트 로드 완료 후 Setup 호출
    if (typeof window !== "undefined" && window.Lemon) {
      window.Lemon.Setup({
        eventHandler,
      });
    }
  };

  return (
    <Script
      src="https://app.lemonsqueezy.com/js/lemon.js"
      strategy="afterInteractive"
      onLoad={handleLoad}
    />
  );
}
