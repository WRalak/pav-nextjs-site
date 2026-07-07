import "server-only";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set. Add it to your environment before using admin auth.`
    );
  }
  return value;
}

export function getAdminEmail() {
  return required("ADMIN_EMAIL").trim().toLowerCase();
}

export function getAdminPasswordHash() {
  return required("ADMIN_PASSWORD_HASH");
}

export function getSessionSecret() {
  return required("SESSION_SECRET");
}
