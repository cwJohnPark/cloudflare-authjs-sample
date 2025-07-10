import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { AccountClient } from "@/app/[lang]/(dashboard)/account/components/account-client";
import { auth } from "@/app/auth/config";
import { LangProps } from "@/app/[lang]/page";
import { SiteHeader } from "@/components/site-header";
import { drizzleAdapter } from "@/lib/db/context";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function AccountPage({ params }: LangProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const session = await auth();
  const siteTitle = dict.account.title;

  if (!session?.user?.id) {
    redirect(`/${lang}/auth`);
  }

  // 서버에서 직접 사용자 정보 가져오기
  const userResults = await getUser(session.user.id);

  if (!userResults.length) {
    redirect(`/${lang}/auth`);
  }

  const user = userResults[0];

  return (
    <>
      <SiteHeader title={siteTitle} />
      <AccountClient dict={dict} user={user} />
    </>
  );
}

const getUser = async (id: string) => {
  const drizzleDb = await drizzleAdapter();
  const userResult = await drizzleDb
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  return userResult;
};