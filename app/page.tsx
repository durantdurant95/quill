import { isAuthenticated } from "@/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const userIsAuthenticated = await isAuthenticated();

  if (userIsAuthenticated) {
    redirect("/home");
  }

  // If not authenticated, render the landing page
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Welcome to Quill</h1>
          <p className="text-xl mb-8">
            Your journey starts here. Sign in to continue or create a new
            account.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/login">Sign In</Link>
            <Link href="/auth/sign-up">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
