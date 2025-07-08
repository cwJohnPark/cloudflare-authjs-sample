"use client";

import { Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { i18n } from "../../i18n-config";

const languages = [
  { code: "en", name: "English" },
  { code: "ko", name: "한국어" },
  { code: "ja", name: "日本語" },
  { code: "es", name: "Español" },
  { code: "zh", name: "中文" },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname
  const currentLocale = pathname.split("/")[1] || i18n.defaultLocale;

  const handleLanguageChange = (newLocale: string) => {
    // Replace the locale in the current path
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "");
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  return (
    <Select value={currentLocale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-full h-8 border">
        <div className="flex items-center gap-2">
          <Globe className="h-3 w-3" />
          <span className="text-xs">{currentLanguage?.name}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
