import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { generateMetadataFromDictionary } from "@/lib/seo";
import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";

import data from "./data.json";
import { LangProps } from "@/app/[lang]/layout";

export async function generateMetadata({
  params,
}: LangProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return generateMetadataFromDictionary(dict, "dashboard", lang, "/dashboard");
}

export default async function DashboardPage() {
  return (
    <main>
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
    </main>
  );
}
