"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/types";
import { UserSubscription } from "@/db/schema";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";

interface SubscriptionsListProps {
  dictionary: Dictionary;
  subscriptions: UserSubscription[];
}

export function SubscriptionsList({
  dictionary,
  subscriptions,
}: SubscriptionsListProps) {
  const { payments } = dictionary;
  const [cancellingSubscription, setCancellingSubscription] = useState<
    string | null
  >(null);

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (!confirm(payments.confirmCancel)) {
      return;
    }

    setCancellingSubscription(subscriptionId);

    try {
      const response = await fetch("/api/payments/subscriptions", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel subscription");
      }

      toast.success(payments.subscriptionCancelled);
      // 페이지를 새로고침하여 변경된 구독 상태를 반영
      window.location.reload();
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error(payments.cancelFailed);
    } finally {
      setCancellingSubscription(null);
    }
  };

  const canCancelSubscription = (subscription: UserSubscription) => {
    return subscription.status === "active" && !subscription.cancelled;
  };

  const getStatusBadge = (status: string, cancelled: boolean | null) => {
    if (cancelled) {
      return <Badge variant="destructive">{payments.cancelled}</Badge>;
    }

    switch (status) {
      case "active":
        return <Badge variant="default">{payments.active}</Badge>;
      case "expired":
        return <Badge variant="secondary">{payments.expired}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDateTime = (date: Date | null) => {
    if (!date) return "-";
    return formatDate(date);
  };

  const isTrialActive = (trialEndsAt: Date | null) => {
    if (!trialEndsAt) return false;
    return new Date() < trialEndsAt;
  };

  if (subscriptions.length === 0) {
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>{payments.activeSubscriptions}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              {payments.noActiveSubscriptions}
            </p>

            <div className="flex justify-center">
              <Button
                variant="outline"
                className="w-max mx-auto"
                onClick={() => redirect("/pricing")}
              >
                <ArrowRightIcon className="w-4 h-4" />
                {payments.buyNow}
              </Button>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{payments.mySubscriptions}</CardTitle>
        <CardDescription>{payments.activeSubscriptions}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{payments.product}</TableHead>
                <TableHead>{payments.status}</TableHead>
                <TableHead>{payments.created}</TableHead>
                <TableHead>{payments.endsAt}</TableHead>
                <TableHead>{payments.renewsAt}</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {subscription.product_name}
                      {isTrialActive(subscription.trial_ends_at) && (
                        <Badge variant="secondary" className="text-xs">
                          {payments.trial}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(
                      subscription.status,
                      subscription.cancelled
                    )}
                  </TableCell>
                  <TableCell>
                    {formatDateTime(subscription.created_at)}
                  </TableCell>
                  <TableCell>{formatDateTime(subscription.ends_at)}</TableCell>
                  <TableCell>
                    {formatDateTime(subscription.renews_at)}
                  </TableCell>
                  <TableCell>
                    {canCancelSubscription(subscription) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleCancelSubscription(subscription.subscription_id)
                        }
                        disabled={
                          cancellingSubscription ===
                          subscription.subscription_id
                        }
                      >
                        {cancellingSubscription === subscription.subscription_id
                          ? payments.processing
                          : payments.cancelSubscription}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
