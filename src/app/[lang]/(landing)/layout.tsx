import { getDictionary } from "@/lib/i18n/dictionaries";
import { Header } from "./components/header";
import { LangProps } from "@/app/[lang]/layout";

export default async function LandingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
} & LangProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-background">
      <Header dictionary={dictionary} />
      <main className="page-transition">{children}</main>
    </div>
  );
}
