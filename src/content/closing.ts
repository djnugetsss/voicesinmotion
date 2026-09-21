import type { ClosingContent } from "./types";

export const closing: ClosingContent = {
  id: "start",
  headline: "Your first session is free.",
  subhead:
    "Book a thirty-minute session to meet a coach and find your event, or sign up for a summer workshop and start with a group.",
  primaryCta: {
    label: "Book a free 30-min session",
    href: "https://calendly.com/speechanddebateworkshop/30min",
    external: true,
  },
  secondaryCta: {
    label: "Sign up for summer workshops",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSeDEe_dA-TavbChmoVPhfHpz-vaMm8Oks_Or1VwxuAwbtI0tw/viewform",
    external: true,
  },
};
