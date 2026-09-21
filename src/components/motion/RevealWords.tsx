"use client";

import { motion, useInView, type MotionValue } from "motion/react";
import {
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
} from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "./use-media-preference";

export type RevealWordsProps = {
  /** The line to deliver. Split on whitespace; punctuation stays with its word. */
  text: string;
  /** Element to render. One `h1` per page, so pass it explicitly. */
  as?: ElementType;
  /** Forwarded to the rendered element: anchor targets, aria-labelledby. */
  id?: string;
  className?: string;
  /** Per-word class, handy for accenting a single word later. */
  wordClassName?: string;
  /** Seconds between each word. ~0.04 reads like measured speech. */
  stagger?: number;
  /** Seconds before the first word moves. */
  delay?: number;
  duration?: number;
  /** Vertical travel in px. */
  distance?: number;
  /** Starting blur in px, resolved to 0. */
  blur?: number;
  /** Replay every time it re-enters the viewport. */
  once?: boolean;
  /**
   * Granularity of the split. `letter` cascades character by character, which
   * suits a short wordmark but is far too busy for a sentence. It is only
   * honoured alongside `eager`, since a per-character entrance belongs on
   * first paint rather than on a scroll trigger.
   */
  splitBy?: "word" | "letter";
  /**
   * Above-the-fold treatment: the entrance runs from CSS instead of Framer,
   * so it paints as soon as the stylesheet lands rather than waiting on
   * hydration, and still reads correctly with no JS at all. Use it for any
   * heading that is visible on first paint; leave it off for anything that
   * should wait to be scrolled to.
   */
  eager?: boolean;
  /**
   * Scrub mode. Pass a 0–1 scroll progress value and the line assembles in
   * step with the scroll instead of firing once on view: the reader delivers
   * the line themselves. Ignored under `prefers-reduced-motion`.
   */
  progress?: MotionValue<number>;
  /** Progress window the whole line is spread across. */
  scrubRange?: [number, number];
  /**
   * How far each word's own transition spills into its neighbour's slot.
   * 1 is strictly sequential; higher overlaps them into a smoother wave.
   */
  scrubOverlap?: number;
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * The scrubbed line.
 *
 * Styles are written to the spans directly from one subscription to the scroll
 * value, rather than by handing each word its own chain of derived motion
 * values. The declarative route computed the right numbers but stopped
 * flushing them to the DOM once a word's window opened, which left the line
 * frozen part-delivered. One subscription for the whole line is also less work
 * per frame than a motion component per word.
 */
function ScrubbedLine({
  words,
  progress,
  rangeFrom,
  rangeTo,
  overlap,
  distance,
  blur,
  wordClassName,
}: {
  words: string[];
  progress: MotionValue<number>;
  rangeFrom: number;
  rangeTo: number;
  overlap: number;
  distance: number;
  blur: number;
  wordClassName?: string;
}) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const count = words.length;

  useEffect(() => {
    const step = (rangeTo - rangeFrom) / Math.max(count, 1);

    const apply = (p: number) => {
      for (let i = 0; i < count; i++) {
        const el = refs.current[i];
        if (!el) continue;

        const start = rangeFrom + i * step;
        const width = Math.min(rangeTo, start + step * overlap) - start;
        const t = width <= 0 ? 1 : clamp01((p - start) / width);
        const settled = t > 0.995;

        el.style.opacity = t.toFixed(3);
        el.style.transform = `translate3d(0, ${((1 - t) * distance).toFixed(2)}px, 0)`;
        // Drop the filter and the hint entirely once a word has arrived, so
        // settled text is painted normally instead of on its own layer.
        el.style.filter = settled ? "" : `blur(${((1 - t) * blur).toFixed(2)}px)`;
        el.style.willChange = settled ? "auto" : "transform, opacity, filter";
      }
    };

    apply(progress.get());
    return progress.on("change", apply);
  }, [progress, count, rangeFrom, rangeTo, overlap, distance, blur]);

  return (
    <>
      {words.map((word, i) => (
        // A keyed fragment, so the space between words stays an ordinary
        // collapsible text node and the line still wraps.
        <Fragment key={`${word}-${i}`}>
          <span
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={cn("inline-block", wordClassName)}
            style={{ opacity: 0 }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

export function RevealWords({
  text,
  as = "span",
  id,
  className,
  wordClassName,
  stagger = 0.04,
  delay = 0,
  duration = 0.85,
  distance = 22,
  blur = 10,
  once = true,
  splitBy = "word",
  eager = false,
  progress,
  scrubRange = [0, 1],
  scrubOverlap = 1.7,
}: RevealWordsProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once, margin: "-10% 0px -15% 0px" });
  const [settled, setSettled] = useState(false);

  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const shown = reduced || inView;
  const scrubbed = Boolean(progress) && !reduced;

  const resting = { opacity: 0, y: distance, filter: `blur(${blur}px)` };
  const delivered = { opacity: 1, y: 0, filter: "blur(0px)" };

  const Tag = as;

  if (eager && !scrubbed) {
    if (splitBy === "letter") {
      // Delays ease out rather than stepping linearly, so the cascade settles
      // instead of arriving at a metronome beat.
      const total = words.reduce((n, word) => n + word.length, 0);
      const delayFor = (i: number) =>
        delay + stagger * Math.pow(i, 0.92) * (total > 1 ? 1 : 0);

      let index = -1;

      return (
        // The characters are split for presentation only, so the heading is
        // named as a whole and the spans are kept out of the tree.
        <Tag id={id} className={className} aria-label={text}>
          {words.map((word, w) => (
            <Fragment key={`${word}-${w}`}>
              {/* Inline-block per word so a line break never lands mid-word. */}
              <span aria-hidden="true" className="inline-block whitespace-nowrap">
                {Array.from(word).map((character, c) => {
                  index += 1;
                  return (
                    <span
                      key={`${character}-${c}`}
                      className={cn("word-in inline-block", wordClassName)}
                      style={{
                        animationDelay: `${delayFor(index).toFixed(3)}s`,
                        animationDuration: `${duration}s`,
                        ["--word-rise" as string]: `${distance}px`,
                        ["--word-blur" as string]: `${blur}px`,
                      }}
                    >
                      {character}
                    </span>
                  );
                })}
              </span>
              {w < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </Tag>
      );
    }

    return (
      <Tag id={id} className={className}>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span
              className={cn("word-in inline-block", wordClassName)}
              style={{
                animationDelay: `${(delay + i * stagger).toFixed(3)}s`,
                animationDuration: `${duration}s`,
                ["--word-rise" as string]: `${distance}px`,
                ["--word-blur" as string]: `${blur}px`,
              }}
            >
              {word}
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </Tag>
    );
  }

  if (scrubbed && progress) {
    return (
      <Tag ref={ref} id={id} className={className}>
        <ScrubbedLine
          words={words}
          progress={progress}
          rangeFrom={scrubRange[0]}
          rangeTo={scrubRange[1]}
          overlap={scrubOverlap}
          distance={distance}
          blur={blur}
          wordClassName={wordClassName}
        />
      </Tag>
    );
  }

  const children = words.map((word, i) => (
    <motion.span
      key={`${word}-${i}`}
      className={cn("inline-block", wordClassName)}
      // Reduced motion: mount already-delivered and never transition.
      initial={reduced ? false : resting}
      animate={shown ? delivered : resting}
      transition={
        reduced
          ? { duration: 0 }
          : { duration, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }
      }
      style={{
        willChange: reduced || settled ? "auto" : "transform, opacity, filter",
      }}
      onAnimationComplete={
        i === words.length - 1 ? () => setSettled(true) : undefined
      }
    >
      {word}
    </motion.span>
  ));

  // Interleave real space nodes so wrapping, selection and copy/paste behave.
  const spaced = children.flatMap((child, i) =>
    i < children.length - 1 ? [child, " "] : [child],
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {spaced}
    </Tag>
  );
}
