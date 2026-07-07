import "server-only";
import bcrypt from "bcryptjs";
import { getAdminEmail, getAdminPasswordHash } from "./env";

export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  const adminEmail = getAdminEmail();
  const adminHash = getAdminPasswordHash();

  if (email.trim().toLowerCase() !== adminEmail) {
    return false;
  }
  return bcrypt.compare(password, adminHash);
}
