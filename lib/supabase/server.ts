import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

/**
 * Get the current user on the server side
 */
export async function getUser() {
  const supabase = await createClient();
  return supabase.auth.getUser();
}

/**
 * Get the current session on the server side
 */
export async function getSession() {
  const supabase = await createClient();
  return supabase.auth.getSession();
}

/**
 * Check if user is authenticated on the server side
 */
export async function isAuthenticated(): Promise<boolean> {
  const {
    data: { session },
  } = await getSession();
  return !!session;
}
