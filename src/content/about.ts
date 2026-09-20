import type { AboutContent } from "./types";

/* ---------------------------------------------------------------------------
 * PLACEHOLDER PROSE
 *
 * The story below is scaffolding written to the right shape and length — it is
 * not the real history of Voices In Motion. Replace every paragraph.
 *
 * Images: each block's `image.src` is `null`, which renders a palette gradient
 * in a box already reserved at `image.aspect`. Set `src` to a file in
 * `public/` and the real picture drops straight in at the same size.
 * ------------------------------------------------------------------------- */

export const about: AboutContent = {
  hero: {
    eyebrow: "About",
    headline: "Coached by people who've been in the room.",
    subhead:
      "Voices In Motion is run by competitors and state finalists who were standing at the podium themselves not long ago.",
  },
  story: {
    eyebrow: "How it started",
    title: "A room, a timer, and one nervous speaker.",
    blocks: [
      {
        id: "origin",
        heading: "It started with a borrowed classroom.",
        body: [
          "Placeholder prose. The first workshop ran on a Saturday morning in a room that had been booked for something else, with a handful of students who had never given a speech that anyone had to judge.",
          "Nobody had a curriculum. What they had was a timer, a whiteboard, and a group of competitors who remembered exactly how it felt to stand up with nothing but an outline.",
        ],
        image: {
          src: null,
          alt: "Placeholder: the first workshop session",
          aspect: 1.35,
        },
      },
      {
        id: "growing",
        heading: "The free workshops came first, and stayed free.",
        body: [
          "Placeholder prose. Word moved between families faster than anyone expected, and the group sessions grew from one room into a standing schedule across the school year.",
          "The decision to keep the group workshops free was made early and has not changed. Private coaching funds the program; the workshops stay open to anyone who wants to try.",
        ],
        image: {
          src: null,
          alt: "Placeholder: a group workshop in progress",
          aspect: 0.85,
        },
      },
      {
        id: "today",
        heading: "Now it runs year-round.",
        body: [
          "Placeholder prose. Today the program covers Elementary, Middle, and High School students across speech and debate events, with coaches who are still actively competing.",
          "The measure has never been trophies. It is the moment a student stops reading their notes and starts talking to the room.",
        ],
        image: {
          src: null,
          alt: "Placeholder: students at a recent tournament",
          aspect: 1.5,
        },
      },
    ],
  },
  mission: {
    eyebrow: "What we teach",
    title: "Three things, taught together.",
    pillars: [
      {
        id: "presence",
        icon: "podium",
        title: "Presence",
        body: "Standing up, slowing down, and holding a room without hiding behind a script.",
      },
      {
        id: "argument",
        icon: "scales",
        title: "Argument",
        body: "Building a case that survives contact with someone who disagrees with it.",
      },
      {
        id: "voice",
        icon: "waveform",
        title: "Voice",
        body: "Finding the register that sounds like you, then using it on purpose.",
      },
    ],
  },
  roster: {
    eyebrow: "The full roster",
    title: "Meet the coaches.",
    intro:
      "Select a coach to read more about how they work and what they compete in.",
  },
};
