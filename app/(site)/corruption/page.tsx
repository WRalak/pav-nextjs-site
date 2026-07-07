import type { Metadata } from "next";
import Link from "next/link";
import { ChapterHero } from "@/app/components/ChapterHero";
import { Prose } from "@/app/components/Prose";
import { getPageContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "Position on Corruption — PAV",
  description: "PAV's zero-tolerance position on bribery, fraud and unethical conduct.",
};

export default async function CorruptionPage() {
  const content = await getPageContent("corruption");

  return (
    <div>
      <ChapterHero
        eyebrow="Chapter IV"
        title="Position on Corruption"
        lede="A strict, zero-tolerance stance on bribery, fraud and unethical conduct — beginning at the moment of registration."
      />

      <section className="bg-ember/95 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-2xl italic leading-snug text-white sm:text-3xl">
            &ldquo;{content.quote}&rdquo;
          </p>
        </div>
      </section>

      <section className="paper-surface px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="chapter-eyebrow text-ember">How It Works</p>
          <ol className="mt-8 space-y-8">
            {content.steps.map((s, i) => (
              <li key={s.title} className="flex gap-5 border-t border-parchment-line pt-6 first:border-t-0 first:pt-0">
                <span className="font-display text-2xl text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl">{s.title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-ink-deep/80">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-14 rounded-2xl border border-ember/20 bg-ember/5 p-8">
            <p className="chapter-eyebrow text-ember">Legal Foundation</p>
            <div className="mt-3 text-base leading-relaxed text-ink-deep/85">
              <Prose text={content.legalFoundationBody} />
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/join"
              className="inline-block rounded-full bg-purple-regal px-8 py-3 font-medium text-white hover:bg-purple-soft"
            >
              Sign the Code of Conduct &mdash; Join PAV
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
