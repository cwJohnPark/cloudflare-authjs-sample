import { auth } from "../../auth";
import { getDictionary } from "../../../../lib/dictionaries";
import { redirect } from "next/navigation";
import { AccountClient } from "../../../components/account-client";

type Props = {
  params: Promise<{ lang: "en" | "ko" | "ja" | "es" | "zh" }>;
};

export default async function AccountPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const session = await auth();

  if (!session) {
    redirect(`/${lang}/auth`);
  }

  return <AccountClient dict={dict} session={session} />;
}
