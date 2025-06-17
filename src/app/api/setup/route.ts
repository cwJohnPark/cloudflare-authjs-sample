import { db } from "@/lib/db/context";
import { up } from "@auth/d1-adapter";

export async function GET() {
  try {
    await up(await db());
  } catch (e: unknown) {
    if (e instanceof Error) {
      const causeMessage =
        e.cause instanceof Error ? e.cause.message : String(e.cause);
      console.log(causeMessage, e.message);
    }
  }
  return new Response("Migration completed");
}
