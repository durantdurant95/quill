"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProfile, updateUsername } from "@/supabase/profiles";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [username, setUsername] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const router = useRouter();

  // Fetch the current profile data when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        if (profile?.username) {
          setUsername(profile.username);
        }
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      await updateUsername(username);

      setMessage({
        type: "success",
        text: "Your username has been updated successfully.",
      });

      // Refresh the page to show updated data
      startTransition(() => {
        router.refresh();
      });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to update profile",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div
          className={`p-4 mb-4 rounded-md ${
            message.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={user.email || ""}
          disabled
          className="bg-muted"
        />
        <p className="text-sm text-muted-foreground">
          Your email address cannot be changed.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <p className="text-sm text-muted-foreground">
          This is your public display name. It can be changed at any time.
        </p>
      </div>

      <Button type="submit" className="mt-4" disabled={isLoading || isPending}>
        {isLoading ? "Updating..." : "Update profile"}
      </Button>
    </form>
  );
}
