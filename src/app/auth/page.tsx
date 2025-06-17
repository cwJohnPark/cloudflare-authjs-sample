import { auth } from "../auth";
import { Shield } from "lucide-react";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";

export default async function AuthPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Shield className="size-4" />
          </div>
          Aioneers
        </a>
        <LoginForm className="w-full" />
      </div>
    </div>
  );
}
