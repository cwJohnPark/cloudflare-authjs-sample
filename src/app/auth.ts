import { db } from "@/lib/db/context";
import { D1Adapter } from "@auth/d1-adapter";
import NextAuth, { NextAuthResult } from "next-auth";
import Apple from "next-auth/providers/apple";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

const authResult = async (): Promise<NextAuthResult> => {
  return NextAuth({
    useSecureCookies: true,

    providers: [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
      Apple({
        clientId: process.env.AUTH_APPLE_ID,
        clientSecret: process.env.AUTH_APPLE_SECRET,
      }),
      Resend({
        apiKey: process.env.AUTH_RESEND_KEY,
        from: process.env.AUTH_EMAIL_FROM,
      }),
    ],
    adapter: D1Adapter(await db()),
  });
};

export const { handlers, signIn, signOut, auth } = await authResult();
