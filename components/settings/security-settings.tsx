"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User } from "@supabase/supabase-js";
import { Clock, Key, Shield, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SecuritySettingsProps {
  user: User;
}

export function SecuritySettings({ user }: SecuritySettingsProps) {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = () => {
    // In a real app, this would redirect to change password flow
    toast.info("Redirecting to password change...");
  };

  const handleToggle2FA = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsTwoFactorEnabled(!isTwoFactorEnabled);
    setIsLoading(false);
    toast.success(
      isTwoFactorEnabled
        ? "Two-factor authentication disabled"
        : "Two-factor authentication enabled"
    );
  };

  const handleSignOutAllDevices = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success("Signed out of all devices");
  };

  const lastSignIn = user.last_sign_in_at
    ? new Date(user.last_sign_in_at).toLocaleDateString()
    : "Never";

  return (
    <div className="space-y-6">
      {/* Password */}
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          <Key className="h-5 w-5 text-muted-foreground" />
          <div>
            <Label className="text-sm font-medium">Password</Label>
            <p className="text-xs text-muted-foreground">Last changed: Never</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleChangePassword}>
          Change password
        </Button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          <Smartphone className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium">
                Two-factor authentication
              </Label>
              <Badge variant={isTwoFactorEnabled ? "default" : "secondary"}>
                {isTwoFactorEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
        </div>
        <Button
          variant={isTwoFactorEnabled ? "destructive" : "default"}
          onClick={handleToggle2FA}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : isTwoFactorEnabled ? "Disable" : "Enable"}
        </Button>
      </div>

      {/* Account Info */}
      <div className="p-4 border rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <Label className="text-sm font-medium">Account Security</Label>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Account created:</span>
            <span>{new Date(user.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Last sign in:</span>
            <span>{lastSignIn}</span>
          </div>
          <div className="flex justify-between">
            <span>Email verified:</span>
            <Badge
              variant={user.email_confirmed_at ? "default" : "destructive"}
            >
              {user.email_confirmed_at ? "Verified" : "Unverified"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Session Management */}
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <div>
            <Label className="text-sm font-medium">Active sessions</Label>
            <p className="text-xs text-muted-foreground">
              Sign out of all devices except this one
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleSignOutAllDevices}
          disabled={isLoading}
        >
          {isLoading ? "Signing out..." : "Sign out all devices"}
        </Button>
      </div>
    </div>
  );
}
