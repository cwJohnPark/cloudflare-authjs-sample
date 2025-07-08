// Next.js 공식 @next/third-parties를 사용한 Analytics 유틸리티

// 개인정보보호 동의 상태
export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: number;
}

// GA 이벤트 타입
export interface GAEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

// 동의 관리 함수들
export const getStoredConsent = (): ConsentState | null => {
  if (typeof window === "undefined") return null;

  try {
    const consent = localStorage.getItem("cookie-consent");
    return consent ? JSON.parse(consent) : null;
  } catch {
    return null;
  }
};

export const storeConsent = (consent: ConsentState) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("cookie-consent", JSON.stringify(consent));

  // Google Analytics 동의 설정 (gtag는 @next/third-parties에서 자동 처리)
  if (typeof window.gtag !== "undefined") {
    window.gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      functionality_storage: consent.functional ? "granted" : "denied",
    });
  }
};

export const hasValidConsent = (): boolean => {
  const consent = getStoredConsent();
  if (!consent) return false;

  // 30일 후 만료
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  return consent.timestamp > thirtyDaysAgo;
};

// GDPR/CCPA 지역 감지
export const isGDPRRegion = (): boolean => {
  if (typeof window === "undefined") return false;

  // 시간대 기반 추정 (정확하지 않지만 기본 구현)
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const europeanTimezones =
    timezone.includes("Europe/") || timezone.includes("GMT");

  return europeanTimezones;
};

export const isCCPARegion = (): boolean => {
  if (typeof window === "undefined") return false;

  // 캘리포니아 시간대 기반 추정
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    timezone.includes("America/Los_Angeles") ||
    timezone.includes("PST") ||
    timezone.includes("PDT")
  );
};

// Analytics 활성화 여부 확인
export const isAnalyticsEnabled = (): boolean => {
  const consent = getStoredConsent();
  return consent?.analytics === true;
};

// 초기 동의 설정
export const initializeConsent = () => {
  if (typeof window === "undefined") return;

  const consent = getStoredConsent();
  if (!consent) return;

  // 초기 consent 설정
  if (typeof window.gtag !== "undefined") {
    window.gtag("consent", "default", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      functionality_storage: consent.functional ? "granted" : "denied",
    });
  }
};
