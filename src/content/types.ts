/**
 * Shared shapes for site copy. Everything the site renders comes from
 * `src/content` so text, links and imagery can be swapped without
 * touching a component.
 */

export type NavLink = {
  label: string;
  href: string;
  /** `anchor` links scroll within the home page; `route` links navigate. */
  kind: "anchor" | "route";
};

export type Cta = {
  label: string;
  href: string;
  external?: boolean;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "instagram";
};

export type SiteMeta = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
};

export type HeroContent = {
  eyebrow: string;
  /** Rendered word-by-word by <RevealWords>. Keep it to one sentence or two. */
  headline: string;
  subhead: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  scrollCue: string;
};

/** A counted statistic. See the placeholder banner in `why.ts`. */
export type Stat = {
  id: string;
  value: number;
  /** Rendered after the number, e.g. "+" or "%". */
  suffix?: string;
  decimals?: number;
  label: string;
  /**
   * True while `value` is invented filler. Surfaces as `data-placeholder` on
   * the rendered figure so it is greppable in the DOM. Flip to `false` once
   * the real number is in.
   */
  placeholder: boolean;
};

export type WhyContent = {
  id: string;
  eyebrow: string;
  quote: { text: string; attribution: string };
  body: string[];
  stats: Stat[];
};

export type Program = {
  id: string;
  /** Small label above the title. */
  kicker: string;
  title: string;
  audience: string;
  description: string;
  points: string[];
  ctas: Cta[];
  /** Drives which of the two card treatments is used. */
  tone: "workshops" | "lessons";
};

export type ProgramsContent = {
  eyebrow: string;
  title: string;
  intro: string;
  programs: Program[];
};

export type Session = {
  id: string;
  /** Display ordinal on the timeline marker, e.g. "01". */
  marker: string;
  name: string;
  dates: string;
  description?: string;
  kind: "free" | "paid";
};

export type PriceBadge = {
  label: string;
  value: string;
  /** True while `value` is not yet the real price. */
  placeholder: boolean;
};

export type SummerContent = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  price: PriceBadge;
  sessions: Session[];
};

export type Review = {
  id: string;
  quote: string;
  name: string;
  role: string;
  session: string;
};

export type ReviewsContent = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  reviews: Review[];
};

export type Coach = {
  id: string;
  name: string;
  role: string;
  /** Events this coach competes in or coaches, as one display string. */
  events: string;
  achievements: string[];
  /** Shown when the card is expanded on /about. */
  bio: string;
  /**
   * Portrait, rendered in a 4:5 box. Leave `null` for the gradient
   * placeholder — drop in `{ src, alt }` and the image takes over with no
   * other change.
   */
  photo: { src: string; alt: string } | null;
  /** True while the person and their record are invented scaffolding. */
  placeholder: boolean;
};

export type CoachesContent = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  coaches: Coach[];
};

export type ClosingContent = {
  id: string;
  headline: string;
  subhead: string;
  primaryCta: Cta;
  secondaryCta: Cta;
};

export type FooterContent = {
  blurb: string;
  linksTitle: string;
  links: NavLink[];
  contactTitle: string;
  /** Replace or remove before launch — see the note in `footer.ts`. */
  email: { address: string; placeholder: boolean } | null;
  contactNote: string;
  copyright: string;
};

/**
 * A picture or clip slot. `src` stays `null` until a real file exists — the
 * UI renders a palette gradient in the reserved box instead, so every layout
 * is testable before any asset lands.
 *
 * `aspect` is width ÷ height: 1 square, 0.8 = 4:5 portrait, 1.5 = 3:2
 * landscape, 0.5625 = 9:16. It reserves the box, so nothing shifts on load.
 */
export type MediaAsset = {
  src: string | null;
  alt: string;
  aspect: number;
};

export type StoryBlock = {
  id: string;
  heading: string;
  body: string[];
  image: MediaAsset;
};

export type PillarIcon = "podium" | "scales" | "waveform";

export type Pillar = {
  id: string;
  icon: PillarIcon;
  title: string;
  body: string;
};

export type AboutContent = {
  hero: { eyebrow: string; headline: string; subhead: string };
  story: { eyebrow: string; title: string; blocks: StoryBlock[] };
  mission: { eyebrow: string; title: string; pillars: Pillar[] };
  roster: { eyebrow: string; title: string; intro: string };
};

export type MediaCategory = "workshops" | "competitions" | "team";

export type MediaItem = {
  id: string;
  type: "image" | "video";
  src: string | null;
  alt: string;
  caption: string;
  /** Width ÷ height. Reserves the box so the masonry never shifts. */
  aspect: number;
  category: MediaCategory;
  placeholder: boolean;
};

export type MediaFilter = { id: "all" | MediaCategory; label: string };

export type MediaContent = {
  eyebrow: string;
  title: string;
  intro: string;
  filters: MediaFilter[];
  items: MediaItem[];
};
