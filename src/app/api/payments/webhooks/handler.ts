import { LemonSqueezyWebhookEvent } from "@/app/api/payments/webhooks/libs";
import logger from "@/lib/logger";
import { saveSubscription } from "../subscriptions/service";

export async function handleWebhookEvent(eventRawBody: string) {
  const event: LemonSqueezyWebhookEvent = JSON.parse(eventRawBody);
  const { event_name, custom_data, test_mode } = event.meta;

  logger.debug("handleWebhookEvent", {
    eventRawBody,
  });

  const userId = getUserIdFromCustomData(custom_data);

  logger.info(`Start handling webhook event: ${event_name}`, {
    id: event.data.id,
    userId,
    type: event.data.type,
    customData: event.meta.custom_data,
    isTestMode: test_mode,
  });

  try {
    await saveSubscription(userId, event);
    logger.info(`Successfully saved subscription`, {
      userId,
      event_name,
      eventId: event.data.id,
    });
  } catch (error) {
    logger.error(`Error saving subscription: ${event_name}`, error);
    throw error;
  }
}

const getUserIdFromCustomData = (
  custom_data: Record<string, unknown> | undefined
): string => {
  if (!custom_data || !custom_data.user_id) {
    logger.warn(`No custom data`);
    throw new Error(`No custom data`);
  }
  const userId = custom_data.user_id as string;
  if (!userId) {
    logger.warn(`No user id`);
    throw new Error(`No user id`);
  }
  return userId;
};
