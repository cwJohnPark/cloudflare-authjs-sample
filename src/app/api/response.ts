import { NextResponse } from "next/server";

export const unauthorizedResponse = () => {
	return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
}

