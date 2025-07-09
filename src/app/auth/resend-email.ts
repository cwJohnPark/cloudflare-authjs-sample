import type { Theme } from "@auth/core/types";

// Email translations
export const translations = {
  en: {
    signInTo: "Sign in to",
    signInButton: "Sign in",
    ifNotRequested:
      "If you did not request this email you can safely ignore it.",
    expires: "This link will expire in 24 hours.",
    signInToAccount: "Sign in to your account",
    clickToSignIn: "Click the button below to sign in to your account.",
    troubleSigningIn: "Trouble signing in?",
  },
  ko: {
    signInTo: "로그인하기",
    signInButton: "로그인",
    ifNotRequested: "이 이메일을 요청하지 않았다면 무시하셔도 됩니다.",
    expires: "이 링크는 24시간 후에 만료됩니다.",
    signInToAccount: "계정에 로그인",
    clickToSignIn: "아래 버튼을 클릭하여 계정에 로그인하세요.",
    troubleSigningIn: "로그인에 문제가 있나요?",
  },
  ja: {
    signInTo: "サインイン",
    signInButton: "サインイン",
    ifNotRequested:
      "このメールを要求していない場合は、無視しても問題ありません。",
    expires: "このリンクは24時間後に有効期限切れになります。",
    signInToAccount: "アカウントにサインイン",
    clickToSignIn:
      "下のボタンをクリックしてアカウントにサインインしてください。",
    troubleSigningIn: "サインインに問題がありますか？",
  },
  zh: {
    signInTo: "登录到",
    signInButton: "登录",
    ifNotRequested: "如果您没有请求此电子邮件，您可以安全地忽略它。",
    expires: "此链接将在24小时后过期。",
    signInToAccount: "登录您的账户",
    clickToSignIn: "点击下面的按钮登录您的账户。",
    troubleSigningIn: "登录遇到问题？",
  },
  es: {
    signInTo: "Iniciar sesión en",
    signInButton: "Iniciar sesión",
    ifNotRequested:
      "Si no solicitaste este correo electrónico, puedes ignorarlo con seguridad.",
    expires: "Este enlace expirará en 24 horas.",
    signInToAccount: "Iniciar sesión en tu cuenta",
    clickToSignIn:
      "Haz clic en el botón de abajo para iniciar sesión en tu cuenta.",
    troubleSigningIn: "¿Problemas para iniciar sesión?",
  },
};

export const htmlEmail = (params: {
  url: string;
  host: string;
  theme: Theme;
  language: keyof typeof translations;
  t: (typeof translations)["en"];
  supportEmail: string | null;
}) => {
  const { url, host, theme, t, supportEmail } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = theme.brandColor || "#007bff";
  const color = {
    background: "#f5f5f5",
    cardBackground: "#ffffff",
    text: "#333333",
    textSecondary: "#666666",
    textMuted: "#999999",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#ffffff",
    border: "#e1e1e1",
    success: "#28a745",
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.signInToAccount}</title>
  <style>
    @media screen and (max-width: 640px) {
      .container {
        padding: 20px 10px !important;
      }
      .main-card {
        margin: 10px !important;
      }
    }
  </style>
</head>
<body style="
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: ${color.text};
  background-color: ${color.background};
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
">
  <div class="container" style="
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 20px;
  ">

    <!-- Main Card -->
    <div class="main-card" style="
      background-color: ${color.cardBackground};
      border-radius: 12px;
      padding: 40px;
      margin: 20px 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border: 1px solid ${color.border};
    ">
      <!-- Title -->
      <h1 style="
        margin: 0 0 24px 0;
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        color: ${color.text};
      ">
        ${t.signInToAccount}
      </h1>

      <!-- Subtitle -->
      <p style="
        margin: 0 0 32px 0;
        font-size: 16px;
        text-align: center;
        color: ${color.textSecondary};
      ">
        ${t.clickToSignIn}
      </p>

      <!-- Host Info -->
      <div style="
        background-color: ${color.background};
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 32px;
        text-align: center;
        border: 1px solid ${color.border};
      ">
        <p style="
          margin: 0;
          font-size: 14px;
          color: ${color.textMuted};
        ">
          ${t.signInTo}
        </p>
        <p style="
          margin: 8px 0 0 0;
          font-size: 18px;
          font-weight: bold;
          color: ${color.text};
        ">
          ${escapedHost}
        </p>
      </div>

      <!-- Sign In Button -->
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${url}" target="_blank" style="
          display: inline-block;
          padding: 16px 32px;
          background-color: ${color.buttonBackground};
          color: ${color.buttonText};
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          font-size: 18px;
          border: 2px solid ${color.buttonBorder};
          transition: all 0.3s ease;
          min-width: 200px;
        ">
          ${t.signInButton}
        </a>
      </div>

      <!-- Expiration Notice -->
      <div style="
        background-color: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 24px;
      ">
        <p style="
          margin: 0;
          font-size: 14px;
          color: #856404;
        ">
          ⏰ ${t.expires}
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid ${color.border};
    ">
      <p style="
        margin: 0 0 12px 0;
        font-size: 14px;
        color: ${color.textMuted};
      ">
        ${t.ifNotRequested}
      </p>
      <p style="
        margin: 0;
        font-size: 12px;
        color: ${color.textMuted};
      ">
        <a href="mailto:${supportEmail}" style="
          color: ${color.buttonBackground};
          text-decoration: none;
        ">
          ${t.troubleSigningIn}
        </a>
      </p>
    </div>
  </div>
</body>
</html>
`;
};

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
export const fallbackEmail = ({
  url,
  host,
  t,
}: {
  url: string;
  host: string;
  t: (typeof translations)["en"];
}) => {
  return `${t.signInToAccount}\n\n${t.signInTo} ${host}\n\n${t.clickToSignIn}\n\n${url}\n\n${t.expires}\n\n${t.ifNotRequested}\n\n`;
};
