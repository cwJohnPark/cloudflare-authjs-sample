import { PaymentDemo } from "@/components/payments/payment-demo";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function PaymentsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "ko" | "ja" | "es" | "zh");
  return <PaymentDemo dictionary={dict} />;
}
