import type { Metadata } from "next";
import { ChapterHero } from "@/app/components/ChapterHero";
import { Prose } from "@/app/components/Prose";
import { getPageContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "Ideology & Core Principles — PAV",
  description: "The ideology and six core principles of the People's Alternative Voice (PAV).",
};

export default async function IdeologyPage() {
  const content = await getPageContent("ideology");
  const principles = content.principles.map((p, i) => ({
    ...p,
    id: p.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `principle-${i}`,
  }));

  return (
    <div>
      <ChapterHero
        eyebrow="Chapter II"
        title="Ideology & Core Principles"
        lede="A social democratic party, people-centric and all-inclusive, grounded in the conviction that every Kenyan deserves an equal share of opportunity and rights."
      />

      <section className="bg-purple-void px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-white/85">
          <Prose text={content.introBody} />
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8">
          <p className="chapter-eyebrow">National Values & Principles of Governance</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {content.nationalValues.map((v) => (
              <span
                key={v}
                className="rounded-full border border-gold-horn/30 px-3 py-1 text-xs text-gold-bright"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="paper-surface px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="chapter-eyebrow text-ember">The Core Principles of PAV</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">{content.sectionHeading}</h2>

          <nav aria-label="Jump to a principle" className="mt-8 flex flex-wrap gap-2">
            {principles.map((p, i) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="rounded-full border border-ink-deep/15 bg-parchment px-3 py-1.5 text-xs font-medium text-ink-deep/70 hover:border-ember hover:text-ember"
              >
                {String(i + 1).padStart(2, "0")} &middot; {p.label}
              </a>
            ))}
          </nav>

          <div className="mt-14 space-y-16">
            {principles.map((p, i) => (
              <article key={p.id} id={p.id} className="scroll-mt-24 border-t border-parchment-line pt-10">
                <p className="chapter-eyebrow text-ember">
                  Principle {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-3xl">{p.label}</h3>
                <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-deep/85">
                  <Prose text={p.body} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
