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
        <div className="mx-auto max-w-2xl">
          <RegistrationForm />
        </div>
      </section>
    </div>
  );
}
