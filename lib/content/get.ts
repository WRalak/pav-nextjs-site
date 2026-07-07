import "server-only";
import { contentDefaults } from "./defaults";
import { getOverride, setOverride } from "./store";
import type { PageContentMap, PageSlug } from "./types";

export async function getPageContent<S extends PageSlug>(
  slug: S
): Promise<PageContentMap[S]> {
  const fallback = contentDefaults[slug];
  const override = await getOverride(slug);
  return override ? { ...fallback, ...override } : fallback;
}

export async function setPageContent<S extends PageSlug>(
  slug: S,
  data: PageContentMap[S]
): Promise<void> {
  await setOverride(slug, data);
}
