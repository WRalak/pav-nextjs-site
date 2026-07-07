import Image from "next/image";
import Link from "next/link";
import { CallArcs } from "@/app/components/CallArcs";
import { Prose } from "@/app/components/Prose";
import { getPageContent } from "@/lib/content/get";

export default async function Home() {
  const content = await getPageContent("home");

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-void via-purple-regal/40 to-purple-void px-6 pb-24 pt-20 sm:pt-28">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 text-center">
          <p className="chapter-eyebrow">{content.heroEyebrow}</p>
          <h1 className="max-w-4xl font-display text-5xl leading-[1.05] tracking-tight text-white sm:text-7xl">
            {content.heroTitleLine1}
            <br />
            <span className="italic text-gold-horn">{content.heroTitleLine2}</span>
          </h1>
          <div className="max-w-2xl text-balance text-lg text-white/75 sm:text-xl">
            <Prose text={content.heroSubtitle} />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/join"
              className="rounded-full bg-gold-horn px-8 py-3 font-medium text-purple-void transition-colors hover:bg-gold-bright"
            >
              Join the Movement
            </Link>
            <Link
              href="/manifesto"
              className="rounded-full border border-white/25 px-8 py-3 font-medium text-white transition-colors hover:border-gold-horn hover:text-gold-bright"
            >
              Read the Manifesto
            </Link>
          </div>

          <div className="mt-6">
            <Image
              src={content.heroImage}
              alt="PAV emblem: a kudu horn encircled by the words People's Alternative Voice, with the slogan Sauti Mbadala - Haki, Usawa na Maendeleo"
              width={200}
              height={200}
              className="rounded-full shadow-[0_0_80px_-20px_rgba(201,162,39,0.55)]"
              priority
            />
          </div>
        </div>

        <CallArcs className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full" />
      </section>

      {/* LEADER QUOTE */}
      <section className="border-y border-white/10 bg-purple-void px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="chapter-eyebrow">Word from the Party Leader</p>
          <blockquote className="mt-4 font-display text-2xl italic leading-snug text-white sm:text-3xl">
            &ldquo;{content.leaderQuote}&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-white/60">{content.leaderName}</p>
          <Link
            href="/leader"
            className="mt-6 inline-block text-sm text-gold-horn hover:text-gold-bright"
          >
            Read the full welcome word &rarr;
          </Link>
        </div>
      </section>

      {/* CHAPTER I: MANIFESTO TEASER */}
      <section className="paper-surface px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="chapter-eyebrow text-ember">Chapter I</p>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              {content.chapter1Heading}
            </h2>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-ink-deep/85">
            <Prose text={content.chapter1Body} />
            <Link
              href="/manifesto"
              className="inline-block font-medium text-ember underline decoration-2 underline-offset-4 hover:text-purple-regal"
            >
              Read the full Preamble &amp; Manifesto
            </Link>
          </div>
        </div>
      </section>

      {/* CORE PRINCIPLES GRID */}
      <section className="bg-purple-void px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="chapter-eyebrow">Chapter II</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl">
              Six principles, one ideology.
            </h2>
            <p className="mt-4 text-white/70">
              The PAV Core Principles condense our Preamble, Aims and
              Objectives, Ideology and Guiding Values into the operational
              foundation of the Party.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {content.principles.map((p) => (
              <div key={p.label} className="bg-purple-void p-8">
                <h3 className="font-display text-xl text-gold-horn">{p.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{p.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/ideology"
              className="text-sm text-gold-horn hover:text-gold-bright"
            >
              Explore the full Ideology &amp; Core Principles &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* MEMBERS */}
      <section className="paper-surface px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="chapter-eyebrow text-ember">{content.membersEyebrow}</p>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              {content.membersHeading}
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {content.members.map((m, i) => (
              <div key={i} className="text-center">
                <Image
                  src={m.image}
                  alt={m.name}
                  width={160}
                  height={160}
                  className="mx-auto h-40 w-40 rounded-full object-cover shadow-lg"
                />
                <h3 className="mt-4 font-display text-xl">{m.name}</h3>
                <p className="mt-1 text-sm text-ink-deep/60">{m.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORRUPTION STANCE STRIP */}
      <section className="bg-ember px-6 py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="chapter-eyebrow text-white/80">{content.corruptionEyebrow}</p>
            <h2 className="mt-2 font-display text-2xl text-white sm:text-3xl">
              {content.corruptionHeading}
            </h2>
          </div>
          <Link
            href="/corruption"
            className="shrink-0 rounded-full bg-white px-6 py-3 font-medium text-ember hover:bg-parchment"
          >
            Read our position &rarr;
          </Link>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="px-6 py-28 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="chapter-eyebrow">{content.joinYear}</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl">
            {content.joinHeading}
          </h2>
          <p className="mt-5 text-white/70">{content.joinSubtitle}</p>
          <Link
            href="/join"
            className="mt-8 inline-block rounded-full bg-gold-horn px-10 py-4 font-medium text-purple-void hover:bg-gold-bright"
          >
            Become a Member
          </Link>
        </div>
      </section>
    </div>
  );
}
