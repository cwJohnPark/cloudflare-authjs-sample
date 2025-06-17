"use client";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "lucide-react";
import { redirect } from "next/navigation";
import { useSession } from "./session/provider";

export default function Home() {
  const session = useSession();

  const goto = (url: string) => {
    redirect(url);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background gap-4">
      <div className="flex flex-row items-center gap-2">
        <BrainCircuit className="size-5" />
        <div className="text-2xl font-bold">Aioneers</div>
      </div>
      <div className="text-sm text-muted-foreground">
        Aioneers is a platform for AI-powered collaboration.
      </div>
      <div className="flex flex-col items-center gap-2 md:flex-row">
        {session?.user ? (
          <Button className="w-full" onClick={() => goto("/dashboard")}>
            Go to Dashboard Page
          </Button>
        ) : (
          <Button className="w-full" onClick={() => goto("/auth")}>
            Go to Login Page
          </Button>
        )}
      </div>
    </main>
  );
}
