import type { WorkshopsContent } from "./types";

/* ---------------------------------------------------------------------------
 * Sign-ups
 *
 * Each session carries its own `signupUrl`. While it is `null` the card shows
 * a muted "Sign-up opens soon" state. Paste the form link in and the same card
 * renders a live sign-up button instead. Nothing else has to change.
 *
 * Neither session is billed as free or paid, and no price is shown: that is
 * not confirmed yet. Add a `description` line to a session if it needs one.
 * ------------------------------------------------------------------------- */

export const workshops: WorkshopsContent = {
  id: "upcoming",
  eyebrow: "Upcoming workshops",
  title: "Two sessions.",
  intro:
    "Two workshops to close out 2026. Sign-ups open closer to each session, and both are open to Elementary, Middle, and High School students.",
  signupLabel: "Sign up",
  signupPendingLabel: "Sign-up opens soon",
  sessions: [
    {
      id: "community-workshop",
      marker: "01",
      name: "Community Workshop",
      dates: "October 24–25, 2026",
      signupUrl: null,
    },
    {
      id: "winter-workshop",
      marker: "02",
      name: "Winter Workshop",
      dates: "December 2026 (exact dates TBA)",
      signupUrl: null,
    },
  ],
};
