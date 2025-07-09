import { Metadata } from "next";
import { auth } from "../../auth/auth";
import { getDictionary } from "../../../../lib/dictionaries";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { generateMetadataFromDictionary } from "@/lib/seo";

import data from "./data.json";

type Props = {
  params: Promise<{ lang: "en" | "ko" | "ja" | "es" | "zh" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return generateMetadataFromDictionary(dict, "dashboard", lang, "/dashboard");
}

export default async function DashboardPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const session = await auth();

  if (!session) {
    redirect(`/${lang}/auth`);
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" dict={dict} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
