import { AppearanceSettings } from "@/components/settings/appearance-settings";
import { DataSettings } from "@/components/settings/data-settings";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { PrivacySettings } from "@/components/settings/privacy-settings";
import { SecuritySettings } from "@/components/settings/security-settings";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { data, error } = await getUser();

  if (error || !data.user) {
    redirect("/auth/login");
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Separator />

        <div className="space-y-8">
          {/* Appearance Settings */}
          <section>
            <div className="bg-card rounded-lg border p-6">
              <div className="space-y-1 mb-6">
                <h2 className="text-xl font-semibold">Appearance</h2>
                <p className="text-sm text-muted-foreground">
                  Customize how the application looks and feels.
                </p>
              </div>
              <AppearanceSettings />
            </div>
          </section>

          {/* Notification Settings */}
          <section>
            <div className="bg-card rounded-lg border p-6">
              <div className="space-y-1 mb-6">
                <h2 className="text-xl font-semibold">Notifications</h2>
                <p className="text-sm text-muted-foreground">
                  Configure how you receive notifications.
                </p>
              </div>
              <NotificationSettings />
            </div>
          </section>

          {/* Privacy Settings */}
          <section>
            <div className="bg-card rounded-lg border p-6">
              <div className="space-y-1 mb-6">
                <h2 className="text-xl font-semibold">Privacy</h2>
                <p className="text-sm text-muted-foreground">
                  Control your privacy and data sharing preferences.
                </p>
              </div>
              <PrivacySettings />
            </div>
          </section>

          {/* Security Settings */}
          <section>
            <div className="bg-card rounded-lg border p-6">
              <div className="space-y-1 mb-6">
                <h2 className="text-xl font-semibold">Security</h2>
                <p className="text-sm text-muted-foreground">
                  Manage your account security and authentication.
                </p>
              </div>
              <SecuritySettings user={data.user} />
            </div>
          </section>

          {/* Data & Storage Settings */}
          <section>
            <div className="bg-card rounded-lg border p-6">
              <div className="space-y-1 mb-6">
                <h2 className="text-xl font-semibold">Data & Storage</h2>
                <p className="text-sm text-muted-foreground">
                  Manage your data, exports, and account.
                </p>
              </div>
              <DataSettings user={data.user} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
