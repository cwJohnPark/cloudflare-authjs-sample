import { getCloudflareContext } from "@opennextjs/cloudflare";

export const db = async () =>
  (await getCloudflareContext({ async: true })).env.DB;
