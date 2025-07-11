import logger from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { handleWebhookEvent } from "./handler";
import { verifySignature } from "./utils";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const isValid = validateSigningSecret(rawBody, request.headers);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid Signing Secret" },
        { status: 400 }
      );
    }
    await handleWebhookEvent(rawBody);

    return NextResponse.json(
      {
        success: true,
        message: "Webhook processed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error handling webhook", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

const validateSigningSecret = (payload: string, headers: Headers) => {
  const signingSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SIGNING_KEY!;

  if (!signingSecret) {
    logger.error("env LEMON_SQUEEZY_WEBHOOK_SIGNING_KEY is not set");
    return null;
  }

  // 서명 헤더 가져오기
  const signature = headers.get("x-signature");

  if (!signature) {
    logger.error("No signature header");
    return false;
  }

  // 서명 검증
  if (!verifySignature(payload, signature, signingSecret)) {
    logger.error("Invalid signature");
    return false;
  }

  return true;
};
