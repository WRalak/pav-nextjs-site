"use server";

import { createMember } from "@/lib/members/store";

export type SubmitMembershipState = { ok: true } | { ok: false; error: string } | undefined;

const MIN_AGE = 18;

function str(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isAtLeast18(dob: string) {
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return false;
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - MIN_AGE);
  return birth <= cutoff;
}

export async function submitMembership(
  _prevState: SubmitMembershipState,
  formData: FormData
): Promise<SubmitMembershipState> {
  const fullName = str(formData, "name");
  const idNumber = str(formData, "idNumber");
  const dob = str(formData, "dob");
  const mobile = str(formData, "mobile");
  const sex = str(formData, "sex");
  const county = str(formData, "county");

  if (!fullName || !idNumber || !dob || !mobile || !sex || !county) {
    return { ok: false, error: "Please fill in all required fields." };
  }

  if (!isAtLeast18(dob)) {
    return { ok: false, error: `You must be at least ${MIN_AGE} years old to join PAV.` };
  }

  try {
    await createMember({
      fullName,
      idNumber,
      dob,
      mobile,
      postalAddress: str(formData, "postalAddress") || null,
      sex,
      ethnicity: str(formData, "ethnicity") || null,
      religion: str(formData, "religion") || null,
      isPwd: formData.get("isPwd") === "on",
      ncpwdNumber: str(formData, "ncpwdNumber") || null,
      county,
      constituency: str(formData, "constituency") || null,
      ward: str(formData, "ward") || null,
    });
  } catch {
    return {
      ok: false,
      error: "We couldn't submit your details right now. Please try again shortly.",
    };
  }

  return { ok: true };
}
