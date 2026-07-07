import Link from "next/link";
import { getMemberCounts } from "@/lib/members/store";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const counts = await getMemberCounts();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-white">Dashboard</h1>
        <p className="mt-1 text-white/60">
          Overview of membership applications and site content.
        </p>
      </div>

      <p className="rounded-lg border border-gold-horn/30 bg-gold-horn/5 px-4 py-3 text-sm text-gold-bright">
        Login, membership applications and page content all read/write
        through in-memory repositories (see the README&rsquo;s &ldquo;Backend
        integration&rdquo; section) — they reset on server restart until a
        real database is wired in behind them.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pending review" value={counts.PENDING} />
        <StatCard label="Approved members" value={counts.APPROVED} />
        <StatCard label="Rejected" value={counts.REJECTED} />
        <StatCard label="Total applications" value={counts.total} />
      </div>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/admin/members"
          className="rounded-full bg-gold-horn px-6 py-2.5 text-sm font-medium text-purple-void hover:bg-gold-bright"
        >
          Review members
        </Link>
        <Link
          href="/admin/content"
          className="rounded-full border border-white/25 px-6 py-2.5 text-sm font-medium text-white hover:border-gold-horn hover:text-gold-bright"
        >
          Edit page content
        </Link>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm text-white/60">{label}</p>
      <p className="mt-2 font-display text-3xl text-white">{value}</p>
    </div>
  );
}
