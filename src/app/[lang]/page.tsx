import { auth } from "../auth";
import { getDictionary } from "../../../lib/dictionaries";
import { HomeClient } from "@/components/home-client";

type Props = {
  params: Promise<{ lang: "en" | "ko" | "ja" | "es" | "zh" }>;
};

export default async function Home({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const session = await auth();

  return <HomeClient dict={dict} session={session} />;
}
