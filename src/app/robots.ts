import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/en/", "/ko/", "/ja/", "/es/", "/zh/"],
        disallow: ["/api/", "/_next/", "/private/", "/admin/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/en/", "/ko/", "/ja/", "/es/", "/zh/"],
        disallow: ["/api/", "/_next/", "/private/", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
