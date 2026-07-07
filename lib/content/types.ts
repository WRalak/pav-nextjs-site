export type PageSlug =
  | "settings"
  | "home"
  | "leader"
  | "manifesto"
  | "vision-mission"
  | "ideology"
  | "corruption";

export interface SettingsContent {
  headerLogo: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
}

export interface HomeContent {
  heroImage: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  leaderQuote: string;
  leaderName: string;
  chapter1Heading: string;
  chapter1Body: string;
  principles: { label: string; note: string }[];
  membersEyebrow: string;
  membersHeading: string;
  members: { image: string; name: string; title: string }[];
  corruptionEyebrow: string;
  corruptionHeading: string;
  joinYear: string;
  joinHeading: string;
  joinSubtitle: string;
}

export interface LeaderContent {
  greeting: string;
  body: string;
  signOffLine: string;
  signOffName: string;
  signOffTitle: string;
}

export interface ManifestoContent {
  preambleHeading: string;
  preambleBody: string;
  manifestoHeading: string;
  manifestoBody: string;
  forewordHeading: string;
  forewordBody: string;
}

export interface VisionMissionContent {
  logoImage: string;
  visionBody: string;
  missionBody: string;
  logoHeading: string;
  logoBody: string;
  ideologyBriefEyebrow: string;
  ideologyBriefBody: string;
}

export interface IdeologyContent {
  introBody: string;
  nationalValues: string[];
  sectionHeading: string;
  principles: { label: string; body: string }[];
}

export interface CorruptionContent {
  quote: string;
  steps: { title: string; body: string }[];
  legalFoundationBody: string;
}

export type PageContentMap = {
  settings: SettingsContent;
  home: HomeContent;
  leader: LeaderContent;
  manifesto: ManifestoContent;
  "vision-mission": VisionMissionContent;
  ideology: IdeologyContent;
  corruption: CorruptionContent;
};
