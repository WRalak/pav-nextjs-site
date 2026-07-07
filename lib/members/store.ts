import "server-only";
import type {
  Member,
  MemberCounts,
  MemberStatus,
  ListMembersParams,
  ListMembersResult,
  NewMemberInput,
} from "./types";

/**
 * In-memory implementation of the member repository (see `./types`'s
 * `MemberRepository` for the contract). Data lives in a module-level array
 * for the lifetime of the Node process — fine for local development and
 * demos, but it resets on every server restart and won't work across
 * multiple instances/serverless invocations.
 *
 * To back this with a real database: reimplement each exported function
 * below against your DB client, keeping the same signatures. Every caller
 * (admin pages, server actions, the join form) only imports from this
 * file, so no other code needs to change.
 */

let nextId = 9;

const members: Member[] = [
  seed("1", "Amina Wanjiru", "0712 345 678", "Nairobi", "2026-06-02", "PENDING"),
  seed("2", "Brian Otieno", "0723 456 789", "Kisumu", "2026-06-04", "APPROVED"),
  seed("3", "Grace Chebet", "0734 567 890", "Uasin Gishu", "2026-06-06", "PENDING"),
  seed("4", "David Mwangi", "0745 678 901", "Kiambu", "2026-06-10", "REJECTED"),
  seed("5", "Fatuma Hassan", "0756 789 012", "Mombasa", "2026-06-14", "APPROVED"),
  seed("6", "Peter Kamau", "0767 890 123", "Nakuru", "2026-06-18", "PENDING"),
  seed("7", "Lucy Achieng", "0778 901 234", "Migori", "2026-06-21", "PENDING"),
  seed("8", "Samuel Kiptoo", "0789 012 345", "Bomet", "2026-06-25", "APPROVED"),
];

function seed(
  id: string,
  fullName: string,
  mobile: string,
  county: string,
  createdAt: string,
  status: MemberStatus
): Member {
  return {
    id,
    fullName,
    idNumber: "00000000",
    dob: "1990-01-01",
    mobile,
    postalAddress: null,
    sex: "Female",
    ethnicity: null,
    religion: null,
    isPwd: false,
    ncpwdNumber: null,
    county,
    constituency: null,
    ward: null,
    status,
    createdAt: `${createdAt}T00:00:00.000Z`,
    reviewedAt: status === "PENDING" ? null : `${createdAt}T00:00:00.000Z`,
  };
}

export async function listMembers({
  status = "ALL",
  page = 1,
  pageSize = 20,
}: ListMembersParams): Promise<ListMembersResult> {
  const filtered =
    status === "ALL" ? members : members.filter((m) => m.status === status);

  const sorted = [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const start = (page - 1) * pageSize;
  const items = sorted.slice(start, start + pageSize);

  return { items, total: filtered.length };
}

export async function listAllMembers(
  status: MemberStatus | "ALL" = "ALL"
): Promise<Member[]> {
  const filtered =
    status === "ALL" ? members : members.filter((m) => m.status === status);
  return [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getMemberCounts(): Promise<MemberCounts> {
  const counts: MemberCounts = { PENDING: 0, APPROVED: 0, REJECTED: 0, total: members.length };
  for (const m of members) counts[m.status]++;
  return counts;
}

export async function createMember(input: NewMemberInput): Promise<Member> {
  const member: Member = {
    ...input,
    id: String(nextId++),
    status: "PENDING",
    createdAt: new Date().toISOString(),
    reviewedAt: null,
  };
  members.unshift(member);
  return member;
}

export async function updateMemberStatus(
  id: string,
  status: MemberStatus
): Promise<Member | null> {
  const member = members.find((m) => m.id === id);
  if (!member) return null;
  member.status = status;
  member.reviewedAt = new Date().toISOString();
  return member;
}
