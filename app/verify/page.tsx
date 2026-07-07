import type { Metadata } from "next";
import { VerifyForm } from "./VerifyForm";

export const metadata: Metadata = {
  title: "Verify — Admin",
};

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-purple-void px-6 py-16">
      <div className="w-full max-w-sm">
        <p className="chapter-eyebrow text-center">Admin</p>
        <h1 className="mt-2 text-center font-display text-3xl text-white">
          Check your email
        </h1>
        <p className="mt-2 text-center text-sm text-white/60">
          Enter the 6-digit verification code we just sent you. It expires in
          5 minutes.
        </p>
        <div className="mt-8">
          <VerifyForm />
        </div>
      </div>
    </div>
  );
}
