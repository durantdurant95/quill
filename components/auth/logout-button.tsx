"use client";

import { signOut } from "@/supabase/auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const logout = () => {
    setIsLoggingOut(true);
    toast.promise(signOut(), {
      loading: "Logging out...",
      success: () => {
        router.push("/auth/login");
        return "Successfully logged out!";
      },
      error: "Failed to logout. Please try again.",
    });
    setIsLoggingOut(false);
  };
  return (
    <DropdownMenuItem onClick={logout} disabled={isLoggingOut}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
}
