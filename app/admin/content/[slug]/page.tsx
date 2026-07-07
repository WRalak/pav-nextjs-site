import { notFound } from "next/navigation";
import Link from "next/link";
import { getPageContent } from "@/lib/content/get";
import type { PageSlug } from "@/lib/content/types";
import { pageSchemas } from "../schema";
import { ContentForm } from "../ContentForm";

export const dynamic = "force-dynamic";

function isPageSlug(value: string): value is PageSlug {
  return value in pageSchemas;
}

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isPageSlug(slug)) notFound();

  const schema = pageSchemas[slug];
  const content = await getPageContent(slug);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/content" className="text-sm text-white/50 hover:text-white">
          &larr; Page Content
        </Link>
        <h1 className="mt-2 font-display text-3xl text-white">{schema.label}</h1>
      </div>

      <ContentForm
        slug={slug}
        fields={schema.fields}
        initialValues={content as unknown as Record<string, unknown>}
      />
    </div>
  );
}
