"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ConsentState,
  getStoredConsent,
  hasValidConsent,
  isCCPARegion,
  isGDPRRegion,
  storeConsent,
} from "@/lib/analytics";
import { Cookie, Shield, X } from "lucide-react";
import { useEffect, useState } from "react";

interface CookieConsentProps {
  dictionary: {
    title: string;
    description: string;
    necessary: string;
    analytics: string;
    marketing: string;
    functional: string;
    acceptAll: string;
    acceptSelected: string;
    rejectAll: string;
    showPreferences: string;
    hidePreferences: string;
    necessaryDescription: string;
    analyticsDescription: string;
    marketingDescription: string;
    functionalDescription: string;
    gdprNotice: string;
    ccpaNotice: string;
  };
}

export function CookieConsent({ dictionary }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    analytics: false,
    marketing: false,
    functional: false,
    timestamp: Date.now(),
  });

  const isGDPR = isGDPRRegion();
  const isCCPA = isCCPARegion();

  useEffect(() => {
    // 동의가 필요한 지역이고 유효한 동의가 없으면 배너 표시
    if (!hasValidConsent()) {
      setShowBanner(true);
    }

    // 기존 동의 설정 로드
    const existingConsent = getStoredConsent();
    if (existingConsent) {
      setConsent(existingConsent);
    }
  }, []);

  const handleAcceptAll = () => {
    const newConsent: ConsentState = {
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: Date.now(),
    };

    setConsent(newConsent);
    storeConsent(newConsent);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleRejectAll = () => {
    const newConsent: ConsentState = {
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: Date.now(),
    };

    setConsent(newConsent);
    storeConsent(newConsent);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleAcceptSelected = () => {
    const newConsent: ConsentState = {
      ...consent,
      timestamp: Date.now(),
    };

    storeConsent(newConsent);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const updateConsent = (type: keyof ConsentState, value: boolean) => {
    if (type === "timestamp") return;

    setConsent((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <Cookie className="h-5 w-5" />
            <CardTitle className="text-lg">{dictionary.title}</CardTitle>
            {isGDPR && <Badge variant="outline">GDPR</Badge>}
            {isCCPA && <Badge variant="outline">CCPA</Badge>}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBanner(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {dictionary.description}
          </p>

          {isGDPR && (
            <p className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
              <Shield className="h-3 w-3 inline mr-1" />
              {dictionary.gdprNotice}
            </p>
          )}

          {isCCPA && (
            <p className="text-xs text-muted-foreground bg-yellow-50 p-2 rounded">
              <Shield className="h-3 w-3 inline mr-1" />
              {dictionary.ccpaNotice}
            </p>
          )}

          {showPreferences && (
            <div className="space-y-3 border-t pt-4">
              {/* 필수 쿠키 */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">
                      {`${dictionary.necessary} *`}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {dictionary.necessaryDescription}
                  </p>
                </div>
                <Checkbox checked={true} disabled />
              </div>

              {/* 분석 쿠키 */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">
                    {dictionary.analytics}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {dictionary.analyticsDescription}
                  </p>
                </div>
                <Checkbox
                  checked={consent.analytics}
                  onCheckedChange={(checked) =>
                    updateConsent("analytics", !!checked)
                  }
                />
              </div>

              {/* 마케팅 쿠키 */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">
                    {dictionary.marketing}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {dictionary.marketingDescription}
                  </p>
                </div>
                <Checkbox
                  checked={consent.marketing}
                  onCheckedChange={(checked) =>
                    updateConsent("marketing", !!checked)
                  }
                />
              </div>

              {/* 기능 쿠키 */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">
                    {dictionary.functional}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {dictionary.functionalDescription}
                  </p>
                </div>
                <Checkbox
                  checked={consent.functional}
                  onCheckedChange={(checked) =>
                    updateConsent("functional", !!checked)
                  }
                />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button onClick={handleAcceptAll} className="flex-1">
              {dictionary.acceptAll}
            </Button>

            {showPreferences ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleAcceptSelected}
                  className="flex-1"
                >
                  {dictionary.acceptSelected}
                </Button>
                <Button variant="ghost" onClick={handleRejectAll}>
                  {dictionary.rejectAll}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowPreferences(true)}
                  className="flex-1"
                >
                  {dictionary.showPreferences}
                </Button>
                <Button variant="ghost" onClick={handleRejectAll}>
                  {dictionary.rejectAll}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
