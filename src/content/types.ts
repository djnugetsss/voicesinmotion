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
