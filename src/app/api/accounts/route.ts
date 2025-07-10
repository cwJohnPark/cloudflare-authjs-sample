import { auth } from "@/app/auth/config";
import { users } from "@/db/schema";
import { drizzleAdapter } from "@/lib/db/context";
import { eq } from "drizzle-orm";
import { unauthorizedResponse } from "@/app/api/response";
import { NextRequest, NextResponse } from "next/server";

interface AccountRequest {
  name: string;
}

export async function GET() {
  try {
    // 사용자 인증 확인
    const session = await auth();
    if (!session?.user?.id) {
      return unauthorizedResponse();
    }

    // 데이터베이스 연결
    const drizzleDb = await drizzleAdapter();

    // 사용자 정보 조회
    const user = await drizzleDb
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (!user.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: user[0],
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // 사용자 인증 확인
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    // 요청 본문 파싱
    const body = (await request.json()) as AccountRequest;
    const { name } = body;

    // 이름 유효성 검증
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter a valid name" },
        { status: 400 }
      );
    }

    if (name.trim().length > 50) {
      return NextResponse.json(
        { error: "Name must be less than 50 characters" },
        { status: 400 }
      );
    }

    // 데이터베이스 연결
    const drizzleDb = await drizzleAdapter();

    // 사용자 이름 업데이트
    await drizzleDb
      .update(users)
      .set({ name: name.trim() })
      .where(eq(users.id, session.user.id));

    return NextResponse.json({
      success: true,
      message: "Changed name successfully",
    });
  } catch (error) {
    console.error("Error changing name:", error);
    return NextResponse.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}
