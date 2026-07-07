import { CallArcs } from "./CallArcs";

export function ChapterHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-regal/50 to-purple-void px-6 pb-16 pt-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="chapter-eyebrow">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-white sm:text-6xl">
          {title}
        </h1>
        {lede && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">{lede}</p>
        )}
      </div>
      <CallArcs className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full" />
    </section>
  );
}
