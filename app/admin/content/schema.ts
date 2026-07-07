import type { PageSlug } from "@/lib/content/types";

export type FieldDef =
  | { key: string; label: string; type: "text"; hint?: string }
  | { key: string; label: string; type: "prose"; hint?: string }
  | { key: string; label: string; type: "image"; hint?: string }
  | { key: string; label: string; type: "list-strings"; hint?: string }
  | {
      key: string;
      label: string;
      type: "list-object";
      itemLabel: string;
      fields: { key: string; label: string; type: "text" | "prose" | "image" }[];
    };

export const pageSchemas: Record<PageSlug, { label: string; fields: FieldDef[] }> = {
  settings: {
    label: "Site Settings",
    fields: [
      { key: "headerLogo", label: "Header logo", type: "image" },
      { key: "contactPhone", label: "Contact phone", type: "text" },
      { key: "contactEmail", label: "Contact email", type: "text" },
      { key: "contactAddress", label: "Contact address", type: "text" },
    ],
  },

  home: {
    label: "Home",
    fields: [
      { key: "heroImage", label: "Hero image", type: "image" },
      { key: "heroEyebrow", label: "Hero eyebrow", type: "text" },
      { key: "heroTitleLine1", label: "Hero title — line 1", type: "text" },
      { key: "heroTitleLine2", label: "Hero title — line 2 (italic)", type: "text" },
      { key: "heroSubtitle", label: "Hero subtitle", type: "prose" },
      { key: "leaderQuote", label: "Leader quote", type: "prose" },
      { key: "leaderName", label: "Leader name / title", type: "text" },
      { key: "chapter1Heading", label: "Chapter I heading", type: "text" },
      { key: "chapter1Body", label: "Chapter I body", type: "prose" },
      {
        key: "principles",
        label: "Core principles",
        type: "list-object",
        itemLabel: "Principle",
        fields: [
          { key: "label", label: "Name", type: "text" },
          { key: "note", label: "Description", type: "prose" },
        ],
      },
      { key: "membersEyebrow", label: "Members section eyebrow", type: "text" },
      { key: "membersHeading", label: "Members section heading", type: "text" },
      {
        key: "members",
        label: "Members",
        type: "list-object",
        itemLabel: "Member",
        fields: [
          { key: "image", label: "Photo", type: "image" },
          { key: "name", label: "Name", type: "text" },
          { key: "title", label: "Title", type: "text" },
        ],
      },
      { key: "corruptionEyebrow", label: "Corruption strip eyebrow", type: "text" },
      { key: "corruptionHeading", label: "Corruption strip heading", type: "text" },
      { key: "joinYear", label: "Join CTA year badge", type: "text" },
      { key: "joinHeading", label: "Join CTA heading", type: "text" },
      { key: "joinSubtitle", label: "Join CTA subtitle", type: "prose" },
    ],
  },

  leader: {
    label: "Party Leader",
    fields: [
      { key: "greeting", label: "Opening line", type: "text" },
      {
        key: "body",
        label: "Letter body",
        type: "prose",
        hint: "Separate paragraphs with a blank line. Start a paragraph with \"> \" to render it as a pull-quote.",
      },
      { key: "signOffLine", label: "Sign-off line", type: "text" },
      { key: "signOffName", label: "Sign-off name", type: "text" },
      { key: "signOffTitle", label: "Sign-off title", type: "text" },
    ],
  },

  manifesto: {
    label: "Preamble & Manifesto",
    fields: [
      { key: "preambleHeading", label: "Preamble heading", type: "text" },
      { key: "preambleBody", label: "Preamble body", type: "prose" },
      { key: "manifestoHeading", label: "Manifesto heading", type: "text" },
      { key: "manifestoBody", label: "Manifesto body", type: "prose" },
      { key: "forewordHeading", label: "Foreword heading", type: "text" },
      { key: "forewordBody", label: "Foreword body", type: "prose" },
    ],
  },

  "vision-mission": {
    label: "Vision & Mission",
    fields: [
      { key: "logoImage", label: "Logo & slogan image", type: "image" },
      { key: "visionBody", label: "Vision statement", type: "prose" },
      { key: "missionBody", label: "Mission statement", type: "prose" },
      { key: "logoHeading", label: "Logo & slogan heading", type: "text" },
      { key: "logoBody", label: "Logo & slogan body", type: "prose" },
      { key: "ideologyBriefEyebrow", label: "Ideology brief eyebrow", type: "text" },
      { key: "ideologyBriefBody", label: "Ideology brief body", type: "prose" },
    ],
  },

  ideology: {
    label: "Ideology & Core Principles",
    fields: [
      { key: "introBody", label: "Introduction", type: "prose" },
      { key: "nationalValues", label: "National values & principles (one per line)", type: "list-strings" },
      { key: "sectionHeading", label: "Core Principles section heading", type: "text" },
      {
        key: "principles",
        label: "Core Principles",
        type: "list-object",
        itemLabel: "Principle",
        fields: [
          { key: "label", label: "Name", type: "text" },
          { key: "body", label: "Body", type: "prose" },
        ],
      },
    ],
  },

  corruption: {
    label: "Position on Corruption",
    fields: [
      { key: "quote", label: "Pull-quote", type: "prose" },
      {
        key: "steps",
        label: "How It Works — steps",
        type: "list-object",
        itemLabel: "Step",
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "prose" },
        ],
      },
      { key: "legalFoundationBody", label: "Legal foundation body", type: "prose" },
    ],
  },
};
