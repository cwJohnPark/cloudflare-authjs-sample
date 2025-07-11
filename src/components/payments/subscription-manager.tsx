"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Play,
  Pause,
  X,
  Calendar,
  CreditCard,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

interface Subscription {
  id: string;
  attributes: {
    store_id: number;
    customer_id: number;
    order_id: number;
    order_item_id: number;
    product_id: number;
    variant_id: number;
    product_name: string;
    variant_name: string;
    user_name: string;
    user_email: string;
    status: string;
    status_formatted: string;
    card_brand: string | null;
    card_last_four: string | null;
    payment_processor: string;
    cancelled: boolean;
    trial_ends_at: string | null;
    billing_anchor: number;
    urls: {
      update_payment_method?: string;
      customer_portal?: string;
    };
    renews_at: string | null;
    ends_at: string | null;
    created_at: string;
    updated_at: string;
    pause: {
      mode: string;
      resumes_at: string | null;
    } | null;
  };
}

interface SubscriptionManagerProps {
  subscription: Subscription;
  onSubscriptionUpdate: (subscription: Subscription) => void;
}

export function SubscriptionManager({
  subscription,
  onSubscriptionUpdate,
}: SubscriptionManagerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { attributes } = subscription;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      case "on_trial":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "paused":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
      case "expired":
        return <X className="w-4 h-4" />;
      case "on_trial":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleSubscriptionAction = async (
    action: string,
    additionalData?: any
  ) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/payments/subscriptions", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: subscription.id,
          action,
          ...additionalData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "작업 중 오류가 발생했습니다");
      }

      toast.success(result.message);

      // 구독 상태 업데이트
      if (result.subscription) {
        onSubscriptionUpdate({
          ...subscription,
          attributes: {
            ...subscription.attributes,
            ...result.subscription.attributes,
          },
        });
      }
    } catch (error) {
      console.error("구독 작업 오류:", error);
      toast.error(
        error instanceof Error ? error.message : "작업 중 오류가 발생했습니다"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const canPause = attributes.status === "active" && !attributes.pause;
  const canResume = attributes.status === "paused" || attributes.pause;
  const canCancel =
    ["active", "paused", "on_trial"].includes(attributes.status) &&
    !attributes.cancelled;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{attributes.product_name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {attributes.variant_name}
            </p>
          </div>
          <Badge className={getStatusColor(attributes.status)}>
            {getStatusIcon(attributes.status)}
            <span className="ml-1">{attributes.status_formatted}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                <strong>고객:</strong> {attributes.user_name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                <strong>결제 수단:</strong>{" "}
                {attributes.card_brand
                  ? `${attributes.card_brand} ****${attributes.card_last_four}`
                  : attributes.payment_processor}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                <strong>다음 갱신일:</strong> {formatDate(attributes.renews_at)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                <strong>종료일:</strong> {formatDate(attributes.ends_at)}
              </span>
            </div>
          </div>
        </div>

        {attributes.pause && (
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm text-yellow-700">
              <strong>일시정지됨:</strong>{" "}
              {attributes.pause.resumes_at
                ? `${formatDate(attributes.pause.resumes_at)}에 재개 예정`
                : "무기한 일시정지"}
            </p>
          </div>
        )}

        {attributes.trial_ends_at && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>무료 체험:</strong> {formatDate(attributes.trial_ends_at)}
              에 종료
            </p>
          </div>
        )}

        <Separator />

        <div className="flex flex-wrap gap-2">
          {canPause && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSubscriptionAction("pause")}
              disabled={isLoading}
            >
              <Pause className="w-4 h-4 mr-2" />
              일시정지
            </Button>
          )}

          {canResume && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSubscriptionAction("resume")}
              disabled={isLoading}
            >
              <Play className="w-4 h-4 mr-2" />
              재개
            </Button>
          )}

          {canCancel && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleSubscriptionAction("cancel")}
              disabled={isLoading}
            >
              <X className="w-4 h-4 mr-2" />
              취소
            </Button>
          )}

          {attributes.urls.update_payment_method && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={attributes.urls.update_payment_method}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                결제 수단 변경
              </a>
            </Button>
          )}

          {attributes.urls.customer_portal && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={attributes.urls.customer_portal}
                target="_blank"
                rel="noopener noreferrer"
              >
                고객 포털
              </a>
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          <p>구독 ID: {subscription.id}</p>
          <p>생성일: {formatDate(attributes.created_at)}</p>
          <p>마지막 업데이트: {formatDate(attributes.updated_at)}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// 구독 목록 컴포넌트
export function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/payments/subscriptions");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "구독 목록을 불러오는 중 오류가 발생했습니다"
        );
      }

      setSubscriptions(result.subscriptions);
    } catch (error) {
      console.error("구독 목록 조회 오류:", error);
      setError(
        error instanceof Error
          ? error.message
          : "구독 목록을 불러오는 중 오류가 발생했습니다"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscriptionUpdate = (updatedSubscription: Subscription) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === updatedSubscription.id ? updatedSubscription : sub
      )
    );
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-sm text-muted-foreground">
          구독 목록을 불러오는 중...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-sm text-red-600">{error}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchSubscriptions}
          className="mt-2"
        >
          다시 시도
        </Button>
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">구독이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {subscriptions.map((subscription) => (
        <SubscriptionManager
          key={subscription.id}
          subscription={subscription}
          onSubscriptionUpdate={handleSubscriptionUpdate}
        />
      ))}
    </div>
  );
}
