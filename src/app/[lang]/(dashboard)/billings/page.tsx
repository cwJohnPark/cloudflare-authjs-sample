import { LangProps } from "@/app/[lang]/layout";
import { getUserSubscriptions } from "@/app/api/payments/subscriptions/service";
import { auth } from "@/app/auth/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { redirect } from "next/navigation";
import { SubscriptionsList } from "@/components/payments/subscriptions-list";

export default async function BillingsPage({ params }: LangProps) {
  const { lang } = await params;
  const session = await auth();

  // 세션에서 User ID를 가져와서 없으면 /pricing 페이지로 이동
  if (!session?.user?.id) {
    redirect(`/${lang}/pricing`);
  }

  const dict = await getDictionary(lang);
  const subscriptions = await getUserSubscriptions(session.user.id);

  // active한 subscription만 필터링
  const activeSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.status === "active" && !subscription.cancelled
  );

  return (
    <main className="flex flex-col gap-4 p-6">
      <SubscriptionsList
        dictionary={dict}
        subscriptions={activeSubscriptions}
      />
    </main>
  );
}
