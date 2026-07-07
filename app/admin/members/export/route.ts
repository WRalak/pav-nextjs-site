import { NextResponse, type NextRequest } from "next/server";
import { listAllMembers } from "@/lib/members/store";
import type { MemberStatus } from "@/lib/members/types";
import { toCsv } from "@/lib/csv";

const STATUS_VALUES = ["PENDING", "APPROVED", "REJECTED"] as const;

function parseStatus(value: string | null): MemberStatus | "ALL" {
  if (value && (STATUS_VALUES as readonly string[]).includes(value)) {
    return value as MemberStatus;
  }
  return "ALL";
}

export async function GET(request: NextRequest) {
  const status = parseStatus(request.nextUrl.searchParams.get("status"));
  const members = await listAllMembers(status);

  const csv = toCsv(members, [
    { key: "fullName", label: "Full name" },
    { key: "idNumber", label: "ID / Passport number" },
    { key: "dob", label: "Date of birth" },
    { key: "mobile", label: "Mobile" },
    { key: "postalAddress", label: "Postal address" },
    { key: "sex", label: "Sex" },
    { key: "ethnicity", label: "Ethnicity" },
    { key: "religion", label: "Religion" },
    { key: "isPwd", label: "PWD" },
    { key: "ncpwdNumber", label: "NCPWD number" },
    { key: "county", label: "County" },
    { key: "constituency", label: "Constituency" },
    { key: "ward", label: "Ward" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Applied at" },
    { key: "reviewedAt", label: "Reviewed at" },
  ]);

  const datestamp = new Date().toISOString().slice(0, 10);
  const filename = `members-${status.toLowerCase()}-${datestamp}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
