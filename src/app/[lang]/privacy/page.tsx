import { Metadata } from "next";
import { notFound } from "next/navigation";
import { i18n } from "@/lib/i18n/i18n-config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Privacy Policy - Aioneers",
    description: "Privacy policy for Aioneers services",
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { lang } = await params;

  // 유효한 로케일인지 확인
  if (!i18n.locales.includes(lang as (typeof i18n.locales)[number])) {
    notFound();
  }

  const dict = await getDictionary(lang as "en" | "ko" | "ja" | "es" | "zh");
  const { policy } = dict.privacy;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h1>{policy.title}</h1>
        <p className="text-sm text-muted-foreground">{policy.lastUpdated}</p>

        <section className="mt-8">
          <h2>{policy.sections.intro.title}</h2>
          <p>{policy.sections.intro.content}</p>
        </section>

        <section className="mt-8">
          <h2>{policy.sections.dataCollection.title}</h2>
          <p>{policy.sections.dataCollection.content}</p>
        </section>

        <section className="mt-8">
          <h2>{policy.sections.dataUsage.title}</h2>
          <p>{policy.sections.dataUsage.content}</p>
        </section>

        <section className="mt-8">
          <h2>{policy.sections.dataSecurity.title}</h2>
          <p>{policy.sections.dataSecurity.content}</p>
        </section>

        <section className="mt-8">
          <h2>{policy.sections.cookies.title}</h2>
          <p>{policy.sections.cookies.content}</p>
        </section>

        <section className="mt-8">
          <h2>{policy.sections.yourRights.title}</h2>
          <p>{policy.sections.yourRights.content}</p>
        </section>

        <section className="mt-8">
          <h2>{policy.sections.contact.title}</h2>
          <p>{policy.sections.contact.content}</p>
        </section>
      </div>
    </div>
  );
}
