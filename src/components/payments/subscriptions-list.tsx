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
import type { Dictionary } from "@/lib/i18n/types";
import { UserSubscription } from "@/db/schema";
import { formatDate } from "@/lib/utils";

interface SubscriptionsListProps {
  dictionary: Dictionary;
  subscriptions: UserSubscription[];
}

export function SubscriptionsList({
  dictionary,
  subscriptions,
}: SubscriptionsListProps) {
  const { payments } = dictionary;

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
      <Card>
        <CardHeader>
          <CardTitle>{payments.activeSubscriptions}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            {payments.noActiveSubscriptions}
          </p>
        </CardContent>
      </Card>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
