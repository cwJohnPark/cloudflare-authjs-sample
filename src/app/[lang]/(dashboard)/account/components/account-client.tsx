"use client";

import { SignoutButton } from "@/components/auth/signout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AtSign, Mail, Edit2 } from "lucide-react";
import { Dictionary } from "@/lib/i18n/types";
import { useState } from "react";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
};

type AccountClientProps = {
  dict: Dictionary;
  user: User;
};

export function AccountClient({ dict, user }: AccountClientProps) {
  const [currentUser, setCurrentUser] = useState<User>(user);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");
  const [isLoading, setIsLoading] = useState(false);

  // 이름 변경 핸들러
  const handleNameChange = async () => {
    if (!newName.trim()) return;

    setIsLoading(true);
    try {
      const response = await updateUser(newName);

      if (response.ok) {
        setIsEditingName(false);
        // 사용자 정보 업데이트
        setCurrentUser((prevUser) => ({ ...prevUser, name: newName.trim() }));
      } else {
        const error = (await response.json()) as { error?: string };
        alert(error.error || "Error changing name");
      }
    } catch (error) {
      console.error("Error changing name:", error);
      alert("이름 변경 중 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  // 편집 취소 핸들러
  const handleCancelEdit = () => {
    setNewName(currentUser?.name || "");
    setIsEditingName(false);
  };

  return (
    <div className="flex flex-col">
      <div className="@container/main flex flex-1 flex-col">
        <div className="flex flex-col py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={currentUser?.image || ""}
                    alt={currentUser?.name || ""}
                  />
                  <AvatarFallback className="text-lg">
                    {getInitials(currentUser?.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">
                {currentUser?.name || dict.account?.noName || "No name"}
              </CardTitle>
              <Badge variant="secondary" className="w-fit mx-auto mt-2">
                {getProvider(currentUser?.email, dict)}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Edit2 className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <Label htmlFor="name" className="text-sm font-medium">
                      {dict.account?.name}
                    </Label>
                    {isEditingName ? (
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          id="name"
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder={dict.account?.name}
                          className="flex-1"
                          maxLength={50}
                        />
                        <Button
                          onClick={handleNameChange}
                          disabled={isLoading || !newName.trim()}
                          size="sm"
                        >
                          {isLoading
                            ? dict.common?.loading
                            : dict.account?.save}
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          variant="outline"
                          size="sm"
                          disabled={isLoading}
                        >
                          {dict.account?.cancel}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-muted-foreground flex-1">
                          {currentUser?.name || dict.account?.noName}
                        </p>
                        <Button
                          onClick={() => setIsEditingName(true)}
                          variant="outline"
                          size="sm"
                        >
                          {dict.common?.edit}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{dict.account?.email}</p>
                    <p className="text-sm text-muted-foreground">
                      {currentUser?.email || dict.account?.noEmail}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AtSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      {dict.account?.connection}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getProvider(currentUser?.email, dict)}{" "}
                      {dict.account?.connected}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center">
          <SignoutButton dict={dict} />
        </div>
      </div>
    </div>
  );
}

const updateUser = async (newName: string) => {
  return await fetch("/api/accounts", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName.trim() }),
  });
};

// 이메일에서 제공자 추출 (간단한 로직)
const getProvider = (email: string | null | undefined, dict: Dictionary) => {
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
