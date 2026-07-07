import Link from "next/link";
import { listMembers } from "@/lib/members/store";
import type { MemberStatus } from "@/lib/members/types";
import { approveMember, rejectMember } from "./actions";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 5;
const STATUS_FILTERS = ["ALL", "PENDING", "APPROVED", "REJECTED"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

function isStatusFilter(value: string): value is StatusFilter {
  return (STATUS_FILTERS as readonly string[]).includes(value);
}

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const params = await searchParams;
  const status: StatusFilter =
    params.status && isStatusFilter(params.status) ? params.status : "ALL";
  const page = Math.max(1, Number(params.page) || 1);

  const { items, total } = await listMembers({ status, page, pageSize: PAGE_SIZE });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-white">Members</h1>
        <p className="mt-1 text-white/60">
          Review membership applications submitted through the Join page.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <Link
            key={f}
            href={`/admin/members?status=${f}`}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              status === f
                ? "border-gold-horn bg-gold-horn/10 text-gold-bright"
                : "border-white/15 text-white/60 hover:border-white/30"
            }`}
          >
            {f.charAt(0) + f.slice(1).toLowerCase()}
          </Link>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-white/5 text-white/60">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Mobile</th>
              <th className="px-4 py-3 font-medium">County</th>
              <th className="px-4 py-3 font-medium">Applied</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {items.map((m) => (
              <tr key={m.id} className="text-white/85">
                <td className="px-4 py-3">{m.fullName}</td>
                <td className="px-4 py-3">{m.mobile}</td>
                <td className="px-4 py-3">{m.county}</td>
                <td className="px-4 py-3">
                  {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(
                    new Date(m.createdAt)
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={m.status} />
                </td>
                <td className="px-4 py-3">
                  {m.status === "PENDING" ? (
                    <div className="flex gap-2">
                      <form action={approveMember.bind(null, m.id)}>
                        <button
                          type="submit"
                          className="rounded-full bg-savanna/20 px-3 py-1 text-xs font-medium text-savanna hover:bg-savanna/30"
                        >
                          Approve
                        </button>
                      </form>
                      <form action={rejectMember.bind(null, m.id)}>
                        <button
                          type="submit"
                          className="rounded-full bg-ember/20 px-3 py-1 text-xs font-medium text-ember hover:bg-ember/30"
                        >
                          Reject
                        </button>
                      </form>
                    </div>
                  ) : (
                    <span className="text-white/40">—</span>
                  )}
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-white/50">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <PageLink status={status} page={page - 1} disabled={page <= 1}>
            Previous
          </PageLink>
          <span className="text-sm text-white/60">
            Page {page} of {totalPages}
          </span>
          <PageLink status={status} page={page + 1} disabled={page >= totalPages}>
            Next
          </PageLink>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: MemberStatus }) {
  const styles: Record<MemberStatus, string> = {
    PENDING: "bg-gold-horn/15 text-gold-bright",
    APPROVED: "bg-savanna/20 text-savanna",
    REJECTED: "bg-ember/20 text-ember",
  };
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

function PageLink({
  status,
  page,
  disabled,
  children,
}: {
  status: StatusFilter;
  page: number;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span className="cursor-not-allowed rounded-full border border-white/10 px-4 py-1.5 text-sm text-white/30">
        {children}
      </span>
    );
  }
  return (
    <Link
      href={`/admin/members?status=${status}&page=${page}`}
      className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/70 hover:border-gold-horn hover:text-gold-bright"
    >
      {children}
    </Link>
  );
}
