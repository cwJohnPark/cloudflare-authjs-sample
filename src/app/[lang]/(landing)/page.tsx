import LandingMain from "@/app/[lang]/(landing)/components/landing-main";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { LangProps } from "@/app/[lang]/layout";

export default async function Home({ params }: LangProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <LandingMain dictionary={dictionary} />;
}
