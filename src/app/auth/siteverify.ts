export interface SiteVerifyResponse {
  success: boolean;
  error_codes?: string[];
  message?: string;
}

export const verifyTurnstileToken = async (
  token: string
): Promise<SiteVerifyResponse> => {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY!;
  const verificationResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    }
  );

  return (await verificationResponse.json()) as SiteVerifyResponse;
};
