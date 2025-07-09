import { db } from "@/lib/db/context";
import { D1Adapter } from "@auth/d1-adapter";
import NextAuth, { NextAuthResult } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

const authResult = async (): Promise<NextAuthResult> => {
  return NextAuth({
    useSecureCookies: true,
    session: {
      strategy: "jwt",
    },
    //  By default, the `id` property does not exist on `token` or `session`. See the [TypeScript](https://authjs.dev/getting-started/typescript) on how to add it.
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
      }),
    ],
    adapter: D1Adapter(await db()),
  });
};

export const { handlers, signIn, signOut, auth } = await authResult();
