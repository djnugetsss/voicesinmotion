import type { ClosingContent } from "./types";

export const closing: ClosingContent = {
  id: "start",
  headline: "Your first session is free.",
  subhead:
    "Book a thirty-minute session to meet a coach and find your event, or come to an upcoming group workshop and start alongside other students.",
  primaryCta: {
    label: "Book a free 30-min session",
    href: "https://calendly.com/speechanddebateworkshop/30min",
    external: true,
  },
  secondaryCta: {
    label: "See upcoming workshops",
    href: "#upcoming",
  },
};
