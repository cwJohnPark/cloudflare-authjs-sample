"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { Dictionary } from "@/lib/i18n/types";
import { Input } from "@/components/ui/input";
import { GoogleLoginButton } from "./button/auth-button";
import { Turnstile } from "./turnstile";

export function LoginForm({
  className,
  dict,
  ...props
}: React.ComponentProps<"div"> & { dict: Dictionary }) {
  const handleGoogleLogin = async () => {
    await signIn("google", { redirect: true });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{dict.auth?.welcomeBack}</CardTitle>
          <CardDescription>{dict.auth?.enterCredentials}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <GoogleLoginButton
                onGoogleLogin={handleGoogleLogin}
                dict={dict}
              />
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                {dict.auth?.orContinueWith}
              </span>
            </div>
            <EmailLoginFormClient dict={dict} />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        {dict.auth?.terms}{" "}
        <a href="#" className="underline">
          {dict.auth?.termsOfService}{" "}
        </a>{" "}
        {dict.auth?.and}{" "}
        <a href="#" className="underline">
          {dict.auth?.privacyPolicy}
        </a>
        .
      </div>
    </div>
  );
}

function EmailLoginFormClient({ dict }: { dict: Dictionary }) {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleTurnstileSuccess = (token: string) => {
    setTurnstileToken(token);
  };

  const handleTurnstileError = () => {
    setTurnstileToken(null);
  };

  const handleSubmit = async () => {
    if (!formRef.current) {
      return;
    }

    if (!turnstileToken) {
      alert("Please complete the security check");
      return;
    }

    const formData = new FormData(formRef.current);

    setIsSubmitting(true);

    try {
      // Proceed with signin
      await signIn("resend", {
        email: formData.get("email") as string,
        turnstileToken: turnstileToken,
        redirect: true,
      });
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form ref={formRef} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            name="email"
            placeholder={dict.auth?.email || "Email"}
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            required
          />
        </div>

        <div className="flex justify-center w-full">
          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
            onSuccess={handleTurnstileSuccess}
            onError={handleTurnstileError}
            onExpired={() => setTurnstileToken(null)}
          />
        </div>

        <Button
          className="w-full"
          type="submit"
          onClick={() => handleSubmit()}
          disabled={!turnstileToken || isSubmitting}
        >
          {isSubmitting ? "Signing in..." : dict.auth?.signInWithEmail}
        </Button>
      </form>
    </>
  );
}
