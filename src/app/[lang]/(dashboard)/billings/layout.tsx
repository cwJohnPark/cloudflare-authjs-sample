import { LemonScript } from "@/components/payments/lemon-script";

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <LemonScript />
    </>
  );
}
