import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { auth } from "../auth";
import { SessionProvider } from "@/components/session/provider";
import { notFound } from "next/navigation";
import { i18n } from "../../../i18n-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aioneers",
  description: "Cloudflare Workers Sample App",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;

  // 유효한 로케일인지 확인
  if (!i18n.locales.includes(lang as typeof i18n.locales[number])) {
    notFound();
  }

  const session = await auth();

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider value={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
