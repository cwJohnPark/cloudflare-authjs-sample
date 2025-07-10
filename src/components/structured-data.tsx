import { generateStructuredData } from "@/lib/seo";
import { Dictionary } from "@/lib/i18n/types";

interface StructuredDataProps {
  type: "WebSite" | "WebPage" | "Organization";
  dict: Dictionary;
}

export function StructuredData({ type, dict }: StructuredDataProps) {
  const structuredData = generateStructuredData(type, dict);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      crossOrigin="anonymous"
    />
  );
}
