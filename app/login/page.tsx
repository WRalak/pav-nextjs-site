import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-void px-6 py-16">
      <div className="w-full max-w-sm">
        <p className="chapter-eyebrow text-center">Admin</p>
        <h1 className="mt-2 text-center font-display text-3xl text-white">Sign in</h1>
        <p className="mt-2 text-center text-sm text-white/60">
          We&rsquo;ll email a verification code to confirm it&rsquo;s you.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
