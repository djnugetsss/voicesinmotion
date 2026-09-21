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

export type WorkshopSession = {
  id: string;
  /** Display ordinal on the timeline marker, e.g. "01". */
  marker: string;
  name: string;
  dates: string;
  description?: string;
  /**
   * The sign-up form for this session. `null` until the form exists, which
   * renders the muted "opens soon" state instead of a button. Paste a URL in
   * and the card renders a live sign-up button. That is the only edit needed.
   */
  signupUrl: string | null;
};

export type WorkshopsContent = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** Button label once a session has a `signupUrl`. */
  signupLabel: string;
  /** Shown in its place while `signupUrl` is still `null`. */
  signupPendingLabel: string;
  sessions: WorkshopSession[];
};

export type Review = {
  id: string;
  /** Verbatim, exactly as the reviewer wrote it. Never edited for grammar. */
  quote: string;
  name: string;
  /** Both optional: plenty of reviews arrive with just a name. */
  role?: string;
  session?: string;
};

export type ReviewsContent = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  reviews: Review[];
};

export type TeamTier = "founder" | "staff";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  tier: TeamTier;
  /** One entry per paragraph. Reproduced verbatim, never edited. */
  bio: string[];
  /** Founders only. Short, factual credits shown on the card. */
  highlights?: string[];
  /** Path under `public/`. */
  photo: string;
  /**
   * CSS object-position for the face, e.g. "50% 38%". The headshots are
   * cropped differently, so this is what lines the faces up across cards.
   * It doubles as the transform-origin the founder medallion zooms toward.
   */
  photoFocus: string;
  /**
   * Per-person zoom. The two founder headshots were taken at different
   * subject distances, so focus alone cannot make the heads read at the same
   * size. 1 is the photo as supplied.
   */
  photoZoom?: number;
};

export type TeamContent = {
  id: string;
  eyebrow: string;
  foundersTitle: string;
  foundersIntro: string;
  staffTitle: string;
  members: TeamMember[];
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
  /** Replace or remove before launch. See the note in `footer.ts`. */
  email: { address: string; placeholder: boolean } | null;
  contactNote: string;
  copyright: string;
};

export type AboutContent = {
  metaDescription: string;
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
