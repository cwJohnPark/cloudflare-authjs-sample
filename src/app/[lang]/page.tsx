import { auth } from "@/app/auth/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { HomeClient } from "@/components/home-client";

export type LangProps = {
  params: Promise<{ lang: "en" | "ko" | "ja" | "es" | "zh" }>;
};

export default async function Home({ params }: LangProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const session = await auth();

  return <HomeClient dict={dict} session={session} />;
}
