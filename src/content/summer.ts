import type { SummerContent } from "./types";

export const summer: SummerContent = {
  id: "summer",
  eyebrow: "Summer 2026",
  title: "Three sessions.",
  intro:
    "Three workshops across June and July. Sign up for one, or follow the whole track.",
  /* Price is not set yet. Change `value` and flip `placeholder` to false. */
  price: {
    label: "Price",
    value: "TBA",
    placeholder: true,
  },
  sessions: [
    {
      id: "speech",
      marker: "01",
      name: "Speech Workshop",
      dates: "June 24–28",
      kind: "free",
    },
    {
      id: "debate",
      marker: "02",
      name: "Debate Workshop",
      dates: "July 6–10",
      kind: "free",
    },
    {
      id: "guest",
      marker: "03",
      name: "Guest Speaker Workshop",
      dates: "July 13–15",
      description:
        "Paid workshop with State and National Finalist guest speakers",
      kind: "paid",
    },
  ],
};
