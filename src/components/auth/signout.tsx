import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export function SignoutButton() {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      로그아웃
    </Button>
  );
}
