import type { ReviewsContent } from "./types";

/* ---------------------------------------------------------------------------
 * Adding reviews
 *
 * Append to `reviews` below. The marquee sizes and loops itself from the list
 * length. Nothing else needs touching, and it reads comfortably anywhere from
 * two entries up to ten or more. Only add reviews people actually wrote.
 *
 * `quote` is reproduced verbatim, including any grammar or spelling of the
 * original. Do not tidy it up.
 *
 * `role` and `session` are both optional. Leave them out and the card renders
 * the name on its own, with no empty line and no stray separator.
 * ------------------------------------------------------------------------- */

export const reviews: ReviewsContent = {
  id: "reviews",
  eyebrow: "Reviews",
  title: "What families say.",
  intro:
    "From students who competed and parents who watched them grow into it.",
  reviews: [
    {
      id: "ishaan-p",
      quote:
        "You guys were amazing and explained everything in a detailed matter which helped me to be successful in these workshops",
      name: "Ishaan P",
      role: "Student",
      session: "Summer Session",
    },
    {
      id: "hem-n",
      quote:
        "As high schoolers, Ash and Kahan can connect with students with engaging drills and understands what they actually need!",
      name: "Hem N.",
    },
    {
      id: "ayaan-k",
      quote:
        "Love how detailed oriented you both are. It requires lot of patience to teach these many kids, and you both are very good at it. My student enjoyed being in your class.",
      name: "Ayaan K.",
    },
    {
      id: "srini-a",
      quote:
        "Well planned and executed. My daughter got hooked to sparring after joining the camp with Kahan and Ash. More strength to you both and all the best for future!",
      name: "Srini A.",
    },
  ],
};
