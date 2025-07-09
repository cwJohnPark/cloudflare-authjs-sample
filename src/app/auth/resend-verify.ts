import logger from "@/lib/logger";
import type { Theme } from "@auth/core/types";
import { EmailConfig } from "next-auth/providers/email";
import { fallbackEmail, htmlEmail, translations } from "./resend-email";
import { verifyTurnstileToken } from "./siteverify";

type Language = keyof typeof translations;

// Detect language from Accept-Language header
const detectLanguage = (request: Request): Language => {
  const acceptLanguage = request.headers.get("Accept-Language") || "";

  // Check for exact language matches
  if (acceptLanguage.includes("ko")) return "ko";
  if (acceptLanguage.includes("ja")) return "ja";
  if (acceptLanguage.includes("zh")) return "zh";
  if (acceptLanguage.includes("es")) return "es";

  // Default to English
  return "en";
};

interface EmailProviderSendVerificationRequestParams {
  identifier: string;
  url: string;
  expires: Date;
  provider: EmailConfig;
  token: string;
  theme: Theme;
  request: Request;
}

export async function sendVerificationRequest(
  params: EmailProviderSendVerificationRequestParams
) {
  logger.trace("request:", params.request);
  const isValid = await checkSiteVerify(params.request);

  if (!isValid) {
    throw new Error("Turnstile token verification failed");
  }

  const { identifier: to, provider, url, theme, request } = params;
  const { host } = new URL(url);
  const language = detectLanguage(request);
  const t = translations[language];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject: `${t.signInTo} ${host}`,
      html: htmlEmail({
        url,
        host,
        theme,
        language,
        t,
        supportEmail: provider.from || null,
      }),
      text: fallbackEmail({ url, host, t }),
    }),
  });

  if (!res.ok) {
    throw new Error("Resend error: " + JSON.stringify(await res.json()));
  }
}

const getTurnstileToken = async (request: Request) => {
  const tokenParameterName = "turnstileToken";
  const body = (await request.json()) as { [key: string]: string };
  const turnstileToken = body[tokenParameterName];
  return turnstileToken;
};

const checkSiteVerify = async (request: Request) => {
  const turnstileToken = await getTurnstileToken(request);
  if (!turnstileToken) {
    throw new Error("Turnstile token is required");
  }

  // Verify the token with Cloudflare Turnstile API
  const verificationResult = await verifyTurnstileToken(turnstileToken);

  if (verificationResult.success) {
    logger.info(
      "Turnstile token verified successfully, body:",
      verificationResult
    );
    return true;
  } else {
    logger.error(
      "Turnstile token verification failed, aborting email, body:",
      verificationResult
    );
    return false;
  }
};
