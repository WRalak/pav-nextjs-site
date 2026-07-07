import Link from "next/link";
import { getPageContent } from "@/lib/content/get";

export async function SiteFooter() {
  const { contactPhone, contactEmail, contactAddress } = await getPageContent("settings");

  return (
    <footer className="border-t border-white/10 bg-purple-void">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <p className="font-display text-xl text-white">PAV</p>
            <p className="mt-2 text-sm text-white/60">
              Sauti Mbadala &mdash; Haki, Usawa na Maendeleo.
            </p>
            <p className="mt-1 text-sm text-white/60">
              The Alternative Voice, coming with Justice, Equality and
              Development.
            </p>
          </div>

          <div>
            <p className="chapter-eyebrow">The Founding Texts</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li><Link href="/manifesto" className="hover:text-gold-bright">Preamble &amp; Manifesto</Link></li>
              <li><Link href="/ideology" className="hover:text-gold-bright">Ideology &amp; Core Principles</Link></li>
              <li><Link href="/vision-mission" className="hover:text-gold-bright">Vision &amp; Mission</Link></li>
              <li><Link href="/corruption" className="hover:text-gold-bright">Position on Corruption</Link></li>
            </ul>
          </div>

          <div>
            <p className="chapter-eyebrow">The Movement</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li><Link href="/leader" className="hover:text-gold-bright">Word from the Party Leader</Link></li>
              <li><Link href="/join" className="hover:text-gold-bright">Become a Member</Link></li>
            </ul>
          </div>

          <div>
            <p className="chapter-eyebrow">2027</p>
            <p className="mt-3 text-sm text-white/70">
              The next election will define where Kenya stands for the next
              fifty years. PAV is the alternative Kenya has been waiting for.
            </p>
          </div>

          <div>
            <p className="chapter-eyebrow">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>
                <a href={`tel:${contactPhone}`} className="hover:text-gold-bright">
                  {contactPhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contactEmail}`} className="hover:text-gold-bright">
                  {contactEmail}
                </a>
              </li>
              <li>{contactAddress}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} People&rsquo;s Alternative Voice (PAV). All rights reserved.</p>
          <p>Registered political party, Republic of Kenya.</p>
        </div>
      </div>
    </footer>
  );
}
