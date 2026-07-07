export type MemberStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Member {
  id: string;
  fullName: string;
  idNumber: string;
  dob: string; // ISO date (yyyy-mm-dd)
  mobile: string;
  postalAddress: string | null;
  sex: string;
  ethnicity: string | null;
  religion: string | null;
  isPwd: boolean;
  ncpwdNumber: string | null;
  county: string;
  constituency: string | null;
  ward: string | null;
  status: MemberStatus;
  createdAt: string; // ISO datetime
  reviewedAt: string | null;
}

export type NewMemberInput = Omit<Member, "id" | "status" | "createdAt" | "reviewedAt">;

export interface ListMembersParams {
  status?: MemberStatus | "ALL";
  page?: number;
  pageSize?: number;
}

export interface ListMembersResult {
  items: Member[];
  total: number;
}

export interface MemberCounts {
  PENDING: number;
  APPROVED: number;
  REJECTED: number;
  total: number;
}

/**
 * The data-access contract for members. `lib/members/store.ts` ships an
 * in-memory implementation of this; swap it for a database-backed one
 * (Prisma, Drizzle, raw SQL, etc.) without touching any caller — every
 * caller only ever imports the named functions from `store.ts`, not this
 * interface directly, so the "swap" is: reimplement these functions in
 * that one file.
 */
export interface MemberRepository {
  listMembers(params: ListMembersParams): Promise<ListMembersResult>;
  listAllMembers(status?: MemberStatus | "ALL"): Promise<Member[]>;
  getMemberCounts(): Promise<MemberCounts>;
  createMember(input: NewMemberInput): Promise<Member>;
  updateMemberStatus(id: string, status: MemberStatus): Promise<Member | null>;
}
