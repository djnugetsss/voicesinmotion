"use client";

import { Parallax, RevealBlock, RevealWords, usePrefersReducedMotion } from "@/components/motion";
import { Section, SectionEyebrow } from "@/components/layout/Section";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { reviews } from "@/content";

/** Depth lanes: a resting offset and a scroll rate per column position. */
const lanes = [
  { offset: 0, rate: 0.05 },
  { offset: 22, rate: -0.04 },
  { offset: -14, rate: 0.07 },
  { offset: 12, rate: -0.03 },
];

/** Seconds per full pass. Scaled by card count so speed stays constant. */
const SECONDS_PER_CARD = 11;

export function ReviewsSection() {
  const reduced = usePrefersReducedMotion();
  const list = reviews.reviews;

  // One "copy" has to be at least as wide as the viewport or the loop shows a
  // gap, so short lists get repeated before the track is doubled.
  const copies = Math.max(1, Math.ceil(4 / Math.max(list.length, 1)));
  const base = Array.from({ length: copies }, () => list).flat();
  const duration = base.length * SECONDS_PER_CARD;

  const header = (
    <div className="shell">
      <RevealBlock>
        <SectionEyebrow>{reviews.eyebrow}</SectionEyebrow>
      </RevealBlock>
      <RevealWords
        as="h2"
        id="reviews-heading"
        text={reviews.title}
        className="font-display mt-6 text-[length:var(--text-section)] text-ink"
        stagger={0.05}
        distance={22}
      />
      <RevealBlock delay={0.2}>
        <p className="mt-5 max-w-[46ch] text-[length:var(--text-lead)] leading-[1.6] text-ink/70">
          {reviews.intro}
        </p>
      </RevealBlock>
    </div>
  );

  return (
    <Section
      id={reviews.id}
      tone="paper"
      size="md"
      contained={false}
      labelledBy="reviews-heading"
    >
      {header}

      {reduced ? (
        // Static grid: no marquee, no parallax, nothing moving.
        <div className="shell mt-12 sm:mt-16">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((review) => (
              <li key={review.id}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className="marquee group relative mt-12 overflow-hidden py-10 sm:mt-16"
          style={{
            // Fade the ends rather than painting a gradient over them, so the
            // section wash shows through unchanged.
            maskImage:
              "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
          }}
        >
          <div
            className="marquee-track flex w-max gap-5"
            style={{ ["--marquee-duration" as string]: `${duration}s` }}
          >
            {[0, 1].map((copy) =>
              base.map((review, i) => {
                const lane = lanes[i % lanes.length];
                return (
                  <Parallax
                    key={`${copy}-${review.id}-${i}`}
                    rate={lane.rate}
                    className="w-[78vw] shrink-0 sm:w-[22rem] lg:w-[24rem]"
                  >
                    <div
                      style={{ transform: `translateY(${lane.offset}px)` }}
                      // The second pass is decoration; one copy is enough for
                      // anyone reading the page with a screen reader.
                      aria-hidden={copy === 1 ? "true" : undefined}
                    >
                      <ReviewCard review={review} />
                    </div>
                  </Parallax>
                );
              }),
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
