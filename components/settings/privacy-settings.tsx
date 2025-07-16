"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface PrivacyPreferences {
  analytics: boolean;
  crashReports: boolean;
  personalizedAds: boolean;
  dataSharing: boolean;
  profileVisibility: boolean;
}

export function PrivacySettings() {
  const [preferences, setPreferences] = useState<PrivacyPreferences>({
    analytics: false,
    crashReports: true,
    personalizedAds: false,
    dataSharing: false,
    profileVisibility: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handlePreferenceChange = (
    key: keyof PrivacyPreferences,
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
    toast.success("Privacy preferences updated successfully");
  };

  const privacyOptions = [
    {
      key: "analytics" as keyof PrivacyPreferences,
      title: "Usage analytics",
      description: "Help improve the app by sharing anonymous usage data",
    },
    {
      key: "crashReports" as keyof PrivacyPreferences,
      title: "Crash reports",
      description: "Automatically send crash reports to help us fix issues",
    },
    {
      key: "personalizedAds" as keyof PrivacyPreferences,
      title: "Personalized advertising",
      description: "Allow personalized ads based on your activity",
    },
    {
      key: "dataSharing" as keyof PrivacyPreferences,
      title: "Data sharing with partners",
      description: "Share anonymized data with trusted partners for research",
    },
    {
      key: "profileVisibility" as keyof PrivacyPreferences,
      title: "Public profile",
      description: "Make your profile visible to other users",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {privacyOptions.map((option) => (
          <div key={option.key} className="flex items-center space-x-3">
            <Checkbox
              id={option.key}
              checked={preferences[option.key]}
              onCheckedChange={(checked) =>
                handlePreferenceChange(option.key, !!checked)
              }
            />
            <div className="space-y-1">
              <Label
                htmlFor={option.key}
                className="text-sm font-medium cursor-pointer"
              >
                {option.title}
              </Label>
              <p className="text-xs text-muted-foreground">
                {option.description}
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
