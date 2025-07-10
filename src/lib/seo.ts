import { Metadata } from "next";
import { Dictionary } from "./i18n/types";

export type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: "website" | "article";
  };
  twitter?: {
    card?: "summary" | "summary_large_image";
    title?: string;
    description?: string;
    image?: string;
  };
  canonical?: string;
  locale?: string;
  alternates?: {
    languages?: Record<string, string>;
  };
};

const defaultSEO: SEOProps = {
  title: "Aioneers - Cloudflare Workers Sample App",
  description:
    "Advanced Cloudflare Workers sample application with Next.js, Auth.js, and internationalization support.",
  keywords: ["Cloudflare Workers", "Next.js", "Auth.js", "i18n", "React"],
  openGraph: {
    title: "Aioneers - Cloudflare Workers Sample App",
    description:
      "Advanced Cloudflare Workers sample application with Next.js, Auth.js, and internationalization support.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export function generateMetadata(props: SEOProps = {}): Metadata {
  const seo = { ...defaultSEO, ...props };

  const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: "Aioneers" }],
    creator: "Aioneers",
    publisher: "Aioneers",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  };

  // Open Graph
  if (seo.openGraph) {
    metadata.openGraph = {
      title: seo.openGraph.title || seo.title,
      description: seo.openGraph.description || seo.description,
      type: seo.openGraph.type || "website",
      locale: seo.locale || "en",
      siteName: "Aioneers",
      ...(seo.openGraph.image && { images: [seo.openGraph.image] }),
      ...(seo.openGraph.url && { url: seo.openGraph.url }),
    };
  }

  // Twitter
  if (seo.twitter) {
    metadata.twitter = {
      card: seo.twitter.card || "summary_large_image",
      title: seo.twitter.title || seo.title,
      description: seo.twitter.description || seo.description,
      creator: "@aioneers",
      ...(seo.twitter.image && { images: [seo.twitter.image] }),
    };
  }

  // Canonical URL
  if (seo.canonical) {
    metadata.alternates = {
      canonical: seo.canonical,
      ...seo.alternates,
    };
  } else if (seo.alternates) {
    metadata.alternates = seo.alternates;
  }

  return metadata;
}

export function generateMetadataFromDictionary(
  dict: Dictionary,
  page: "home" | "dashboard" | "auth" | "account",
  lang: string,
  path: string = "/"
): Metadata {
  const pageData = dict.seo.pages[page];

  return generateMetadata({
    title: pageData.title,
    description: pageData.description,
    keywords: dict.seo.keywords,
    canonical: getCanonicalUrl(lang, path),
    locale: lang,
    alternates: {
      languages: generateAlternateLanguages(lang, path),
    },
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      type: "website",
      url: getCanonicalUrl(lang, path),
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.title,
      description: pageData.description,
    },
  });
}

export function generateAlternateLanguages(
  currentLang: string,
  path: string = "/"
): Record<string, string> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const languages = ["en", "ko", "ja", "es", "zh"];

  const alternates: Record<string, string> = {};

  languages.forEach((lang) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    alternates[lang] = `${baseUrl}/${lang}${
      cleanPath === "/" ? "" : cleanPath
    }`;
  });

  return alternates;
}

export function getCanonicalUrl(lang: string, path: string = "/"): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}/${lang}${cleanPath === "/" ? "" : cleanPath}`;
}

export function generateStructuredData(
  type: "WebSite" | "WebPage" | "Organization",
  data?: Dictionary
) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;

  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type,
  };

  switch (type) {
    case "WebSite":
      return {
        ...baseStructuredData,
        name: data?.seo?.siteName || "Aioneers",
        url: baseUrl,
        description:
          data?.seo?.siteDescription ||
          "Advanced Cloudflare Workers sample application",
        inLanguage: ["en", "ko", "ja", "es", "zh"],
      };

    case "WebPage":
      return {
        ...baseStructuredData,
        name: data?.seo?.structuredData?.name || "Aioneers",
        url: data?.seo?.structuredData?.url || baseUrl,
        description:
          data?.seo?.structuredData?.description ||
          "Advanced Cloudflare Workers sample application",
        inLanguage: data?.seo?.structuredData?.inLanguage || "en",
        isPartOf: {
          "@type": "WebSite",
          name: data?.seo?.siteName || "Aioneers",
          url: baseUrl,
        },
      };

    case "Organization":
      return {
        ...baseStructuredData,
        name: data?.seo?.siteName || "Aioneers",
        url: baseUrl,
        description:
          data?.seo?.siteDescription ||
          "Technology company specializing in cloud-native applications",
      };

    default:
      return baseStructuredData;
  }
}
