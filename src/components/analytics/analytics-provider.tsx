"use client";

import {
  getStoredConsent,
  hasValidConsent,
  initializeConsent,
  type ConsentState,
} from "@/lib/analytics";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { Dictionary } from "@/lib/i18n/types";

// Analytics Context
interface AnalyticsContextType {
  consent: ConsentState | null;
  hasConsent: boolean;
  isGoogleAnalyticsEnabled: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  consent: null,
  hasConsent: false,
  isGoogleAnalyticsEnabled: false,
});

// Provider Props
interface AnalyticsProviderProps {
  children: ReactNode;
  dictionary: Dictionary;
  ga4MeasurementId: string;
  gtmId: string;
}

export function AnalyticsProvider({
  children,
  ga4MeasurementId,
  gtmId,
}: AnalyticsProviderProps) {
  const consent = getStoredConsent();
  const hasConsent = hasValidConsent();
  const isGoogleAnalyticsEnabled = consent?.analytics === true;

  // 초기 동의 설정
  useEffect(() => {
    initializeConsent();
  }, []);

  const contextValue: AnalyticsContextType = {
    consent,
    hasConsent,
    isGoogleAnalyticsEnabled,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {/* Next.js 공식 Google Analytics 4 - 동의된 경우에만 로드 */}
      <GoogleAnalytics gaId={ga4MeasurementId} />
      <GoogleTagManager gtmId={gtmId} />
      {/* 쿠키 동의 관리 */}
      {/* <CookieConsent dictionary={dictionary.privacy.cookieConsent} /> */}
      {children}
    </AnalyticsContext.Provider>
  );
}

// Context Hook
export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error(
      "useAnalyticsContext must be used within AnalyticsProvider"
    );
  }
  return context;
};
