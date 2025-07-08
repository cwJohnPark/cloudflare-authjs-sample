"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SignoutButton } from "@/components/auth/signout";
import { SiteHeader } from "@/components/site-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AtSign, Mail } from "lucide-react";
import { Session } from "next-auth";
import { Dictionary } from "../../lib/types";

type AccountClientProps = {
  dict: Dictionary;
  session: Session;
};

export function AccountClient({ dict, session }: AccountClientProps) {
  const { user } = session;

  // 이메일에서 제공자 추출 (간단한 로직)
  const getProvider = (email: string | null | undefined) => {
    if (!email) return dict.account?.unknown || "Unknown";
    if (email.includes("gmail")) return "Google";
    if (email.includes("icloud") || email.includes("me.com")) return "Apple";
    return "Email";
  };

  // 이름의 첫 글자들로 이니셜 생성
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" dict={dict}/>
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col">
          <div className="@container/main flex flex-1 flex-col">
            <div className="flex flex-col py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                  {dict.account?.title || "Account Settings"}
                </h1>
              </div>

              <Card className="max-w-4xl mx-auto">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={user?.image || ""}
                        alt={user?.name || ""}
                      />
                      <AvatarFallback className="text-lg">
                        {getInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-xl">
                    {user?.name || dict.account?.noName || "이름 없음"}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto mt-2">
                    {getProvider(user?.email)}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          {dict.account?.email || "이메일"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user?.email ||
                            dict.account?.noEmail ||
                            "이메일 없음"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <AtSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          {dict.account?.connection || "계정 연결"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {getProvider(user?.email)}{" "}
                          {dict.account?.connected || "연결됨"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center">
              <SignoutButton />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
