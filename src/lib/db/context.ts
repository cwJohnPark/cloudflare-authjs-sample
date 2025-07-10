import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";

export const db = async () =>
  (await getCloudflareContext({ async: true })).env.DB;

export const drizzleAdapter = async () => {
  const dbInstance = await db();
  return drizzle(dbInstance);
};
