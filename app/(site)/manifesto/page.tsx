import type { Metadata } from "next";
import { ChapterHero } from "@/app/components/ChapterHero";
import { Prose } from "@/app/components/Prose";
import { getPageContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "Preamble & Manifesto — PAV",
  description: "The Preamble and Manifesto of the People's Alternative Voice (PAV).",
};

export default async function ManifestoPage() {
  const content = await getPageContent("manifesto");

  return (
    <div>
      <ChapterHero
        eyebrow="Chapter I"
        title="The Preamble & Manifesto"
        lede="Kenya's alternative, envisioned by Kenyans with a shared aspiration of a peaceful, united and sustainably developing country."
      />

      <section className="paper-surface px-6 py-20">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <p className="chapter-eyebrow text-ember">{content.preambleHeading}</p>
            <div className="mt-4 text-lg leading-relaxed text-ink-deep/90">
              <Prose text={content.preambleBody} />
            </div>
          </div>

          <hr className="border-parchment-line" />

          <div>
            <p className="chapter-eyebrow text-ember">{content.manifestoHeading}</p>
            <div className="mt-4 space-y-5 text-lg leading-relaxed text-ink-deep/90">
              <Prose text={content.manifestoBody} />
            </div>
          </div>

          <hr className="border-parchment-line" />

          <div>
            <p className="chapter-eyebrow text-ember">{content.forewordHeading}</p>
            <div className="mt-4 space-y-5 text-lg leading-relaxed text-ink-deep/90">
              <Prose
                text={content.forewordBody}
                quoteClassName="font-display text-2xl italic text-purple-regal"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
