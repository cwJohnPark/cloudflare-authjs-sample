import { AnalyticsProvider } from "@/components/providers/analytics-provider";
import { SessionProvider } from "@/components/session/provider";
import { StructuredData } from "@/components/structured-data";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { i18n } from "../../../i18n-config";
import { getDictionary } from "../../../lib/dictionaries";
import { auth } from "../auth";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = generateSEOMetadata({
  title: "Aioneers - Cloudflare Workers Sample App",
  description:
    "Advanced Cloudflare Workers sample application with Next.js, Auth.js, and internationalization support.",
  keywords: [
    "Cloudflare Workers",
    "Next.js",
    "Auth.js",
    "Internationalization",
    "React",
    "TypeScript",
  ],
  openGraph: {
    title: "Aioneers - Cloudflare Workers Sample App",
    description:
      "Advanced Cloudflare Workers sample application with Next.js, Auth.js, and internationalization support.",
    type: "website",
  },
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "ko" | "ja" | "es" | "zh");

  // 유효한 로케일인지 확인
  if (!i18n.locales.includes(lang as (typeof i18n.locales)[number])) {
    notFound();
  }

  const session = await auth();

  return (
    <html lang={lang}>
      <head>
        <StructuredData type="WebSite" dict={dict} />
        <StructuredData type="Organization" dict={dict} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider value={session}>
          <AnalyticsProvider
            dictionary={dict}
            ga4MeasurementId={process.env.GA4_MEASUREMENT_ID!}
            gtmId={process.env.GTM_ID!}
          >
            {children}
          </AnalyticsProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
