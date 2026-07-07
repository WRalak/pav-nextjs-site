import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { getSessionSecret } from "./env";

export const PENDING_COOKIE_NAME = "admin_pending";
export const SESSION_COOKIE_NAME = "admin_session";

const PENDING_TTL = "10m";
const SESSION_TTL = "12h";

function secretKey() {
  return new TextEncoder().encode(getSessionSecret());
}

export async function createPendingToken(email: string) {
  return new SignJWT({ email, type: "pending" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(PENDING_TTL)
    .sign(secretKey());
}

export async function createSessionToken(email: string) {
  return new SignJWT({ email, type: "session" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_TTL)
    .sign(secretKey());
}

export async function verifyPendingToken(token: string): Promise<string> {
  const { payload } = await jwtVerify(token, secretKey());
  if (payload.type !== "pending" || typeof payload.email !== "string") {
    throw new Error("Invalid pending token");
  }
  return payload.email;
}

export async function verifySessionToken(token: string): Promise<string> {
  const { payload } = await jwtVerify(token, secretKey());
  if (payload.type !== "session" || typeof payload.email !== "string") {
    throw new Error("Invalid session token");
  }
  return payload.email;
}
