import "server-only";
import type { PageContentMap, PageSlug } from "./types";

/**
 * In-memory content-override store. Data lives in a module-level map for
 * the lifetime of the Node process — fine for local development and demos,
 * but it resets on every server restart and won't work across multiple
 * instances/serverless invocations.
 *
 * To back this with a real database: reimplement `getOverride`/`setOverride`
 * against your DB client (e.g. a `PageContent` table keyed by slug, storing
 * `data` as JSON), keeping the same signatures. `./get.ts` is the only
 * caller, and every page/admin route goes through `./get.ts` — so this file
 * is the one and only swap point for content persistence.
 */

const overrides = new Map<PageSlug, Partial<PageContentMap[PageSlug]>>();

export async function getOverride<S extends PageSlug>(
  slug: S
): Promise<Partial<PageContentMap[S]> | null> {
  return (overrides.get(slug) as Partial<PageContentMap[S]> | undefined) ?? null;
}

export async function setOverride<S extends PageSlug>(
  slug: S,
  data: PageContentMap[S]
): Promise<void> {
  overrides.set(slug, data);
}
