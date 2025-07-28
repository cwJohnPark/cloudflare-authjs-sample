import { NextRequest } from "next/server";
import { i18n } from "@/lib/i18n/i18n-config";

export const getLocale = (request: NextRequest): string => {
  // 1. referer 헤더에서 사용자의 선호 언어 추론
  const referer = request.headers.get("referer");
  if (referer) {
    const url = new URL(referer);
    const pathname = url.pathname;
    const locale = pathname.split("/")[1];
    return locale;
  }

  // 2. Accept-Language 헤더에서 사용자의 선호 언어 추론
  const acceptLanguage = request.headers.get("accept-language");

  if (acceptLanguage) {
    // Accept-Language 헤더 파싱 (예: "ko-KR,ko;q=0.9,en;q=0.8" -> ["ko-KR", "ko", "en"])
    const languages = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim()) // quality 값 제거
      .map((lang) => lang.split("-")[0]) // 지역 코드 제거 (ko-KR -> ko)
      .filter((lang) => lang.length > 0);

    // 지원하는 로케일 중에서 매칭되는 첫 번째 언어 찾기
    for (const lang of languages) {
      const supportedLocale = i18n.locales.find((locale) => locale === lang);
      if (supportedLocale) {
        return supportedLocale;
      }
    }
  }

  // 2. Accept-Language에서 매칭되는 언어가 없으면 defaultLocale 사용
  return i18n.defaultLocale;
};
