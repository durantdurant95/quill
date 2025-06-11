import { createClient } from "./client";
import type { Database } from "./database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

/**
 * Get the profile for the current user
 */
export async function getProfile() {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user.user) {
    throw userError || new Error("User not found");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.user.id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get a profile by user ID
 */
export async function getProfileById(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update the current user's profile
 */
export async function updateProfile(profile: ProfileUpdate) {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user.user) {
    throw userError || new Error("User not found");
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", user.user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update the username for the current user
 */
export async function updateUsername(username: string) {
  return updateProfile({ username });
}
