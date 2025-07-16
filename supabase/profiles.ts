import { createClient } from "./client";
import type { Database } from "./database.types";

type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];

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
 * Get a profile by username
 */
export async function getProfileByUsername(username: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Create or update the current user's profile
 */
export async function upsertProfile(profile: Omit<ProfileInsert, "id">) {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user.user) {
    throw userError || new Error("User not found");
  }

  const profileData: ProfileInsert = {
    ...profile,
    id: user.user.id,
  };

  const { data, error } = await supabase
    .from("profiles")
    .upsert(profileData)
    .select()
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

/**
 * Update the display name for the current user
 */
export async function updateDisplayName(display_name: string) {
  return updateProfile({ display_name });
}

/**
 * Update the avatar URL for the current user
 */
export async function updateAvatarUrl(avatar_url: string) {
  return updateProfile({ avatar_url });
}

/**
 * Update the bio for the current user
 */
export async function updateBio(bio: string) {
  return updateProfile({ bio });
}

/**
 * Update multiple profile fields at once
 */
export async function updateFullProfile({
  username,
  display_name,
  avatar_url,
  bio,
  website,
  location,
}: {
  username?: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  location?: string;
}) {
  return updateProfile({
    username,
    display_name,
    avatar_url,
    bio,
    website,
    location,
  });
}

/**
 * Check if a username is available
 */
export async function checkUsernameAvailability(username: string) {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  // If no error and data exists, username is taken (unless it's the current user)
  if (data && user.user && data.id !== user.user.id) {
    return false; // Username is taken
  }

  // If error is 'PGRST116' (no rows returned), username is available
  if (error && error.code === "PGRST116") {
    return true; // Username is available
  }

  // If it's the current user's username, it's available for them
  if (data && user.user && data.id === user.user.id) {
    return true;
  }

  return true; // Default to available if we can't determine
}
