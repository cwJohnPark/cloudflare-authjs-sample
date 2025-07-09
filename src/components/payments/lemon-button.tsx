"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LemonSqueezyButtonProps } from "@/types/lemon";
import { ExternalLink, CreditCard } from "lucide-react";

interface LemonButtonProps
  extends Omit<LemonSqueezyButtonProps, "href" | "className" | "children"> {
  checkoutUrl: string;
  className?: string;
  children: React.ReactNode;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  isExternal?: boolean;
}

export function LemonButton({
  checkoutUrl,
  children,
  className,
  variant = "default",
  size = "default",
  showIcon = true,
  isExternal = false,
  embed = true,
  dark = false,
  logo = true,
  media = true,
  desc = true,
  discount = true,
  enabled = true,
  ...props
}: LemonButtonProps) {
  // Lemon Squeezy 매개변수들을 data attributes로 설정
  const lemonAttributes = {
    "data-lemonsqueezy-embed": embed,
    "data-lemonsqueezy-dark": dark,
    "data-lemonsqueezy-logo": logo,
    "data-lemonsqueezy-media": media,
    "data-lemonsqueezy-desc": desc,
    "data-lemonsqueezy-discount": discount,
    "data-lemonsqueezy-enabled": enabled,
  };

  const buttonClassName = cn("lemonsqueezy-button", className);

  if (isExternal) {
    // 외부 링크로 열기 (새 탭)
    return (
      <Button
        asChild
        variant={variant}
        size={size}
        className={buttonClassName}
        {...props}
      >
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          {...lemonAttributes}
        >
          {showIcon && <ExternalLink className="mr-2 h-4 w-4" />}
          {children}
        </a>
      </Button>
    );
  }

  // 오버레이로 열기 (기본값)
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={buttonClassName}
      {...props}
    >
      <a href={checkoutUrl} {...lemonAttributes}>
        {showIcon && <CreditCard className="mr-2 h-4 w-4" />}
        {children}
      </a>
    </Button>
  );
}
