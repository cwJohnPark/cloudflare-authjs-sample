import { db } from "@/lib/db/context";
import { D1Adapter } from "@auth/d1-adapter";
import NextAuth, { NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { sendVerificationRequest } from "./resend-verify";

const authResult = async (): Promise<NextAuthResult> => {
  return NextAuth({
    useSecureCookies: true,
    session: {
      strategy: "jwt",
    },
    callbacks: {
      jwt({ token, user }) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      session({ session, token }) {
        session.user.id = token.id as string;
        return session;
      },
    },
    providers: [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
      Resend({
        apiKey: process.env.AUTH_RESEND_KEY,
        from: process.env.AUTH_EMAIL_FROM,
        sendVerificationRequest: sendVerificationRequest,
      }),
    ],
    adapter: D1Adapter(await db()),
    pages: {
      error: "/auth/error",
    },
  });
};

export const { handlers, signIn, signOut, auth } = await authResult();
