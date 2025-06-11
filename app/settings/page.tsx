import { ProfileForm } from "@/components/settings/profile-form";
import { getUser } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const { data, error } = await getUser();

  if (error || !data.user) {
    redirect("/auth/login");
  }

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <div className="space-y-6">
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <ProfileForm user={data.user} />
        </div>
      </div>
    </div>
  );
}
