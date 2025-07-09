import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import logger from "@/lib/logger";
import { LemonSqueezyWebhookEvent } from "./libs";


// 서명 검증 함수
function verifySignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expectedSignature, "hex")
  );
}

// 웹훅 이벤트 처리 함수
async function handleWebhookEvent(event: LemonSqueezyWebhookEvent) {
  const { event_name } = event.meta;
  const { data } = event;

  logger.info(`Processing webhook event: ${event_name}`, {
    id: data.id,
    type: data.type,
    customData: event.meta.custom_data,
  });

  switch (event_name) {
    case "order_created":
      logger.info("새 주문이 생성되었습니다:", data.attributes);
      // 주문 처리 로직 추가
      break;

    case "order_refunded":
      logger.info("주문이 환불되었습니다:", data.attributes);
      // 환불 처리 로직 추가
      break;

    case "subscription_created":
      logger.info("새 구독이 생성되었습니다:", data.attributes);
      // 구독 생성 처리 로직 추가
      break;

    case "subscription_updated":
      logger.info("구독이 업데이트되었습니다:", data.attributes);
      // 구독 업데이트 처리 로직 추가
      break;

    case "subscription_cancelled":
      logger.info("구독이 취소되었습니다:", data.attributes);
      // 구독 취소 처리 로직 추가
      break;

    case "subscription_resumed":
      logger.info("구독이 재개되었습니다:", data.attributes);
      // 구독 재개 처리 로직 추가
      break;

    case "subscription_expired":
      logger.info("구독이 만료되었습니다:", data.attributes);
      // 구독 만료 처리 로직 추가
      break;

    case "subscription_paused":
      logger.info("구독이 일시정지되었습니다:", data.attributes);
      // 구독 일시정지 처리 로직 추가
      break;

    case "subscription_unpaused":
      logger.info("구독 일시정지가 해제되었습니다:", data.attributes);
      // 구독 일시정지 해제 처리 로직 추가
      break;

    case "subscription_payment_failed":
      logger.warn("구독 결제가 실패했습니다:", data.attributes);
      // 결제 실패 처리 로직 추가
      break;

    case "subscription_payment_success":
      logger.info("구독 결제가 성공했습니다:", data.attributes);
      // 결제 성공 처리 로직 추가
      break;

    case "subscription_payment_recovered":
      logger.info("구독 결제가 복구되었습니다:", data.attributes);
      // 결제 복구 처리 로직 추가
      break;

    case "license_key_created":
      logger.info("라이센스 키가 생성되었습니다:", data.attributes);
      // 라이센스 키 생성 처리 로직 추가
      break;

    case "license_key_updated":
      logger.info("라이센스 키가 업데이트되었습니다:", data.attributes);
      // 라이센스 키 업데이트 처리 로직 추가
      break;

    default:
      logger.warn(`처리되지 않은 이벤트: ${event_name}`);
      break;
  }
}

export async function POST(request: NextRequest) {
  try {
    // 환경 변수에서 서명 비밀키 가져오기
    const signingSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

    if (!signingSecret) {
      logger.error(
        "LEMON_SQUEEZY_WEBHOOK_SECRET 환경 변수가 설정되지 않았습니다."
      );
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // 요청 본문 읽기
    const payload = await request.text();

    // 서명 헤더 가져오기
    const signature = request.headers.get("x-signature");

    if (!signature) {
      logger.error("서명 헤더가 없습니다.");
      return NextResponse.json(
        { error: "Missing signature header" },
        { status: 400 }
      );
    }

    // 서명 검증
    if (!verifySignature(payload, signature, signingSecret)) {
      logger.error("서명 검증 실패");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // JSON 파싱
    const event: LemonSqueezyWebhookEvent = JSON.parse(payload);

    // 이벤트 처리
    await handleWebhookEvent(event);

    // 성공 응답 반환
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    logger.error("웹훅 처리 중 오류 발생:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET 요청은 지원하지 않음
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
