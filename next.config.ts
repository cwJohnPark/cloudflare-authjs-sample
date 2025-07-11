import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const nextConfig: NextConfig = {
  /* config options here */
  crossOrigin: "anonymous",
  allowedDevOrigins: ["http://localhost:3000"],
  env: {
    // 필수 환경변수 검증
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY:
      process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY,
  },
};

// 필수 환경변수 검증 함수
function validateRequiredEnvVars() {
  const requiredEnvVars = {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY:
      process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY,
  };

  const missingEnvVars: string[] = [];

  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value || value.trim() === "") {
      missingEnvVars.push(key);
    }
  }

  if (missingEnvVars.length > 0) {
    console.error("❌ Missing required environment variables:");
    missingEnvVars.forEach((envVar) => {
      console.error(`   - ${envVar}`);
    });
    console.error(
      "\n💡 Please set these environment variables before running the application."
    );
    console.error(
      "   You can set them in your .env.local file or in your deployment environment."
    );
    console.error("\n📝 Example:");
    console.error("   NEXT_PUBLIC_APP_URL=https://yourdomain.com");
    console.error(
      "   NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=0x4AAAAAAABkMYinukE8nzYP"
    );

    process.exit(1);
  }

  console.log("✅ All required environment variables are set");
}

// 환경변수 검증 실행
validateRequiredEnvVars();

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
