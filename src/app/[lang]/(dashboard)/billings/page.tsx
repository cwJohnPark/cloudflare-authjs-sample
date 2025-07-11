import { LangProps } from "@/app/[lang]/layout";
import { redirect } from "next/navigation";

export default async function PaymentsPage({ params }: LangProps) {
  const { lang } = await params;
  redirect(`/${lang}/pricing`);
}
