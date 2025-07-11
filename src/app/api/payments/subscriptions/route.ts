import { unauthorizedResponse } from "@/app/api/response";
import { auth } from "@/app/auth/config";
import logger from "@/lib/logger";
import {
  cancelSubscription,
  getSubscription,
  listSubscriptions,
  updateSubscription,
} from "@lemonsqueezy/lemonsqueezy.js";
import { NextRequest, NextResponse } from "next/server";
import { setupLemonSqueezy } from "@/app/api/payments/setup";

// Request body 타입 정의
interface UpdateSubscriptionRequest {
  subscriptionId: string | number;
  action: "pause" | "resume" | "cancel" | "update";
  resumesAt?: string;
  [key: string]: unknown;
}

interface CancelSubscriptionRequest {
  subscriptionId: string | number;
}

// 구독 목록 조회
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return unauthorizedResponse();
    }

    setupLemonSqueezy();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email") || session.user.email;

    // 사용자의 구독 목록 조회
    const { statusCode, error, data } = await listSubscriptions({
      filter: {
        userEmail: email,
      },
      include: [
        "store",
        "product",
        "variant",
        "customer",
        "order",
        "order-item",
        "subscription-invoices",
        "subscription-items",
      ],
    });

    if (error) {
      logger.error("Subscription list error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: statusCode || 500 }
      );
    }

    return NextResponse.json({
      subscriptions: data?.data || [],
      meta: data?.meta,
    });
  } catch (error) {
    logger.error("Subscription list error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// 구독 업데이트 (일시정지, 재개, 취소)
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "인증이 필요합니다" }, { status: 401 });
    }

    setupLemonSqueezy();

    const requestBody = (await request.json()) as UpdateSubscriptionRequest;
    const { subscriptionId, action, resumesAt, ...updateData } = requestBody;

    if (!subscriptionId || !action) {
      return NextResponse.json(
        {
          error: "Subscription ID and action are required",
        },
        { status: 400 }
      );
    }

    // 먼저 구독이 사용자의 것인지 확인
    const {
      statusCode: getStatusCode,
      error: getError,
      data: subscriptionData,
    } = await getSubscription(subscriptionId);

    if (getError) {
      logger.error("Subscription error:", getError);
      return NextResponse.json(
        { error: getError.message },
        { status: getStatusCode || 500 }
      );
    }

    if (subscriptionData?.data?.attributes?.user_email !== session.user.email) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    let result;

    switch (action) {
      case "pause":
        result = await updateSubscription(subscriptionId, {
          pause: {
            mode: "void",
            resumesAt: resumesAt,
          },
        });
        break;

      case "resume":
        result = await updateSubscription(subscriptionId, {
          pause: null,
        });
        break;

      case "cancel":
        result = await cancelSubscription(subscriptionId);
        break;

      case "update":
        result = await updateSubscription(subscriptionId, updateData);
        break;

      default:
        return NextResponse.json(
          { error: "지원하지 않는 액션입니다" },
          { status: 400 }
        );
    }

    const { statusCode, error, data } = result;

    if (error) {
      logger.error(`Subscription ${action} error:`, error);
      return NextResponse.json(
        { error: error.message },
        { status: statusCode || 500 }
      );
    }

    return NextResponse.json({
      message: `Subscription ${action} success`,
      subscription: data?.data,
    });
  } catch (error) {
    logger.error("Subscription update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// 구독 취소
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return unauthorizedResponse();
    }

    setupLemonSqueezy();

    const requestBody = (await request.json()) as CancelSubscriptionRequest;
    const { subscriptionId } = requestBody;

    if (!subscriptionId) {
      return NextResponse.json(
        { error: "Subscription ID is required" },
        { status: 400 }
      );
    }

    // 구독이 사용자의 것인지 확인
    const {
      statusCode: getStatusCode,
      error: getError,
      data: subscriptionData,
    } = await getSubscription(subscriptionId);

    if (getError) {
      logger.error("Subscription error:", getError);
      return NextResponse.json(
        { error: getError.message },
        { status: getStatusCode || 500 }
      );
    }

    if (subscriptionData?.data?.attributes?.user_email !== session.user.email) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    const { statusCode, error, data } =
      await cancelSubscription(subscriptionId);

    if (error) {
      logger.error("Subscription cancel error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: statusCode || 500 }
      );
    }

    return NextResponse.json({
      message: "Subscription cancel success",
      subscription: data?.data,
    });
  } catch (error) {
    logger.error("Subscription cancel error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
