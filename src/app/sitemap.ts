import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const languages = ["en", "ko", "ja", "es", "zh"];
  const routes = ["", "/dashboard", "/auth", "/account"];

  const sitemap: MetadataRoute.Sitemap = [];

  // 각 언어와 경로 조합으로 URL 생성
  languages.forEach((lang) => {
    routes.forEach((route) => {
      // 기본 우선순위 설정
      let priority = 0.5;
      let changeFrequency:
        | "always"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "yearly"
        | "never" = "weekly";

      // 홈페이지는 높은 우선순위
      if (route === "") {
        priority = 1.0;
        changeFrequency = "daily";
      }
      // 대시보드는 중간 우선순위
      else if (route === "/dashboard") {
        priority = 0.8;
        changeFrequency = "daily";
      }
      // 인증 페이지는 낮은 우선순위
      else if (route === "/auth") {
        priority = 0.3;
        changeFrequency = "monthly";
      }
      // 계정 페이지는 중간 우선순위
      else if (route === "/account") {
        priority = 0.6;
        changeFrequency = "weekly";
      }

      sitemap.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: languages.reduce(
            (acc, altLang) => {
              acc[altLang] = `${baseUrl}/${altLang}${route}`;
              return acc;
            },
            {} as Record<string, string>
          ),
        },
      });
    });
  });

  return sitemap;
}
