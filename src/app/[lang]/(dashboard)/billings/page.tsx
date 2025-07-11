import { LangProps } from "@/app/[lang]/page";
import { getProductList } from "@/app/api/payments/products/client";
import { getUserSubscriptions } from "@/app/api/payments/subscriptions/service";
import { auth } from "@/app/auth/config";
import { BillingsList } from "@/components/payments/billing-list";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function PaymentsPage({ params }: LangProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const siteTitle = dict.navigation.billing;
  const products = await getProductList();

  const subscriptions = await getSubscriptions();

  return (
    <>
      <SiteHeader title={siteTitle} />
      <main className="flex flex-col gap-4 p-6">
        {subscriptions?.map((subscription) => (
          <div key={subscription.id}>
            <div>{subscription.status}</div>
            <div>{subscription.ends_at?.toISOString()}</div>
          </div>
        )) || <div>No subscriptions</div>}

        <BillingsList dictionary={dict} products={products} />
      </main>
    </>
  );
}

const getSubscriptions = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  const subscriptions = await getUserSubscriptions(session.user.id);
  console.log(subscriptions);
  return subscriptions || [];
};
