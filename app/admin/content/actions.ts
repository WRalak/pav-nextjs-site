"use server";

import { revalidatePath } from "next/cache";
import { setPageContent } from "@/lib/content/get";
import type { PageContentMap, PageSlug } from "@/lib/content/types";

export async function updatePageContent(slug: PageSlug, data: unknown) {
  await setPageContent(slug, data as PageContentMap[typeof slug]);
  revalidatePath(`/admin/content/${slug}`);
  revalidatePath(slug === "home" ? "/" : `/${slug}`);
  return { ok: true as const };
}
