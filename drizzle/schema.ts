import { sqliteTable, AnySQLiteColumn, text, numeric, integer } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const accounts = sqliteTable("accounts", {
	id: text().primaryKey().notNull(),
	userId: text().default("sql`(NULL)`").notNull(),
	type: text().default("sql`(NULL)`").notNull(),
	provider: text().default("sql`(NULL)`").notNull(),
	providerAccountId: text().default("sql`(NULL)`").notNull(),
	refreshToken: text("refresh_token").default("sql`(NULL)`"),
	accessToken: text("access_token").default("sql`(NULL)`"),
	expiresAt: numeric("expires_at").default(sql`(NULL)`),
	tokenType: text("token_type").default("sql`(NULL)`"),
	scope: text().default("sql`(NULL)`"),
	idToken: text("id_token").default("sql`(NULL)`"),
	sessionState: text("session_state").default("sql`(NULL)`"),
	oauthTokenSecret: text("oauth_token_secret").default("sql`(NULL)`"),
	oauthToken: text("oauth_token").default("sql`(NULL)`"),
});

export const sessions = sqliteTable("sessions", {
	id: text().notNull(),
	sessionToken: text().primaryKey().notNull(),
	userId: text().default("sql`(NULL)`").notNull(),
	expires: numeric().default(sql`(NULL)`).notNull(),
});

export const users = sqliteTable("users", {
	id: text().default("").primaryKey().notNull(),
	name: text().default("sql`(NULL)`"),
	email: text().default("sql`(NULL)`"),
	emailVerified: numeric().default(sql`(NULL)`),
	image: text().default("sql`(NULL)`"),
});

export const verificationTokens = sqliteTable("verification_tokens", {
	identifier: text().notNull(),
	token: text().default("sql`(NULL)`").primaryKey().notNull(),
	expires: numeric().default(sql`(NULL)`).notNull(),
});

export const d1Migrations = sqliteTable("d1_migrations", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text(),
	appliedAt: numeric("applied_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

