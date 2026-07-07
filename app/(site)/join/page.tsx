import type { Metadata } from "next";
import { ChapterHero } from "@/app/components/ChapterHero";
import { RegistrationForm } from "./RegistrationForm";

export const metadata: Metadata = {
  title: "Join PAV — Membership Registration",
  description: "Register as a member of the People's Alternative Voice (PAV).",
};

export default function JoinPage() {
  return (
    <div>
      <ChapterHero
        eyebrow="Become a Member"
        title="Join the Alternative Voice"
        lede="Every member begins with a Code of Conduct. Fill in your details below to start your membership with PAV."
      />

      <section className="bg-purple-void px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gold-horn/35 bg-white/[0.06] p-5 shadow-[0_24px_90px_-48px_rgba(201,162,39,0.9)] sm:p-8">
          <div className="mb-8 rounded-xl border border-white/10 bg-purple-regal/35 p-5">
            <p className="chapter-eyebrow text-gold-horn">Membership application</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-white">
              Start your PAV membership
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Fill in the required details, confirm the Code of Conduct, and
              submit your membership application for review.
            </p>
          </div>
          <RegistrationForm />
        </div>
      </section>
    </div>
  );
}
