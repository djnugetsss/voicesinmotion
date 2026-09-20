import type { ReviewsContent } from "./types";

/* ---------------------------------------------------------------------------
 * Adding reviews
 *
 * Append to `reviews` below. The marquee sizes and loops itself from the list
 * length — nothing else needs touching, and it reads comfortably anywhere from
 * two entries up to ten or more. Only add reviews people actually wrote.
 * ------------------------------------------------------------------------- */

export const reviews: ReviewsContent = {
  id: "reviews",
  eyebrow: "Reviews",
  title: "What families say.",
  intro:
    "From students who competed and parents who watched them grow into it.",
  reviews: [
    {
      id: "esha-w",
      quote:
        "Well planned and executed. My daughter got hooked to sparring after joining the camp with the coaches",
      name: "Esha W",
      role: "Parent",
      session: "Winter Session",
    },
    {
      id: "ishaan-p",
      quote:
        "You guys were amazing and explained everything in a detailed matter which helped me to be successful in these workshops",
      name: "Ishaan P",
      role: "Student",
      session: "Summer Session",
    },
  ],
};
