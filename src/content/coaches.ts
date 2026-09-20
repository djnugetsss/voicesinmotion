import type { CoachesContent } from "./types";

/* ---------------------------------------------------------------------------
 * PLACEHOLDER COACHES
 *
 * All four people below are invented, with deliberately fake surnames, and are
 * marked `placeholder: true` (which surfaces as `data-placeholder` in the DOM).
 * Their achievements are filler too — replace every field before this goes
 * live.
 *
 * To add a photo: set `photo` to `{ src: "/coaches/name.jpg", alt: "..." }`
 * and drop the file in `public/coaches/`. The card swaps the gradient block
 * for the image automatically and keeps the same 4:5 crop.
 * ------------------------------------------------------------------------- */

export const coaches: CoachesContent = {
  id: "coaches",
  eyebrow: "The coaches",
  title: "Taught by people who competed.",
  intro:
    "Every coach has stood at the podium themselves — recently enough to remember exactly what it asks of you.",
  coaches: [
    {
      id: "coach-1",
      name: "Avery Placeholder",
      role: "Lead Coach, Speech",
      events: "Original Oratory · Informative",
      achievements: ["State Finalist", "3× National Qualifier"],
      photo: null,
      placeholder: true,
    },
    {
      id: "coach-2",
      name: "Jordan Example",
      role: "Lead Coach, Debate",
      events: "Lincoln–Douglas · Public Forum",
      achievements: ["State Semifinalist", "Regional Champion"],
      photo: null,
      placeholder: true,
    },
    {
      id: "coach-3",
      name: "Riley Sample",
      role: "Coach, Interpretation",
      events: "Dramatic Interp · Duo",
      achievements: ["State Finalist", "2× Tournament Champion"],
      photo: null,
      placeholder: true,
    },
    {
      id: "coach-4",
      name: "Casey Stand-In",
      role: "Coach, Congress",
      events: "Student Congress · Extemp",
      achievements: ["Presiding Officer, State", "National Qualifier"],
      photo: null,
      placeholder: true,
    },
  ],
};
