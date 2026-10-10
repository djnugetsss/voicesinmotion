/**
 * Real photos placed in the empty space beside section copy. `aspect` is the
 * box the image is cropped into (width ÷ height), not necessarily the file's
 * own ratio.
 */
export type Photo = {
  src: string;
  alt: string;
  aspect: number;
};

export const photos = {
  workshopGroup: {
    src: "/photos/workshop-group.jpg",
    alt: "Students gathered around a screen reading “Speak Up and Stand Out: Interactive Speech and Debate Workshop”.",
    aspect: 1088 / 630,
  },
  yearInReview: {
    src: "/photos/year-in-review.jpg",
    alt: "Voices in Motion year in review: 13 bronze medals, 5 silver medals, 4 gold medals, 2 national finalists and 1 state champion.",
    aspect: 958 / 1194,
  },
  trophy: {
    src: "/photos/trophy-selfie.jpg",
    alt: "Two students smiling for a selfie, one holding a gold trophy.",
    aspect: 906 / 1194,
  },
  zoomPrograms: {
    src: "/photos/zoom-workshop-a.jpg",
    alt: "A video call grid of students attending an online Voices in Motion workshop.",
    aspect: 1134 / 636,
  },
  zoomReviews: {
    src: "/photos/zoom-workshop-b.jpg",
    alt: "A full video call of students joining an online Voices in Motion session.",
    aspect: 1134 / 636,
  },
} satisfies Record<string, Photo>;
