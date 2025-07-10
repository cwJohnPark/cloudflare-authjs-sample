import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { LangProps } from "@/app/[lang]/page";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function SettingsPage({ params }: LangProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <SiteHeader title={dict.settings.title} />
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{dict.settings.languageSettings}</CardTitle>
          </CardHeader>
          <CardContent>
            <DropdownMenuGroup>
              <div className="w-full py-2">
                <LanguageSwitcher />
              </div>
            </DropdownMenuGroup>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
