import { LoginForm } from "@/components/auth/login-form";
import { BrainCircuit } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { getDictionary } from "../../../../lib/dictionaries";

type Props = {
  params: Promise<{ lang: "en" | "ko" | "ja" | "es" | "zh" }>;
};

export default async function AuthPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const session = await auth();

  if (session) {
    redirect(`/${lang}`);
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <BrainCircuit className="size-4" />
          </div>
          Aioneers
        </a>
        <LoginForm className="w-full" dict={dict} />
      </div>
    </div>
  );
}
