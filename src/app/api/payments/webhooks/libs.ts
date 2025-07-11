export enum SubscriptionEventType {
  SubscriptionCreated = "subscription_created",
  SubscriptionUpdated = "subscription_updated",
  SubscriptionCancelled = "subscription_cancelled",
  SubscriptionResumed = "subscription_resumed",
  SubscriptionExpired = "subscription_expired",
  SubscriptionPaused = "subscription_paused",
  SubscriptionUnpaused = "subscription_unpaused",
}

export interface LemonSqueezyWebhookEvent {
  meta: {
    test_mode?: boolean;
    event_name: string;
    custom_data?: Record<string, unknown>;
    webhook_id?: string;
  };
  data: {
    type: "subscriptions" | string;
    id: string;
    attributes: Record<string, unknown>;
    relationships?: Record<string, unknown>;
    links?: Record<string, unknown>;
  };
}

export function isSubscriptionEvent(
  eventName: string
): eventName is SubscriptionEventType {
  return Object.values(SubscriptionEventType)
    .map((event) => event.toString())
    .includes(eventName);
}

export function isSubscriptionData(event: LemonSqueezyWebhookEvent): boolean {
  return event.data.type === "subscriptions";
}
