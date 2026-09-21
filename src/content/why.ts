import type { WhyContent } from "./types";

/* ---------------------------------------------------------------------------
 * PLACEHOLDER NUMBERS
 *
 * Every `value` in `stats` below is invented filler, marked `placeholder: true`.
 * Replace the numbers (and the labels, if they do not match what you count)
 * and set `placeholder: false`. Nothing else needs to change: the cards read
 * `value`, `suffix` and `decimals` straight from here and count up to them.
 * ------------------------------------------------------------------------- */

export const why: WhyContent = {
  id: "why",
  eyebrow: "Why speech & debate",
  quote: {
    text: "Speech is power: speech is to persuade, to convert, to compel.",
    attribution: "Ralph Waldo Emerson",
  },
  body: [
    "Speech and debate is where students learn to think on their feet. Every round asks them to research an unfamiliar question, build an argument that holds up under pressure, and deliver it clearly enough to move a room: public speaking, critical thinking, and persuasive communication practiced together rather than one at a time.",
    "Students who compete consistently excel academically, and the confidence they build lasts. The habits they form here (reading closely, listening carefully, saying exactly what they mean) carry through high school, into college, and well beyond.",
  ],
  stats: [
    {
      id: "students",
      value: 300,
      suffix: "+",
      label: "Students coached since 2024",
      placeholder: false,
    },
    {
      id: "workshops",
      value: 40,
      suffix: "+",
      label: "Free workshop hours taught",
      placeholder: true,
    },
    {
      id: "finalists",
      value: 8,
      label: "State finalists on the coaching staff",
      placeholder: true,
    },
  ],
};
