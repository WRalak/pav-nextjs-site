"use server";

import { revalidatePath } from "next/cache";
import { updateMemberStatus } from "@/lib/members/store";

export async function approveMember(id: string) {
  await updateMemberStatus(id, "APPROVED");
  revalidatePath("/admin/members");
  revalidatePath("/admin");
}

export async function rejectMember(id: string) {
  await updateMemberStatus(id, "REJECTED");
  revalidatePath("/admin/members");
  revalidatePath("/admin");
}
