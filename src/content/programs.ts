import type { ProgramsContent } from "./types";

export const programs: ProgramsContent = {
  eyebrow: "Programs",
  title: "Two ways to start.",
  intro:
    "Come to a free group workshop, or work one-on-one with a coach. Most students do both.",
  programs: [
    {
      id: "workshops",
      kicker: "Free · Group",
      title: "Free Group Workshops",
      audience: "Elementary, Middle, and High School",
      description:
        "Open group sessions that cover the fundamentals: speaking with presence, structuring an argument, and thinking on your feet. No experience needed, and no cost.",
      points: [
        "Open to Elementary, Middle, and High School students",
        "Taught by experienced competitors and state finalists",
        "No prior speech or debate experience required",
      ],
      ctas: [
        {
          label: "Sign up for summer workshops",
          href: "https://docs.google.com/forms/d/e/1FAIpQLSeDEe_dA-TavbChmoVPhfHpz-vaMm8Oks_Or1VwxuAwbtI0tw/viewform",
          external: true,
        },
      ],
      tone: "workshops",
    },
    {
      id: "lessons",
      kicker: "One-on-one",
      title: "Private Lessons",
      audience: "Individually paced coaching",
      description:
        "One-on-one coaching built around a single student: their event, their cases, their delivery. Fee-based, and the first session is always free.",
      points: [
        "One-on-one sessions matched to your event",
        "First session free, no commitment",
        "Ongoing case, research and delivery feedback",
      ],
      ctas: [
        {
          label: "Book a free 30-min session",
          href: "https://calendly.com/speechanddebateworkshop/30min",
          external: true,
        },
        {
          label: "Join the private lesson program",
          href: "https://docs.google.com/forms/d/e/1FAIpQLScrWPrKrC7blduZJcldo-LAT4_baWtI2trFeFGAGOSIcGk_1A/viewform",
          external: true,
        },
      ],
      tone: "lessons",
    },
  ],
};
