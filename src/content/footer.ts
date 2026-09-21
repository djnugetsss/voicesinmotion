import type { FooterContent, NavLink } from "./types";
import { showMedia } from "./flags";
import { siteMeta } from "./site";

/* ---------------------------------------------------------------------------
 * Set `email` to `null` to drop the contact line entirely and leave Instagram
 * as the only way to get in touch.
 * ------------------------------------------------------------------------- */

export const footer: FooterContent = {
  blurb:
    "Free group workshops and private speech & debate coaching for Elementary, Middle, and High School students, taught by experienced competitors and state finalists.",
  linksTitle: "Explore",
  /* The Media entry is dropped while `showMedia` is false. See `flags.ts`. */
  links: (
    [
      { label: "Home", href: "/", kind: "route" },
      { label: "Workshops", href: "/#workshops", kind: "anchor" },
      { label: "Private Lessons", href: "/#lessons", kind: "anchor" },
      { label: "About", href: "/about", kind: "route" },
      { label: "Media", href: "/media", kind: "route" },
    ] satisfies NavLink[]
  ).filter((link) => showMedia || link.href !== "/media"),
  contactTitle: "Get in touch",
  email: { address: "speechanddebateworkshop@gmail.com", placeholder: false },
  contactNote: "Questions about a workshop or a lesson? Send a note or a DM.",
  copyright: `© ${new Date().getFullYear()} ${siteMeta.name}. All rights reserved.`,
};
