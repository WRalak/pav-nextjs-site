"use client";

import { useActionState, useState, type FormEvent } from "react";
import { submitMembership } from "./actions";

const counties = [
  "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta",
  "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru",
  "Tharaka-Nithi", "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua",
  "Nyeri", "Kirinyaga", "Murang'a", "Kiambu", "Turkana", "West Pokot",
  "Samburu", "Trans Nzoia", "Uasin Gishu", "Elgeyo-Marakwet", "Nandi",
  "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado", "Kericho", "Bomet",
  "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu",
  "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi",
];

const MIN_AGE = 18;

function maxDob() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - MIN_AGE);
  return d.toISOString().slice(0, 10);
}

function isAtLeast18(dob: string) {
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return false;
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - MIN_AGE);
  return birth <= cutoff;
}

export function RegistrationForm() {
  const [state, formAction, pending] = useActionState(submitMembership, undefined);
  const [isPwd, setIsPwd] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [dobError, setDobError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const dob = new FormData(e.currentTarget).get("dob");
    if (typeof dob !== "string" || !isAtLeast18(dob)) {
      e.preventDefault();
      setDobError(`You must be at least ${MIN_AGE} years old to join PAV.`);
      return;
    }
    setDobError(null);
  }

  if (state?.ok) {
    return (
      <div className="rounded-2xl border border-savanna/30 bg-savanna/10 p-10 text-center">
        <p className="chapter-eyebrow text-savanna">Received</p>
        <h2 className="mt-3 font-display text-2xl text-white">
          Asante &mdash; your details are ready to submit.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/75">
          A party representative will confirm your membership number and
          share your Party Code once headquarters processing opens. Keep an
          eye on your phone and postal address for confirmation.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-10" noValidate>
      <fieldset className="space-y-6">
        <legend className="chapter-eyebrow text-gold-horn">Your details</legend>

        <Field label="Full name" required>
          <input required type="text" name="name" autoComplete="name" className={inputClass} />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="ID / Passport number" required>
            <input required type="text" name="idNumber" className={inputClass} />
          </Field>
          <Field label="Date of birth" required>
            <input
              required
              type="date"
              name="dob"
              max={maxDob()}
              onChange={() => setDobError(null)}
              className={inputClass}
            />
            {dobError && <p className="mt-1.5 text-xs text-ember">{dobError}</p>}
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Mobile number" required>
            <input required type="tel" name="mobile" autoComplete="tel" className={inputClass} />
          </Field>
          <Field label="Postal address">
            <input type="text" name="postalAddress" autoComplete="street-address" className={inputClass} />
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Sex" required>
            <select required name="sex" className={inputClass} defaultValue="">
              <option value="" disabled>Select</option>
              <option>Female</option>
              <option>Male</option>
            </select>
          </Field>
          <Field label="Ethnicity">
            <input type="text" name="ethnicity" className={inputClass} />
          </Field>
        </div>

        <Field label="Religion">
          <input type="text" name="religion" className={inputClass} />
        </Field>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="chapter-eyebrow text-gold-horn">Accessibility & inclusion</legend>
        <label className="flex items-start gap-3 text-sm text-white/80">
          <input
            type="checkbox"
            checked={isPwd}
            onChange={(e) => setIsPwd(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent"
          />
          I am a Person with Disability (PWD)
        </label>
        {isPwd && (
          <Field label="NCPWD number">
            <input type="text" name="ncpwdNumber" className={inputClass} />
          </Field>
        )}
        <p className="text-xs text-white/50">
          Need this form read aloud, in sign language, or in another format?
          Contact your nearest PAV registration desk and a representative
          will assist you directly &mdash; no Kenyan is turned away for lack
          of access.
        </p>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="chapter-eyebrow text-gold-horn">Voter registration</legend>
        <Field label="County of voter registration" required>
          <select required name="county" className={inputClass} defaultValue="">
            <option value="" disabled>Select county</option>
            {counties.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Constituency of voter registration">
            <input type="text" name="constituency" className={inputClass} />
          </Field>
          <Field label="Ward of voter registration">
            <input type="text" name="ward" className={inputClass} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-2xl border border-gold-horn/25 bg-gold-horn/5 p-6">
        <legend className="chapter-eyebrow text-gold-horn">Code of Conduct</legend>
        <p className="text-sm leading-relaxed text-white/80">
          By submitting this form, I affirm that I am not a registered member
          of any other registered political party in Kenya, and I commit not
          to engage, or knowingly engage, in bribery, fraud or any corrupt
          dealing as a member of PAV.
        </p>
        <label className="flex items-start gap-3 text-sm text-white">
          <input
            required
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent"
          />
          I have read and agree to the PAV Code of Conduct.
        </label>
      </fieldset>

      {state?.ok === false && (
        <p className="rounded-lg border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={!agreed || pending}
        className="w-full rounded-full bg-gold-horn px-8 py-4 font-medium text-purple-void transition-colors hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-40"
      >
        {pending ? "Submitting…" : "Submit my membership details"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 outline-none focus:border-gold-horn focus:ring-1 focus:ring-gold-horn";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-white/70">
        {label}
        {required && <span className="text-gold-horn"> *</span>}
      </span>
      {children}
    </label>
  );
}
