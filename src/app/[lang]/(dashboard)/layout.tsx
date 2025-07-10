import { auth } from "@/app/auth/config";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "ko" | "ja" | "es" | "zh");
  const session = await auth();

  if (!session) {
    redirect(`/${lang}/auth`);
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" dict={dict} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
