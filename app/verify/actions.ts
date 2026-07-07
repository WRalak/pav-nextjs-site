"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  createSessionToken,
  verifyPendingToken,
  PENDING_COOKIE_NAME,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/tokens";
import { verifyCode, requestChallenge } from "@/lib/auth/otp-store";
import { sendOtpEmail } from "@/lib/mailer";
import { formatRetryAfter } from "@/lib/auth/format";

export type VerifyState = { error?: string; info?: string } | undefined;

async function getPendingEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(PENDING_COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    return await verifyPendingToken(token);
  } catch {
    return null;
  }
}

export async function verify(_prevState: VerifyState, formData: FormData): Promise<VerifyState> {
  const code = String(formData.get("code") || "").trim();
  const email = await getPendingEmail();

  if (!email) {
    return { error: "Your login session expired. Start again from the login page." };
  }

  const result = await verifyCode(email, code);

  if (!result.ok) {
    if (result.reason === "no-challenge") {
      return { error: "Your login session expired. Start again from the login page." };
    }
    if (result.reason === "expired") {
      return { error: "That code has expired. Request a new one." };
    }
    if (result.reason === "locked-out") {
      return {
        error: `Too many failed attempts. Try again in ${formatRetryAfter(result.retryAfterMs)}.`,
      };
    }
    return { error: `Incorrect code. ${result.attemptsRemaining} attempt(s) remaining.` };
  }

  const sessionToken = await createSessionToken(email);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  cookieStore.delete(PENDING_COOKIE_NAME);

  redirect("/admin");
}

export async function resendCode(): Promise<VerifyState> {
  const email = await getPendingEmail();
  if (!email) {
    return { error: "Your login session expired. Start again from the login page." };
  }

  const result = await requestChallenge(email);
  if (!result.ok) {
    const wait = formatRetryAfter(result.retryAfterMs);
    if (result.reason === "locked-out") {
      return { error: `Too many failed attempts. Try again in ${wait}.` };
    }
    if (result.reason === "cooldown") {
      return { error: `Please wait ${wait} before requesting another code.` };
    }
    return { error: `Too many codes requested. Try again in ${wait}.` };
  }

  try {
    await sendOtpEmail(email, result.code);
  } catch {
    return { error: "Could not send the verification email. Try again shortly." };
  }

  return { info: "A new code is on its way." };
}
