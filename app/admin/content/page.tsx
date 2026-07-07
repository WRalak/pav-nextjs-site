import Link from "next/link";
import { pageSchemas } from "./schema";

export default function ContentListPage() {
  const slugs = Object.keys(pageSchemas) as (keyof typeof pageSchemas)[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-white">Page Content</h1>
        <p className="mt-1 text-white/60">
          Edit the text shown on each public page. Changes go live immediately.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {slugs.map((slug) => (
          <Link
            key={slug}
            href={`/admin/content/${slug}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-gold-horn/50"
          >
            <p className="font-display text-xl text-white">{pageSchemas[slug].label}</p>
            <p className="mt-1 text-sm text-white/50">
              {pageSchemas[slug].fields.length} editable field
              {pageSchemas[slug].fields.length === 1 ? "" : "s"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
