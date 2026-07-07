"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyCredentials } from "@/lib/auth/credentials";
import { createPendingToken, PENDING_COOKIE_NAME } from "@/lib/auth/tokens";
import { requestChallenge, isLockedOut, lockoutRemainingMs } from "@/lib/auth/otp-store";
import { sendOtpEmail } from "@/lib/mailer";
import { formatRetryAfter } from "@/lib/auth/format";

export type LoginState = { error?: string } | undefined;

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  if (isLockedOut()) {
    return {
      error: `Too many failed attempts. Try again in ${formatRetryAfter(lockoutRemainingMs())}.`,
    };
  }

  let valid: boolean;
  try {
    valid = await verifyCredentials(email, password);
  } catch {
    return { error: "Admin login isn't configured yet. Set ADMIN_EMAIL, ADMIN_PASSWORD_HASH and SESSION_SECRET." };
  }

  if (!valid) {
    return { error: "Invalid email or password." };
  }

  const result = await requestChallenge(email);
  if (!result.ok) {
    return { error: describeSendFailure(result) };
  }

  try {
    await sendOtpEmail(email, result.code);
  } catch {
    return { error: "Could not send the verification email. Try again shortly." };
  }

  const pendingToken = await createPendingToken(email);
  const cookieStore = await cookies();
  cookieStore.set(PENDING_COOKIE_NAME, pendingToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  redirect("/verify");
}

function describeSendFailure(result: { reason: string; retryAfterMs: number }) {
  const wait = formatRetryAfter(result.retryAfterMs);
  if (result.reason === "locked-out") return `Too many failed attempts. Try again in ${wait}.`;
  if (result.reason === "cooldown") return `Please wait ${wait} before requesting another code.`;
  return `Too many codes requested. Try again in ${wait}.`;
}
