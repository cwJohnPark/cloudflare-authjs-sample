"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  CreditCard,
  User,
  AlertCircle,
  CheckCircle,
  X,
  ExternalLink,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Order {
  id: string;
  attributes: {
    store_id: number;
    customer_id: number;
    identifier: string;
    order_number: number;
    user_name: string;
    user_email: string;
    currency: string;
    currency_rate: string;
    subtotal: number;
    discount_total: number;
    tax: number;
    total: number;
    subtotal_usd: number;
    discount_total_usd: number;
    tax_usd: number;
    total_usd: number;
    tax_name: string;
    tax_rate: string;
    status: "pending" | "paid" | "refunded" | "partial_refunded";
    status_formatted: string;
    refunded: number | null;
    refunded_at: string | null;
    subtotal_formatted: string;
    discount_total_formatted: string;
    tax_formatted: string;
    total_formatted: string;
    first_order_item: {
      order_id: number;
      product_id: number;
      variant_id: number;
      product_name: string;
      variant_name: string;
      price: number;
      created_at: string;
      updated_at: string;
      test_mode: boolean;
    };
    urls: {
      receipt: string;
    };
    created_at: string;
    updated_at: string;
    test_mode: boolean;
  };
}

interface PaymentHistoryProps {
  limit?: number;
  showFilters?: boolean;
}

export function PaymentHistory({
  limit = 10,
  showFilters = true,
}: PaymentHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, page]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        perPage: limit.toString(),
      });

      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }

      const response = await fetch(`/api/payments/orders?${params}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "결제 내역을 불러오는 중 오류가 발생했습니다"
        );
      }

      if (page === 1) {
        setOrders(result.orders);
      } else {
        setOrders((prev) => [...prev, ...result.orders]);
      }

      setHasMore(result.meta?.page?.last_page > page);
    } catch (error) {
      console.error("결제 내역 조회 오류:", error);
      setError(
        error instanceof Error
          ? error.message
          : "결제 내역을 불러오는 중 오류가 발생했습니다"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
      case "partial_refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "refunded":
      case "partial_refunded":
        return <X className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading && page === 1) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-sm text-muted-foreground">
          결제 내역을 불러오는 중...
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
          onClick={fetchOrders}
          className="mt-2"
        >
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="상태 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 상태</SelectItem>
              <SelectItem value="paid">결제 완료</SelectItem>
              <SelectItem value="pending">결제 대기</SelectItem>
              <SelectItem value="refunded">환불 완료</SelectItem>
              <SelectItem value="partial_refunded">부분 환불</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">결제 내역이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      주문 #{order.attributes.order_number}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {order.attributes.first_order_item.product_name}
                    </p>
                  </div>
                  <Badge className={getStatusColor(order.attributes.status)}>
                    {getStatusIcon(order.attributes.status)}
                    <span className="ml-1">
                      {order.attributes.status_formatted}
                    </span>
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        <strong>고객:</strong> {order.attributes.user_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        <strong>주문일:</strong>{" "}
                        {formatDate(order.attributes.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        <strong>결제 금액:</strong>{" "}
                        {order.attributes.total_formatted}
                      </span>
                    </div>
                    {order.attributes.tax > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          <strong>세금:</strong>{" "}
                          {order.attributes.tax_formatted}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>소계:</span>
                    <span>{order.attributes.subtotal_formatted}</span>
                  </div>
                  {order.attributes.discount_total > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>할인:</span>
                      <span>-{order.attributes.discount_total_formatted}</span>
                    </div>
                  )}
                  {order.attributes.tax > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>{order.attributes.tax_name}:</span>
                      <span>{order.attributes.tax_formatted}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-semibold">
                    <span>총액:</span>
                    <span>{order.attributes.total_formatted}</span>
                  </div>
                </div>

                {order.attributes.refunded && (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-red-700">
                      <strong>환불 금액:</strong> {order.attributes.refunded}
                    </p>
                    {order.attributes.refunded_at && (
                      <p className="text-sm text-red-700">
                        <strong>환불일:</strong>{" "}
                        {formatDate(order.attributes.refunded_at)}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <p>주문 ID: {order.id}</p>
                    <p>식별자: {order.attributes.identifier}</p>
                    {order.attributes.test_mode && (
                      <p className="text-orange-600">테스트 모드</p>
                    )}
                  </div>

                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={order.attributes.urls.receipt}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      영수증 보기
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {hasMore && (
            <div className="text-center">
              <Button variant="outline" onClick={loadMore} disabled={isLoading}>
                {isLoading ? "불러오는 중..." : "더 보기"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
