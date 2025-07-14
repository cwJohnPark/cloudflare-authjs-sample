import { drizzleAdapter } from "@/lib/db/context";
import {
  isSubscriptionEvent,
  LemonSqueezyWebhookEvent,
} from "../webhooks/libs";
import {
  NewPaymentWebhookEvent,
  NewUserSubscription,
  PaymentWebhookEvent,
  paymentWebhookEvents,
  UserSubscription,
  userSubscriptions,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import logger from "@/lib/logger";

export const saveSubscription = async (
  userId: string,
  event: LemonSqueezyWebhookEvent
): Promise<void> => {
  await savePaymentWebhookEvent(userId, event);
  await upsertSubscription(userId, event);
};

export const savePaymentWebhookEvent = async (
  userId: string,
  event: LemonSqueezyWebhookEvent
): Promise<PaymentWebhookEvent> => {
  const db = await drizzleAdapter();

  logger.debug(
    `savePaymentWebhookEvent(userId=${userId},eventId=${event.data.id})`,
    event
  );
  const paymentWebhookEventData: NewPaymentWebhookEvent = {
    user_id: userId,
    event_raw_body: JSON.stringify(event),
    created_at: new Date(event.data.attributes.created_at as string),
  };
  logger.debug("savePaymentWebhookEvent data:", paymentWebhookEventData);

  const result = await db
    .insert(paymentWebhookEvents)
    .values(paymentWebhookEventData)
    .returning();

  logger.debug("savePaymentWebhookEvent result:", result);

  return result[0];
};

export const upsertSubscription = async (
  userId: string,
  event: LemonSqueezyWebhookEvent
): Promise<void> => {
  if (!isSubscriptionEvent(event.meta.event_name)) {
    logger.info(`Unsupported event: ${event.meta.event_name}`);
    return;
  }

  const existingSubscription = await getSubscriptionBySubscriptionId(
    event.data.id
  );

  if (!existingSubscription) {
    await saveUserSubscription(userId, event);
    return;
  }

  await updateUserSubscription(event.data.id, event);
};

export const saveUserSubscription = async (
  userId: string,
  event: LemonSqueezyWebhookEvent
): Promise<void> => {
  if (!isSubscriptionEvent(event.meta.event_name)) {
    logger.info(`Unsupported event: ${event.meta.event_name}`);
    return;
  }

  const subscriptionData: NewUserSubscription = {
    user_id: userId,
    subscription_id: event.data.id,
    status: (event.data.attributes.status as string)!,
    variant_id: (event.data.attributes.variant_id as string)!,
    product_name: (event.data.attributes.product_name as string)!,
    cancelled: (event.data.attributes.cancelled as boolean)!,
    test_mode: (event.meta.test_mode as boolean)!,
    trial_ends_at: new Date(event.data.attributes.trial_ends_at as string),
    renews_at: new Date(event.data.attributes.renews_at as string),
    ends_at: new Date(event.data.attributes.ends_at as string),
    created_at: new Date(event.data.attributes.created_at as string),
  };

  logger.debug("saveUserSubscription data:", subscriptionData);

  const db = await drizzleAdapter();

  const result = await db
    .insert(userSubscriptions)
    .values(subscriptionData)
    .returning();

  logger.debug("saveUserSubscription result:", result);
};

export const cancelUserSubscription = async (
  subscriptionId: string,
  userId: string
): Promise<void> => {
  const db = await drizzleAdapter();
  const result = await db
    .update(userSubscriptions)
    .set({ status: "cancelled" })
    .where(
      and(
        eq(userSubscriptions.subscription_id, subscriptionId),
        eq(userSubscriptions.user_id, userId)
      )
    )
    .returning();

  logger.debug(
    `cancelUserSubscription(subscriptionId=${subscriptionId}, userId=${userId}) result:`,
    result
  );
};

export const updateUserSubscription = async (
  subscriptionId: string,
  event: LemonSqueezyWebhookEvent
): Promise<UserSubscription | null> => {
  if (!isSubscriptionEvent(event.meta.event_name)) {
    logger.info(`Unsupported event: ${event.meta.event_name}`);
    return null;
  }

  const db = await drizzleAdapter();

  const updateData = {
    status: (event.data.attributes.status as string)!,
    cancelled: (event.data.attributes.cancelled as boolean)!,
    variant_id: (event.data.attributes.variant_id as string)!,
    product_name: event.data.attributes.product_name as string,
    trial_ends_at: new Date(event.data.attributes.trial_ends_at as string),
    event_raw_body: JSON.stringify(event),
    renews_at: new Date(event.data.attributes.renews_at as string),
    ends_at: new Date(event.data.attributes.ends_at as string),
    updated_at: new Date(event.data.attributes.updated_at as string),
  };

  const result = await db
    .update(userSubscriptions)
    .set(updateData)
    .where(eq(userSubscriptions.subscription_id, subscriptionId))
    .returning();

  return result[0] || null;
};

export const getSubscriptionBySubscriptionId = async (
  subscriptionId: string,
  userId: string | null = null
): Promise<UserSubscription | null> => {
  const db = await drizzleAdapter();

  const result = await db
    .select()
    .from(userSubscriptions)
    .where(
      and(
        eq(userSubscriptions.subscription_id, subscriptionId),
        userId ? eq(userSubscriptions.user_id, userId) : undefined
      )
    )
    .limit(1);

  return result[0] || null;
};

export const getUserSubscriptions = async (
  userId: string
): Promise<UserSubscription[]> => {
  const db = await drizzleAdapter();

  return await db
    .select()
    .from(userSubscriptions)
    .where(eq(userSubscriptions.user_id, userId));
};
