import Link from "next/link";
import { getCurrentAdminEmail } from "@/lib/auth/session";
import { logout } from "./actions";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/members", label: "Members" },
  { href: "/admin/content", label: "Page Content" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const email = await getCurrentAdminEmail();

  return (
    <div className="min-h-screen bg-purple-void">
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <p className="chapter-eyebrow">PAV Admin</p>
            {email && <p className="text-sm text-white/50">{email}</p>}
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-white/60 hover:text-gold-bright"
            >
              Log out
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-10 px-6 py-10">
        <nav className="w-48 shrink-0 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
