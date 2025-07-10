"use client";

import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { Dictionary } from "@/lib/i18n/types";

type HomeClientProps = {
  dict: Dictionary;
  session: Session | null;
};

export function HomeClient({ dict, session }: HomeClientProps) {
  const router = useRouter();

  const goto = (url: string) => {
    router.push(`/${dict.lang}${url}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background gap-4">
      <div className="flex flex-row items-center gap-2">
        <BrainCircuit className="size-5" />
        <div className="text-2xl font-bold">Aioneers</div>
      </div>
      <div className="text-sm text-muted-foreground">
        {dict.common?.description}
      </div>
      <div className="flex flex-col items-center gap-2 md:flex-row">
        {session?.user ? (
          <Button className="w-full" onClick={() => goto("/dashboard")}>
            {dict.navigation?.dashboard}
          </Button>
        ) : (
          <Button className="w-full" onClick={() => goto("/auth")}>
            {dict.auth?.signIn}
          </Button>
        )}
      </div>
    </main>
  );
}
