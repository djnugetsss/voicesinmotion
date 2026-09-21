"use client";

import { useRef, useState } from "react";
import { Parallax, RevealBlock, RevealWords, usePrefersReducedMotion } from "@/components/motion";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
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

  const trackRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);

  /*
    The loop translates -50%, so one half of the track has to be at least as
    wide as the viewport or a gap opens up at the seam. How many repeats that
    takes depends on the card width and the screen, so it is measured rather
    than assumed — a fixed count left a visible gap at 1920 and wider.
  */
  useIsomorphicLayoutEffect(() => {
    const host = trackRef.current;
    if (!host || reduced) return;

    const compute = () => {
      const card = host.querySelector<HTMLElement>("[data-review-card]");
      if (!card) return;
      const unit = card.getBoundingClientRect().width + 20; // gap-5
      const onePass = unit * Math.max(list.length, 1);
      if (onePass <= 0) return;
      setCopies(Math.max(2, Math.ceil(host.clientWidth / onePass) + 1));
    };

    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(host);
    return () => observer.disconnect();
  }, [list.length, reduced]);

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
          ref={trackRef}
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
                      data-review-card
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
