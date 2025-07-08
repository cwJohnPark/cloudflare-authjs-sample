import { Metadata } from "next";
import { getDictionary } from "../../../../lib/dictionaries";
import { generateMetadataFromDictionary } from "@/lib/seo";
import { Shield, Eye, Cookie, Lock, Database, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: Promise<{ lang: "en" | "ko" | "ja" | "es" | "zh" }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const titles: Record<string, string> = {
    en: "Privacy Policy - Aioneers Data Protection",
    ko: "개인정보처리방침 - Aioneers 데이터 보호",
    ja: "プライバシーポリシー - Aioneers データ保護",
    es: "Política de Privacidad - Protección de Datos Aioneers",
    zh: "隐私政策 - Aioneers 数据保护",
  };

  const descriptions: Record<string, string> = {
    en: "Learn how Aioneers collects, uses, and protects your personal information. Comprehensive privacy policy compliant with GDPR and CCPA regulations.",
    ko: "Aioneers가 개인정보를 수집, 사용, 보호하는 방법을 알아보세요. GDPR 및 CCPA 규정을 준수하는 포괄적인 개인정보처리방침입니다.",
    ja: "Aioneersが個人情報をどのように収集、使用、保護するかをご覧ください。GDPRおよびCCPA規制に準拠した包括的なプライバシーポリシーです。",
    es: "Aprenda cómo Aioneers recopila, usa y protege su información personal. Política de privacidad integral que cumple con las regulaciones GDPR y CCPA.",
    zh: "了解 Aioneers 如何收集、使用和保护您的个人信息。符合 GDPR 和 CCPA 法规的综合隐私政策。",
  };

  return generateMetadataFromDictionary(dict, "account", lang, "/privacy");
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: December 2024",
      sections: {
        intro: {
          title: "Introduction",
          content:
            "At Aioneers, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.",
        },
        dataCollection: {
          title: "Information We Collect",
          content:
            "We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This may include your name, email address, and usage data.",
        },
        dataUsage: {
          title: "How We Use Your Information",
          content:
            "We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.",
        },
        dataSecurity: {
          title: "Data Security",
          content:
            "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        },
        cookies: {
          title: "Cookies and Tracking",
          content:
            "We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and personalize content. You can control cookie preferences through our cookie consent manager.",
        },
        yourRights: {
          title: "Your Privacy Rights",
          content:
            "Depending on your location, you may have certain rights regarding your personal information, including the right to access, update, or delete your data.",
        },
        contact: {
          title: "Contact Us",
          content:
            "If you have any questions about this Privacy Policy, please contact us at privacy@aioneers.com",
        },
      },
    },
    ko: {
      title: "개인정보처리방침",
      lastUpdated: "최종 업데이트: 2024년 12월",
      sections: {
        intro: {
          title: "개요",
          content:
            "Aioneers는 고객의 개인정보 보호와 개인정보의 보안을 보장하는 데 최선을 다하고 있습니다. 본 개인정보처리방침은 고객이 저희 서비스를 이용할 때 개인정보를 수집, 사용, 공개 및 보호하는 방법을 설명합니다.",
        },
        dataCollection: {
          title: "수집하는 정보",
          content:
            "계정 생성, 서비스 이용, 문의 시 고객이 직접 제공하는 정보를 수집합니다. 여기에는 성명, 이메일 주소, 사용 데이터가 포함될 수 있습니다.",
        },
        dataUsage: {
          title: "정보 사용 방법",
          content:
            "수집된 정보는 서비스 제공, 유지, 개선과 고객과의 소통, 법적 의무 준수를 위해 사용됩니다.",
        },
        dataSecurity: {
          title: "데이터 보안",
          content:
            "무단 접근, 변경, 공개, 파기로부터 개인정보를 보호하기 위해 적절한 기술적, 조직적 조치를 구현하고 있습니다.",
        },
        cookies: {
          title: "쿠키 및 추적",
          content:
            "사용자 경험 향상, 사용 패턴 분석, 콘텐츠 개인화를 위해 쿠키 및 유사한 추적 기술을 사용합니다. 쿠키 동의 관리자를 통해 쿠키 설정을 제어할 수 있습니다.",
        },
        yourRights: {
          title: "개인정보 권리",
          content:
            "거주 지역에 따라 개인정보에 대한 특정 권리가 있을 수 있으며, 여기에는 데이터 액세스, 업데이트, 삭제 권리가 포함됩니다.",
        },
        contact: {
          title: "문의하기",
          content:
            "본 개인정보처리방침에 대한 질문이 있으시면 privacy@aioneers.com으로 문의해 주세요.",
        },
      },
    },
  };

  const currentContent = content[lang] || content.en;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">{currentContent.title}</h1>
          </div>
          <p className="text-muted-foreground">{currentContent.lastUpdated}</p>
          <div className="flex justify-center gap-2">
            <Badge variant="outline">GDPR 준수</Badge>
            <Badge variant="outline">CCPA 준수</Badge>
          </div>
        </div>

        {/* 개요 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              {currentContent.sections.intro.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {currentContent.sections.intro.content}
            </p>
          </CardContent>
        </Card>

        {/* 데이터 수집 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              {currentContent.sections.dataCollection.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {currentContent.sections.dataCollection.content}
            </p>
          </CardContent>
        </Card>

        {/* 데이터 사용 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              {currentContent.sections.dataUsage.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {currentContent.sections.dataUsage.content}
            </p>
          </CardContent>
        </Card>

        {/* 데이터 보안 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              {currentContent.sections.dataSecurity.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {currentContent.sections.dataSecurity.content}
            </p>
          </CardContent>
        </Card>

        {/* 쿠키 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5" />
              {currentContent.sections.cookies.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {currentContent.sections.cookies.content}
            </p>
          </CardContent>
        </Card>

        {/* 권리 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {currentContent.sections.yourRights.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {currentContent.sections.yourRights.content}
            </p>
          </CardContent>
        </Card>

        {/* 연락처 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              {currentContent.sections.contact.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {currentContent.sections.contact.content}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
