import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Dictionary } from "@/lib/i18n/types";

export function SignoutButton({ dict }: { dict: Dictionary }) {
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
      {dict.auth?.signOut}
    </Button>
  );
}
