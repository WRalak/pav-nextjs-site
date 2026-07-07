import type { Metadata } from "next";
import Link from "next/link";
import { ChapterHero } from "@/app/components/ChapterHero";
import { Prose } from "@/app/components/Prose";
import { getPageContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "Word from the Party Leader — PAV",
  description: "A welcome word from the Leader of the People's Alternative Voice (PAV).",
};

export default async function LeaderPage() {
  const content = await getPageContent("leader");

  return (
    <div>
      <ChapterHero eyebrow="A Word" title="From the Party Leader" />

      <section className="bg-purple-void px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <p className="font-display text-3xl italic text-gold-horn">{content.greeting}</p>

          <div className="mt-8 space-y-6 text-lg leading-relaxed text-white/85">
            <Prose
              text={content.body}
              quoteClassName="font-display text-2xl italic text-white"
            />
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="text-white/70">{content.signOffLine}</p>
            <p className="mt-2 font-display text-2xl text-white">{content.signOffName}</p>
            <p className="text-sm text-white/60">{content.signOffTitle}</p>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/join"
              className="inline-block rounded-full bg-gold-horn px-8 py-3 font-medium text-purple-void hover:bg-gold-bright"
            >
              Join PAV
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
