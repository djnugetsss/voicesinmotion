import type { MediaContent } from "./types";

/* ---------------------------------------------------------------------------
 * PLACEHOLDER GALLERY
 *
 * All twelve entries have `src: null` and `placeholder: true`, so they render
 * as palette gradients in boxes already reserved at their `aspect`. The whole
 * layout (masonry balance, filters, lightbox, keyboard navigation) is
 * testable exactly as it will behave with real files.
 *
 * To add a real one: drop the file in `public/media/`, set `src`, write a real
 * `alt`, and set `placeholder: false`. Keep `aspect` matched to the file's own
 * width ÷ height or the reserved box will be the wrong shape.
 *
 * `type: "video"` expects a file a <video> element can play (mp4/webm).
 * ------------------------------------------------------------------------- */

export const media: MediaContent = {
  eyebrow: "Media",
  title: "From the room.",
  intro:
    "Workshops, tournaments, and the people who run them. Select any frame to open it.",
  filters: [
    { id: "all", label: "All" },
    { id: "workshops", label: "Workshops" },
    { id: "competitions", label: "Competitions" },
    { id: "team", label: "Team" },
  ],
  items: [
    {
      id: "media-01",
      type: "image",
      src: null,
      alt: "Placeholder image: saturday morning group workshop",
      caption: "Saturday morning group workshop",
      aspect: 1.35,
      category: "workshops",
      placeholder: true,
    },
    {
      id: "media-02",
      type: "image",
      src: null,
      alt: "Placeholder image: final round, original oratory",
      caption: "Final round, Original Oratory",
      aspect: 0.8,
      category: "competitions",
      placeholder: true,
    },
    {
      id: "media-03",
      type: "image",
      src: null,
      alt: "Placeholder image: coaches between rounds",
      caption: "Coaches between rounds",
      aspect: 1.0,
      category: "team",
      placeholder: true,
    },
    {
      id: "media-04",
      type: "image",
      src: null,
      alt: "Placeholder image: impromptu drills",
      caption: "Impromptu drills",
      aspect: 0.75,
      category: "workshops",
      placeholder: true,
    },
    {
      id: "media-05",
      type: "video",
      src: null,
      alt: "Placeholder video: awards ceremony",
      caption: "Awards ceremony",
      aspect: 1.78,
      category: "competitions",
      placeholder: true,
    },
    {
      id: "media-06",
      type: "image",
      src: null,
      alt: "Placeholder image: planning the workshop schedule",
      caption: "Planning the workshop schedule",
      aspect: 0.85,
      category: "team",
      placeholder: true,
    },
    {
      id: "media-07",
      type: "image",
      src: null,
      alt: "Placeholder image: breakout room, public forum",
      caption: "Breakout room, Public Forum",
      aspect: 1.5,
      category: "workshops",
      placeholder: true,
    },
    {
      id: "media-08",
      type: "image",
      src: null,
      alt: "Placeholder image: waiting for the posting",
      caption: "Waiting for the posting",
      aspect: 0.9,
      category: "competitions",
      placeholder: true,
    },
    {
      id: "media-09",
      type: "image",
      src: null,
      alt: "Placeholder image: after the last round",
      caption: "After the last round",
      aspect: 1.2,
      category: "team",
      placeholder: true,
    },
    {
      id: "media-10",
      type: "video",
      src: null,
      alt: "Placeholder video: one-on-one feedback",
      caption: "One-on-one feedback",
      aspect: 0.66,
      category: "workshops",
      placeholder: true,
    },
    {
      id: "media-11",
      type: "image",
      src: null,
      alt: "Placeholder image: novice division semifinal",
      caption: "Novice division semifinal",
      aspect: 1.33,
      category: "competitions",
      placeholder: true,
    },
    {
      id: "media-12",
      type: "image",
      src: null,
      alt: "Placeholder image: the whole group, winter session",
      caption: "The whole group, winter session",
      aspect: 1.0,
      category: "team",
      placeholder: true,
    },
  ],
};
