import type { Cta, NavLink, SiteMeta, SocialLink } from "./types";
import { showMedia } from "./flags";

export const siteMeta: SiteMeta = {
  name: "Voices In Motion",
  shortName: "Voices In Motion",
  tagline: "Speech & Debate Coaching",
  description:
    "Free group workshops and private speech & debate coaching for Elementary, Middle, and High School students, taught by experienced competitors and state finalists.",
  url: "https://voicesinmotion.net",
};

/* The Media entry is dropped while `showMedia` is false. See `flags.ts`. */
export const navLinks: NavLink[] = (
  [
    { label: "Home", href: "/", kind: "route" },
    { label: "Workshops", href: "/#workshops", kind: "anchor" },
    { label: "Private Lessons", href: "/#lessons", kind: "anchor" },
    { label: "Reviews", href: "/#reviews", kind: "anchor" },
    { label: "About", href: "/about", kind: "route" },
    { label: "Media", href: "/media", kind: "route" },
  ] satisfies NavLink[]
).filter((link) => showMedia || link.href !== "/media");

export const socialLinks: SocialLink[] = [
  {
    label: "Voices In Motion on Instagram",
    href: "https://instagram.com/voicesinmotion2024",
    icon: "instagram",
  },
];

export const bookingCta: Cta = {
  label: "Book a free lesson",
  href: "https://calendly.com/speechanddebateworkshop/30min",
  external: true,
};
