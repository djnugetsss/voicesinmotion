import type { CoachesContent } from "./types";

/* ---------------------------------------------------------------------------
 * PLACEHOLDER COACHES
 *
 * All four people below are invented, with deliberately fake surnames, and are
 * marked `placeholder: true` (which surfaces as `data-placeholder` in the DOM).
 * Their achievements are filler too. Replace every field before this goes
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
    "Every coach has stood at the podium themselves, recently enough to remember exactly what it asks of you.",
  coaches: [
    {
      id: "coach-1",
      name: "Avery Placeholder",
      role: "Lead Coach, Speech",
      events: "Original Oratory · Informative",
      achievements: ["State Finalist", "3× National Qualifier"],
      bio:
        "Placeholder bio. Coaches Original Oratory and Informative, with a focus on turning a first draft into something a student can actually deliver. Works best with speakers who have a thesis but not yet a voice.",
      photo: null,
      placeholder: true,
    },
    {
      id: "coach-2",
      name: "Jordan Example",
      role: "Lead Coach, Debate",
      events: "Lincoln–Douglas · Public Forum",
      achievements: ["State Semifinalist", "Regional Champion"],
      bio:
        "Placeholder bio. Runs the Lincoln–Douglas and Public Forum tracks, and spends most of a session on case construction and the questions a good opponent will ask.",
      photo: null,
      placeholder: true,
    },
    {
      id: "coach-3",
      name: "Riley Sample",
      role: "Coach, Interpretation",
      events: "Dramatic Interp · Duo",
      achievements: ["State Finalist", "2× Tournament Champion"],
      bio:
        "Placeholder bio. Coaches Dramatic Interpretation and Duo, working on blocking, character and the discipline of cutting a piece down to time.",
      photo: null,
      placeholder: true,
    },
    {
      id: "coach-4",
      name: "Casey Stand-In",
      role: "Coach, Congress",
      events: "Student Congress · Extemp",
      achievements: ["Presiding Officer, State", "National Qualifier"],
      bio:
        "Placeholder bio. Covers Student Congress and Extemp, with an emphasis on reading the room, thinking on the clock, and sounding prepared without sounding scripted.",
      photo: null,
      placeholder: true,
    },
    {
      id: "coach-5",
      name: "Morgan Filler",
      role: "Coach, Speech",
      events: "Declamation · Impromptu",
      achievements: ["Regional Finalist", "2× Tournament Finalist"],
      bio:
        "Placeholder bio. Works with newer speakers on the first month of the event: picking a piece, getting through it once, and building the habit of speaking out loud on purpose.",
      photo: null,
      placeholder: true,
    },
    {
      id: "coach-6",
      name: "Taylor Tempname",
      role: "Coach, Debate",
      events: "Policy · Parliamentary",
      achievements: ["State Quarterfinalist", "National Qualifier"],
      bio:
        "Placeholder bio. Handles research-heavy events, and spends sessions on evidence, flowing, and keeping a rebuttal organised under time pressure.",
      photo: null,
      placeholder: true,
    },
  ],
};
