"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  marketing: boolean;
  security: boolean;
  updates: boolean;
}

export function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    push: true,
    marketing: false,
    security: true,
    updates: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handlePreferenceChange = (
    key: keyof NotificationPreferences,
    value: boolean
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success("Notification preferences updated successfully");
  };

  const notificationTypes = [
    {
      key: "email" as keyof NotificationPreferences,
      title: "Email notifications",
      description: "Receive notifications via email",
    },
    {
      key: "push" as keyof NotificationPreferences,
      title: "Push notifications",
      description: "Receive push notifications in your browser",
    },
    {
      key: "security" as keyof NotificationPreferences,
      title: "Security alerts",
      description: "Important security and account notifications",
    },
    {
      key: "updates" as keyof NotificationPreferences,
      title: "Product updates",
      description: "Updates about new features and improvements",
    },
    {
      key: "marketing" as keyof NotificationPreferences,
      title: "Marketing emails",
      description: "Promotional content and newsletters",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {notificationTypes.map((type) => (
          <div key={type.key} className="flex items-center space-x-3">
            <Checkbox
              id={type.key}
              checked={preferences[type.key]}
              onCheckedChange={(checked) =>
                handlePreferenceChange(type.key, !!checked)
              }
            />
            <div className="space-y-1">
              <Label
                htmlFor={type.key}
                className="text-sm font-medium cursor-pointer"
              >
                {type.title}
              </Label>
              <p className="text-xs text-muted-foreground">
                {type.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleSave} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save preferences"}
      </Button>
    </div>
  );
}
