import { createClient } from "./client";

/**
 * Sign in a user with email and password
 */
export const signInWithPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

/**
 * Sign up a new user with email and password
 */
export const signUp = async ({
  email,
  password,
  emailRedirectTo,
}: {
  email: string;
  password: string;
  emailRedirectTo?: string;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: emailRedirectTo ? { emailRedirectTo } : undefined,
  });
  if (error) throw error;
  return data;
};

/**
 * Send password reset email
 */
export const resetPasswordForEmail = async ({
  email,
  redirectTo,
}: {
  email: string;
  redirectTo?: string;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo || `${window.location.origin}/auth/update-password`,
  });
  if (error) throw error;
  return data;
};

/**
 * Update user password
 */
export const updatePassword = async ({ password }: { password: string }) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
  return data;
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

/**
 * Sign in with OAuth provider
 */
export const signInWithOAuth = async (
  provider: "google" | "github" | "discord"
) => {
  const supabase = createClient();
  return supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (
  callback: (event: string, session: any) => void
) => {
  const supabase = createClient();
  return supabase.auth.onAuthStateChange(callback);
};

/**
 * Update user metadata
 */
export const updateUserMetadata = async (metadata: Record<string, any>) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.updateUser({
    data: metadata,
  });
  if (error) throw error;
  return data;
};
