// Lemon Squeezy 웹훅 이벤트 타입
export interface LemonSqueezyWebhookEvent {
  meta: {
    event_name: string;
    custom_data?: Record<string, unknown>;
  };
  data: {
    type: string;
    id: string;
    attributes: OrderAttributes | SubscriptionAttributes | LicenseKeyAttributes;
    relationships?: {
      store?: { links: { related: string; self: string } };
      customer?: { links: { related: string; self: string } };
      order?: { links: { related: string; self: string } };
      product?: { links: { related: string; self: string } };
      variant?: { links: { related: string; self: string } };
      "order-items"?: { links: { related: string; self: string } };
      "subscription-items"?: { links: { related: string; self: string } };
      "license-keys"?: { links: { related: string; self: string } };
    };
    links?: {
      self: string;
    };
  };
}

// 주문 속성 타입
export interface OrderAttributes {
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
}

// 구독 속성 타입
export interface SubscriptionAttributes {
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
  status:
    | "on_trial"
    | "active"
    | "paused"
    | "past_due"
    | "unpaid"
    | "cancelled"
    | "expired";
  status_formatted: string;
  card_brand: string | null;
  card_last_four: string | null;
  payment_processor: "stripe" | "paypal" | "paddle";
  pause: {
    mode: "void" | "free";
    resumes_at: string | null;
  } | null;
  cancelled: boolean;
  trial_ends_at: string | null;
  billing_anchor: number;
  first_subscription_item: {
    id: number;
    subscription_id: number;
    price_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
  };
  urls: {
    update_payment_method?: string;
    customer_portal?: string;
  };
  renews_at: string | null;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
  test_mode: boolean;
}

// 라이센스 키 속성 타입
export interface LicenseKeyAttributes {
  store_id: number;
  customer_id: number;
  order_id: number;
  order_item_id: number;
  product_id: number;
  user_name: string;
  user_email: string;
  key: string;
  key_short: string;
  activation_limit: number;
  instances_count: number;
  disabled: boolean;
  status: "inactive" | "active" | "expired" | "disabled";
  status_formatted: string;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  test_mode: boolean;
}
