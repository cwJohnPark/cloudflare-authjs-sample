import { sql } from "drizzle-orm";
import { integer, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const accounts = sqliteTable("accounts", {
  id: text().primaryKey().notNull(),
  userId: text().notNull(),
  type: text().notNull(),
  provider: text().notNull(),
  providerAccountId: text().notNull(),
  refreshToken: text("refresh_token"),
  accessToken: text("access_token"),
  expiresAt: numeric("expires_at"),
  tokenType: text("token_type"),
  scope: text(),
  idToken: text("id_token"),
  sessionState: text("session_state"),
  oauthTokenSecret: text("oauth_token_secret"),
  oauthToken: text("oauth_token"),
});

export const sessions = sqliteTable("sessions", {
  id: text().notNull(),
  sessionToken: text().primaryKey().notNull(),
  userId: text().notNull(),
  expires: numeric().notNull(),
});

export const users = sqliteTable("users", {
  id: text("id").primaryKey().notNull().default(""),
  name: text("name"),
  email: text("email"),
  emailVerified: integer("emailVerified", { mode: "timestamp" }),
  image: text("image"),
});

export const verificationTokens = sqliteTable("verification_tokens", {
  identifier: text().notNull(),
  token: text().primaryKey().notNull(),
  expires: numeric().notNull(),
});

export const d1Migrations = sqliteTable("d1_migrations", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text(),
  appliedAt: numeric("applied_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const userSubscriptions = sqliteTable("user_subscriptions", {
  id: integer().primaryKey({ autoIncrement: true }),
  user_id: text("user_id").notNull(),
  subscription_id: text("subscription_id").notNull(),
  status: text("status").notNull(),
  variant_id: text("variant_id").notNull(),
  product_name: text("product_name"),
  cancelled: integer("cancelled", { mode: "boolean" }).default(false),
  test_mode: integer("test_mode", { mode: "boolean" }).default(false),
  trial_ends_at: integer("trial_ends_at", { mode: "timestamp" }),
  renews_at: integer("renews_at", { mode: "timestamp" }),
  ends_at: integer("ends_at", { mode: "timestamp" }),
  created_at: integer("created_at", { mode: "timestamp" }),
  updated_at: integer("updated_at", { mode: "timestamp" }),
});

export const paymentWebhookEvents = sqliteTable("payment_webhook_events", {
  id: integer().primaryKey({ autoIncrement: true }),
  user_id: text("user_id").notNull(),
  event_raw_body: text("event_raw_body").notNull(),
  created_at: integer("created_at", { mode: "timestamp" }),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type VerificationToken = typeof verificationTokens.$inferSelect;
export type NewVerificationToken = typeof verificationTokens.$inferInsert;

export type UserSubscription = typeof userSubscriptions.$inferSelect;
export type NewUserSubscription = typeof userSubscriptions.$inferInsert;

export type PaymentWebhookEvent = typeof paymentWebhookEvents.$inferSelect;
export type NewPaymentWebhookEvent = typeof paymentWebhookEvents.$inferInsert;
