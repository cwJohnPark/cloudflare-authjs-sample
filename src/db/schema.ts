import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().notNull().default(""),
  name: text("name"),
  email: text("email"),
  emailVerified: integer("emailVerified", { mode: "timestamp" }),
  image: text("image"),
});
