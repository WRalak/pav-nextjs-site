import type { Metadata } from "next";
import Image from "next/image";
import { ChapterHero } from "@/app/components/ChapterHero";
import { Prose } from "@/app/components/Prose";
import { getPageContent } from "@/lib/content/get";

export const metadata: Metadata = {
  title: "Vision & Mission — PAV",
  description: "The Vision and Mission Statements, and the meaning of the PAV logo and slogan.",
};

export default async function VisionMissionPage() {
  const content = await getPageContent("vision-mission");

  return (
    <div>
      <ChapterHero
        eyebrow="Chapter III"
        title="Vision & Mission"
        lede="Sauti Mbadala &mdash; Haki, Usawa na Maendeleo."
      />

      <section className="bg-purple-void px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10">
            <p className="chapter-eyebrow">Vision</p>
            <div className="mt-4 text-lg leading-relaxed text-white/85">
              <Prose text={content.visionBody} />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-10">
            <p className="chapter-eyebrow">Mission</p>
            <div className="mt-4 text-lg leading-relaxed text-white/85">
              <Prose text={content.missionBody} />
            </div>
          </div>
        </div>
      </section>

      <section className="paper-surface px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex justify-center">
            <Image
              src={content.logoImage}
              alt="The PAV logo: a kudu horn banded in the colours of the Kenyan flag, encircled by the party name and slogan"
              width={420}
              height={420}
              className="rounded-2xl shadow-xl"
            />
          </div>
          <div>
            <p className="chapter-eyebrow text-ember">The Logo & Slogan</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">{content.logoHeading}</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-deep/85">
              <Prose text={content.logoBody} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-purple-void px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="chapter-eyebrow text-gold-horn">{content.ideologyBriefEyebrow}</p>
          <div className="mt-4 text-lg leading-relaxed text-white/85">
            <Prose text={content.ideologyBriefBody} />
          </div>
        </div>
      </section>
    </div>
  );
}
