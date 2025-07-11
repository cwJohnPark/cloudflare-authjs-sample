import { getProductList } from "@/app/api/payments/products/client";
import { LangProps } from "@/app/[lang]/layout";
import { BillingsList } from "@/components/payments/billing-list";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function PricingPage({ params }: LangProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const products = await getProductList();

  return (
    <>
      <main className="flex flex-col gap-4 p-6">
        <BillingsList dictionary={dict} products={products} />
      </main>
    </>
  );
}
