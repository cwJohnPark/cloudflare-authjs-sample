import { headers } from "next/headers";
import { Dictionary } from "./types";
import logger from "@/lib/logger";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  ko: () => import("./dictionaries/ko.json").then((module) => module.default),
  ja: () => import("./dictionaries/ja.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  zh: () => import("./dictionaries/zh.json").then((module) => module.default),
};

// 지원되는 로케일 타입
type SupportedLocale = keyof typeof dictionaries;

// Accept-Language 헤더에서 로케일 추출
async function getLocaleFromHeaders(): Promise<SupportedLocale> {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  logger.info("Accept-Language:", acceptLanguage);
  if (!acceptLanguage) {
    return "en"; // 기본값
  }

  // Parse Header 'Accept-Language'
  const locales = acceptLanguage
    .split(",")
    .map((lang) => {
      const [locale, q] = lang.trim().split(";");
      const quality = q ? parseFloat(q.split("=")[1]) : 1;
      return { locale: locale.toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { locale } of locales) {
    // Extract code (예: "ko-KR" -> "ko")
    const lang = locale.split("-")[0];
    if (lang in dictionaries) {
      return lang as SupportedLocale;
    }
  }

  return "en"; // 기본값
}

export const getDictionary = async (
  locale?: SupportedLocale
): Promise<Dictionary> => {
  try {
    // locale이 제공되지 않으면 헤더에서 가져오기
    const targetLocale = locale || (await getLocaleFromHeaders());

    // 유효한 로케일인지 확인
    if (!dictionaries[targetLocale]) {
      logger.warn(`Invalid locale: ${targetLocale}, falling back to English`);
      return await dictionaries.en();
    }

    // 해당 로케일의 dictionary 로드
    return await dictionaries[targetLocale]();
  } catch (error) {
    logger.error(`Failed to load dictionary for locale ${locale}:`, error);

    // 폴백으로 영어 dictionary 로드 시도
    try {
      return await dictionaries.en();
    } catch (fallbackError) {
      logger.error(
        "Failed to load fallback English dictionary:",
        fallbackError
      );
      throw new Error("Unable to load any dictionary");
    }
  }
};
