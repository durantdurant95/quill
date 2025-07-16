"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function AppearanceSettings() {
  const [compactMode, setCompactMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <div className="space-y-6">
      {/* Theme */}
      <div className="space-y-3">
        <div>
          <Label className="text-base font-medium">Theme</Label>
          <p className="text-sm text-muted-foreground">
            Choose your preferred color scheme.
          </p>
        </div>
        <ThemeSwitcher />
      </div>

      {/* Interface Options */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Interface</Label>
          <p className="text-sm text-muted-foreground">
            Customize your interface preferences.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="compact-mode"
              checked={compactMode}
              onCheckedChange={(checked) => setCompactMode(!!checked)}
            />
            <div className="space-y-1">
              <Label
                htmlFor="compact-mode"
                className="text-sm font-medium cursor-pointer"
              >
                Compact mode
              </Label>
              <p className="text-xs text-muted-foreground">
                Use a more condensed layout with smaller spacing.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="reduced-motion"
              checked={reducedMotion}
              onCheckedChange={(checked) => setReducedMotion(!!checked)}
            />
            <div className="space-y-1">
              <Label
                htmlFor="reduced-motion"
                className="text-sm font-medium cursor-pointer"
              >
                Reduce motion
              </Label>
              <p className="text-xs text-muted-foreground">
                Minimize animations and transitions throughout the app.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
