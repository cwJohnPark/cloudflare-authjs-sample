import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";
import logger from "@/lib/logger";

export const setupLemonSqueezy = () => {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
  if (!apiKey) {
    throw new Error("Environment variable 'LEMON_SQUEEZY_API_KEY' is not set");
  }

  lemonSqueezySetup({
    apiKey,
    onError: (error) => logger.error("Lemon Squeezy API error:", error),
  });
};
