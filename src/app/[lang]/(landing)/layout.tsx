import { getDictionary } from "@/lib/i18n/dictionaries";
import { Header } from "./components/header";
import { LangProps } from "@/app/[lang]/layout";
import { auth } from "@/app/auth/config";

export default async function LandingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
} & LangProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const session = await auth();

  return (
    <>
      <Header dictionary={dictionary} session={session} />
      <main>{children}</main>
    </>
  );
}
