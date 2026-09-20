"use client";

import { useScroll, useTransform, motion, type MotionValue } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  RevealBlock,
  RevealWords,
  useMinWidth,
  usePrefersReducedMotion,
} from "@/components/motion";
import { Section, SectionEyebrow } from "@/components/layout/Section";
import { SessionCard } from "@/components/ui/SessionCard";
import { Waveform } from "@/components/ui/Waveform";
import { summer } from "@/content";

/**
 * The line between two stops. A waveform on the pinned desktop timeline whose
 * amplitude rises as the reader travels along it; a plain vertical hairline in
 * the stacked fallback.
 */
function TimelineConnector({
  progress,
  range,
  scrubbed,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  scrubbed: boolean;
}) {
  const amplitude = useTransform(progress, range, [0, 1]);

  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center motion-safe:lg:h-44 motion-safe:lg:w-[clamp(8rem,13vw,17rem)]"
    >
      <span className="block h-10 w-px bg-ink/12 motion-safe:lg:hidden" />
      <div className="hidden h-full w-full motion-safe:lg:block">
        <Waveform
          progress={scrubbed ? amplitude : undefined}
          amplitude={0.18}
          amplitudeGain={2.8}
          speed={0.07}
          frequency={1.15}
          lineCount={2}
          strokeWidth={1.25}
          interactive={false}
          accentIndex={-1}
        />
      </div>
    </div>
  );
}

export function SummerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const reduced = usePrefersReducedMotion();
  const wide = useMinWidth(1024);
  const pinned = wide && !reduced;

  const [metrics, setMetrics] = useState({ shift: 0, height: 0 });

  /**
   * Vertical scroll per pixel of horizontal travel. Above 1 the timeline
   * advances slower than the page, which gives each card room to arrive and
   * settle instead of whipping past.
   */
  const PACE = 1.6;

  // How far the track has to travel, and therefore how much vertical scroll
  // the pin needs. Measured rather than guessed, so card widths and copy
  // length can change without retuning anything.
  useEffect(() => {
    if (!pinned) return;

    const measure = () => {
      const track = trackRef.current;
      const view = viewportRef.current;
      if (!track || !view) return;
      const shift = Math.max(0, track.scrollWidth - view.clientWidth);
      setMetrics({ shift, height: window.innerHeight + shift * PACE });
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Derived rather than reset in the effect: when the section is not pinned
  // the measurement is simply ignored, so it can go stale harmlessly.
  const shift = pinned ? metrics.shift : 0;
  const x = useTransform(scrollYProgress, [0, 1], [0, -shift]);

  const count = summer.sessions.length;

  // The first card is already on screen when the pin engages, so its window
  // sits entirely before progress 0 — it is locked from the first frame.
  const cardRange = (i: number): [number, number] =>
    i === 0 ? [-0.2, -0.1] : [i / count - 0.12, i / count + 0.06];

  const connectorRange = (i: number): [number, number] => {
    const [start, end] = cardRange(i);
    return [start - 0.14, end];
  };

  return (
    <Section
      id={summer.id}
      tone="sky"
      size="flush"
      contained={false}
      labelledBy="summer-heading"
    >
      <div ref={sectionRef} style={pinned && metrics.height ? { height: metrics.height } : undefined}>
        <div
          ref={viewportRef}
          className="flex flex-col justify-center py-24 sm:py-28 motion-safe:lg:sticky motion-safe:lg:top-0 motion-safe:lg:h-screen motion-safe:lg:overflow-hidden motion-safe:lg:py-0"
        >
          <div className="shell">
            <RevealBlock>
              <SectionEyebrow>{summer.eyebrow}</SectionEyebrow>
            </RevealBlock>

            <RevealWords
              as="h2"
              id="summer-heading"
              text={summer.title}
              className="font-display mt-6 text-[length:var(--text-section)] text-ink"
              stagger={0.05}
              distance={22}
            />

            <RevealBlock delay={0.2}>
              <p className="mt-5 max-w-[42ch] text-[length:var(--text-lead)] leading-[1.6] text-ink/70">
                {summer.intro}
              </p>
            </RevealBlock>
          </div>

          <motion.div
            ref={trackRef}
            style={{ x, willChange: pinned ? "transform" : "auto" }}
            className="track-gutter mx-auto mt-12 flex w-full max-w-[36rem] flex-col items-center gap-0 px-5 sm:mt-14 sm:px-7 motion-safe:lg:mx-0 motion-safe:lg:mt-16 motion-safe:lg:max-w-none motion-safe:lg:w-max motion-safe:lg:flex-row motion-safe:lg:items-center motion-safe:lg:px-0"
          >
            {summer.sessions.map((session, i) => (
              <Fragment key={session.id}>
                {i > 0 ? (
                  <TimelineConnector
                    progress={scrollYProgress}
                    range={connectorRange(i)}
                    scrubbed={pinned}
                  />
                ) : null}

                {pinned ? (
                  <SessionCard
                    session={session}
                    price={summer.price}
                    progress={scrollYProgress}
                    range={cardRange(i)}
                    scrubbed
                  />
                ) : (
                  <RevealBlock className="w-full" delay={i * 0.08} distance={24}>
                    <SessionCard
                      session={session}
                      price={summer.price}
                      progress={scrollYProgress}
                      range={cardRange(i)}
                      scrubbed={false}
                    />
                  </RevealBlock>
                )}
              </Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
