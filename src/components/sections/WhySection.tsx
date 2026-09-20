"use client";

import { useScroll, type MotionValue } from "motion/react";
import { useCallback, useRef } from "react";
import {
  RevealBlock,
  RevealWords,
  useMinWidth,
  usePrefersReducedMotion,
  useScrubbedStyle,
} from "@/components/motion";
import { CountUp } from "@/components/ui/CountUp";
import { why } from "@/content";

/**
 * Fades in once the line has finished assembling. Scrubbed while the section
 * is pinned; a plain timed reveal everywhere else.
 */
function QuoteAttribution({
  progress,
  scrubbed,
  text,
}: {
  progress: MotionValue<number>;
  scrubbed: boolean;
  text: string;
}) {
  const apply = useCallback((element: HTMLElement, p: number) => {
    const t = p < 0.74 ? 0 : p > 0.88 ? 1 : (p - 0.74) / 0.14;
    element.style.opacity = t.toFixed(3);
    element.style.transform = `translate3d(0, ${((1 - t) * 14).toFixed(2)}px, 0)`;
    element.style.willChange = t >= 1 ? "auto" : "transform, opacity";
  }, []);

  const ref = useScrubbedStyle<HTMLElement>(progress, apply, scrubbed);

  const body = (
    <>
      <span aria-hidden="true" className="mr-3 inline-block h-px w-8 align-middle bg-ink/25" />
      {text}
    </>
  );

  const className =
    "mt-8 text-[0.8125rem] tracking-[0.18em] text-ink/55 uppercase sm:mt-10";

  if (!scrubbed) {
    return (
      <RevealBlock delay={0.5} distance={14}>
        <figcaption className={className}>{body}</figcaption>
      </RevealBlock>
    );
  }

  return (
    <figcaption ref={ref} className={className} style={{ opacity: 0 }}>
      {body}
    </figcaption>
  );
}

export function WhySection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const wide = useMinWidth(1024);

  // The pinned scrub needs both the height to scroll through and a visitor who
  // has not asked us to stop moving things.
  const scrubbed = wide && !reduced;

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  // No `overflow-hidden` on the section: it would become the sticky
  // descendant's scroll container and the pin would silently stop working.
  // The drift blob is clipped by the background layer instead.
  return (
    <section id={why.id} aria-labelledby="why-heading" className="relative isolate">
      {/* Paper into mist. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, var(--paper) 0%, var(--mist) 42%, var(--mist) 78%, color-mix(in oklab, var(--mist) 60%, var(--paper)) 100%)",
          }}
        />
        <div
          className="drift-b absolute top-[12%] -left-[18%] h-[70vh] w-[70vw] rounded-full blur-[90px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--sky) 40%, transparent) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ---- The pinned moment ---- */}
      <div ref={pinRef} className="relative motion-safe:lg:h-[300vh]">
        <div className="motion-safe:lg:sticky motion-safe:lg:top-0 motion-safe:lg:flex motion-safe:lg:h-screen motion-safe:lg:items-center">
          <div className="shell py-24 sm:py-28 motion-safe:lg:py-0">
            <h2
              id="why-heading"
              className="flex items-center gap-2.5 text-[length:var(--text-eyebrow)] font-medium tracking-[0.2em] text-ink/55 uppercase"
            >
              <span
                aria-hidden="true"
                className="inline-block h-px w-6 shrink-0 bg-ink/25"
              />
              {why.eyebrow}
            </h2>

            <figure className="mt-8 sm:mt-10">
              <blockquote>
                <RevealWords
                  as="p"
                  text={why.quote.text}
                  progress={scrubbed ? scrollYProgress : undefined}
                  scrubRange={[0.06, 0.7]}
                  className="font-display max-w-[19ch] text-[length:var(--text-quote)] leading-[1.02] text-ink"
                  distance={28}
                  blur={12}
                  stagger={0.06}
                  duration={0.9}
                />
              </blockquote>

              <QuoteAttribution
                progress={scrollYProgress}
                scrubbed={scrubbed}
                text={why.quote.attribution}
              />
            </figure>
          </div>
        </div>
      </div>

      {/* ---- Supporting copy ---- */}
      <div className="shell pb-20 sm:pb-24 motion-safe:lg:pt-10">
        <div className="grid gap-x-16 gap-y-6 lg:grid-cols-2">
          {why.body.map((paragraph, i) => (
            <RevealBlock
              key={i}
              as="p"
              delay={i * 0.08}
              className="max-w-[58ch] text-[length:var(--text-lead)] leading-[1.65] text-ink/70"
            >
              {paragraph}
            </RevealBlock>
          ))}
        </div>

        {/* ---- Counted stats ---- */}
        <ul className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3 sm:gap-5">
          {why.stats.map((stat, i) => (
            <RevealBlock key={stat.id} as="li" delay={i * 0.1} distance={22}>
              <div
                data-placeholder={stat.placeholder || undefined}
                className="relative h-full overflow-hidden rounded-[1.5rem] border border-ink/10 p-6 sm:p-7"
                style={{
                  backgroundImage:
                    "linear-gradient(160deg, color-mix(in oklab, var(--paper) 88%, transparent) 0%, color-mix(in oklab, var(--sky) 20%, transparent) 100%)",
                }}
              >
                <p className="font-display text-[length:var(--text-stat)] leading-none text-ink">
                  <CountUp value={stat.value} decimals={stat.decimals ?? 0} />
                  {stat.suffix ? (
                    <span className="text-azure">{stat.suffix}</span>
                  ) : null}
                </p>
                <p className="mt-4 max-w-[22ch] text-[0.9375rem] leading-[1.5] text-ink/60">
                  {stat.label}
                </p>
              </div>
            </RevealBlock>
          ))}
        </ul>
      </div>
    </section>
  );
}
