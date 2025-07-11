"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Dictionary } from "@/lib/i18n/types";
import { ListProducts } from "@lemonsqueezy/lemonsqueezy.js";
import { Star } from "lucide-react";
import { LemonButton } from "./lemon-button";
import { formatPrice } from "@/lib/utils";
import { useSession } from "../session/provider";

interface BillingsListProps {
  dictionary: Dictionary;
  products: ListProducts;
}

export function BillingsList({ dictionary, products }: BillingsListProps) {
  const { payments } = dictionary;
  const session = useSession();
  const userId = session?.user?.id;

  const plans = products.data.map((product) => {
    return {
      name: product.attributes.name,
      description: product.attributes.description,
      price: product.attributes.price,
      priceFormatted: product.attributes.price_formatted,
      badge: product.attributes.name === "Pro" ? "Recommended" : "",
      checkoutUrl:
        product.attributes.buy_now_url + "?checkout[custom][user_id]=" + userId,
    };
  });

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
              <CardTitle className="text-xl my-2">{plan.name}</CardTitle>
              <CardDescription className="min-h-24">
                <div
                  className="text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: plan.description }}
                />
              </CardDescription>
              <div className="space-y-1">
                <div className="text-3xl font-bold ">
                  {formatPrice(plan.price / 100)}
                </div>
                <div className="text-sm text-muted-foreground pt-1">
                  {plan.priceFormatted}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <Separator />

              <ul className="space-y-2">
                {/* {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature.name}</span>
                  </li>
                ))} */}
              </ul>

              <div className="space-y-2 pt-4">
                <LemonButton
                  checkoutUrl={plan.checkoutUrl}
                  variant={plan.badge ? "default" : "outline"}
                  className="w-full"
                >
                  {payments.subscribe}
                </LemonButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
