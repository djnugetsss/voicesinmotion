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
