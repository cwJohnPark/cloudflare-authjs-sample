"use client";

import { LemonButton } from "./lemon-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Star } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/types";

interface PaymentDemoProps {
  dictionary: Dictionary;
}

export function PaymentDemo({ dictionary }: PaymentDemoProps) {
  const { payments } = dictionary;

  // TODO: Demo checkout URLs (실제 프로덕션에서는 환경변수나 API에서 가져와야 함)
  const demoCheckoutUrls = {
    //https://[STORE].lemonsqueezy.com/checkout/buy/[VARIANT_ID]
    basic: "https://demo.lemonsqueezy.com/checkout/basic",
    pro: "https://demo.lemonsqueezy.com/checkout/pro",
    enterprise: "https://demo.lemonsqueezy.com/checkout/enterprise",
  };

  const plans = [
    {
      name: "Basic",
      price: "$9",
      period: payments.monthly,
      description: "Perfect for getting started",
      features: [
        "Up to 10 projects",
        "Basic analytics",
        "Email support",
        "Standard templates",
      ],
      checkoutUrl: demoCheckoutUrls.basic,
      badge: null,
    },
    {
      name: "Pro",
      price: "$29",
      period: payments.monthly,
      description: "Best for growing businesses",
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "Priority support",
        "Custom templates",
        "Team collaboration",
      ],
      checkoutUrl: demoCheckoutUrls.pro,
      badge: "Popular",
    },
    {
      name: "Enterprise",
      price: "$99",
      period: payments.monthly,
      description: "For large organizations",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "Advanced security",
      ],
      checkoutUrl: demoCheckoutUrls.enterprise,
      badge: null,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Payment Demo</h2>
        <p className="text-muted-foreground">
          Test Lemon Squeezy integration with demo checkout URLs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`relative ${plan.badge ? "border-primary" : ""}`}
          >
            {plan.badge && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <Star className="w-3 h-3 mr-1" />
                {plan.badge}
              </Badge>
            )}

            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="space-y-1">
                <div className="text-3xl font-bold">{plan.price}</div>
                <div className="text-sm text-muted-foreground">
                  /{plan.period}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <Separator />

              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 pt-4">
                <LemonButton
                  checkoutUrl={plan.checkoutUrl}
                  variant={plan.badge ? "default" : "outline"}
                  className="w-full"
                >
                  {payments.subscribe}
                </LemonButton>

                <LemonButton
                  checkoutUrl={plan.checkoutUrl}
                  variant="ghost"
                  size="sm"
                  isExternal={true}
                  className="w-full"
                >
                  View in new tab
                </LemonButton>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  {payments.poweredBy}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          💡 These are demo checkout URLs for testing purposes only.
          <br />
          Replace with your actual Lemon Squeezy checkout URLs in production.
        </p>
      </div>
    </div>
  );
}
