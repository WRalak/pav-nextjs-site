import "server-only";
import bcrypt from "bcryptjs";

/**
 * Single-admin, single-process OTP state. Deliberately in-memory rather than
 * persisted: there's only ever one admin account, and this is meant to run
 * as one long-lived Node server. It will NOT work correctly across multiple
 * server instances or serverless invocations — if you deploy to a
 * multi-instance/serverless platform, back this with shared storage
 * (Redis, a database row, etc.) instead.
 */

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes
const RESEND_COOLDOWN_MS = 30 * 1000; // 30 seconds between sends
const RESEND_WINDOW_MS = 15 * 60 * 1000; // rolling window for resend cap
const MAX_SENDS_PER_WINDOW = 5;

type Challenge = {
  email: string;
  codeHash: string;
  expiresAt: number;
  attempts: number;
};

let challenge: Challenge | null = null;
let lockoutUntil: number | null = null;
let sendTimestamps: number[] = [];

function now() {
  return Date.now();
}

function pruneSendTimestamps() {
  const cutoff = now() - RESEND_WINDOW_MS;
  sendTimestamps = sendTimestamps.filter((t) => t > cutoff);
}

export function isLockedOut(): boolean {
  return lockoutUntil !== null && lockoutUntil > now();
}

export function lockoutRemainingMs(): number {
  if (!isLockedOut()) return 0;
  return Math.max(0, (lockoutUntil as number) - now());
}

export type SendFailure =
  | { ok: false; reason: "locked-out"; retryAfterMs: number }
  | { ok: false; reason: "cooldown"; retryAfterMs: number }
  | { ok: false; reason: "rate-limited"; retryAfterMs: number };

export type SendCheck = { ok: true } | SendFailure;

export function canSend(): SendCheck {
  if (isLockedOut()) {
    return { ok: false, reason: "locked-out", retryAfterMs: lockoutRemainingMs() };
  }

  pruneSendTimestamps();

  const last = sendTimestamps[sendTimestamps.length - 1];
  if (last !== undefined && now() - last < RESEND_COOLDOWN_MS) {
    return { ok: false, reason: "cooldown", retryAfterMs: RESEND_COOLDOWN_MS - (now() - last) };
  }

  if (sendTimestamps.length >= MAX_SENDS_PER_WINDOW) {
    const oldest = sendTimestamps[0];
    return { ok: false, reason: "rate-limited", retryAfterMs: RESEND_WINDOW_MS - (now() - oldest) };
  }

  return { ok: true };
}

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/**
 * Requests a fresh OTP for `email`, subject to the same lockout/cooldown/
 * rate-limit rules whether this is the initial send (login) or an explicit
 * resend — otherwise an attacker could dodge the resend limit by just
 * re-submitting the login form.
 */
export async function requestChallenge(
  email: string
): Promise<{ ok: true; code: string } | SendFailure> {
  const check = canSend();
  if (!check.ok) return check;

  const code = generateCode();
  const codeHash = await bcrypt.hash(code, 10);

  challenge = {
    email: email.trim().toLowerCase(),
    codeHash,
    expiresAt: now() + OTP_TTL_MS,
    attempts: 0,
  };
  sendTimestamps.push(now());

  return { ok: true, code };
}

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: "no-challenge" }
  | { ok: false; reason: "expired" }
  | { ok: false; reason: "locked-out"; retryAfterMs: number }
  | { ok: false; reason: "incorrect"; attemptsRemaining: number };

export async function verifyCode(email: string, code: string): Promise<VerifyResult> {
  if (isLockedOut()) {
    return { ok: false, reason: "locked-out", retryAfterMs: lockoutRemainingMs() };
  }

  if (!challenge || challenge.email !== email.trim().toLowerCase()) {
    return { ok: false, reason: "no-challenge" };
  }

  if (challenge.expiresAt < now()) {
    challenge = null;
    return { ok: false, reason: "expired" };
  }

  const match = await bcrypt.compare(code, challenge.codeHash);
  if (!match) {
    challenge.attempts += 1;
    if (challenge.attempts >= MAX_ATTEMPTS) {
      lockoutUntil = now() + LOCKOUT_MS;
      challenge = null;
      sendTimestamps = [];
      return { ok: false, reason: "locked-out", retryAfterMs: LOCKOUT_MS };
    }
    return { ok: false, reason: "incorrect", attemptsRemaining: MAX_ATTEMPTS - challenge.attempts };
  }

  challenge = null;
  lockoutUntil = null;
  sendTimestamps = [];
  return { ok: true };
}

export function clearChallenge() {
  challenge = null;
}
