import type { HeroContent } from "./types";
import { siteMeta } from "./site";

export const hero: HeroContent = {
  eyebrow: "Speech & Debate Coaching",
  // The wordmark itself. Driven from siteMeta so it can never drift out
  // of step with the one in the header.
  headline: siteMeta.name,
  subhead:
    "Free workshops and private coaching for Elementary, Middle, and High School students, taught by experienced competitors and state finalists.",
  primaryCta: {
    label: "Book a free first lesson",
    href: "https://calendly.com/speechanddebateworkshop/30min",
    external: true,
  },
  secondaryCta: {
    label: "See upcoming workshops",
    href: "#upcoming",
  },
  scrollCue: "Scroll",
};
