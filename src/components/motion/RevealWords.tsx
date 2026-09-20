"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, type ElementType } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "./use-media-preference";

export type RevealWordsProps = {
  /** The line to deliver. Split on whitespace; punctuation stays with its word. */
  text: string;
  /** Element to render. One `h1` per page — pass it explicitly. */
  as?: ElementType;
  /** Forwarded to the rendered element — anchor targets, aria-labelledby. */
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
};

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
}: RevealWordsProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once, margin: "-10% 0px -15% 0px" });
  const [settled, setSettled] = useState(false);

  const words = text.split(/\s+/).filter(Boolean);
  const shown = reduced || inView;

  const resting = { opacity: 0, y: distance, filter: `blur(${blur}px)` };
  const delivered = { opacity: 1, y: 0, filter: "blur(0px)" };

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
          : {
              duration,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }
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

  const Tag = as;

  return (
    <Tag ref={ref} id={id} className={className}>
      {spaced}
    </Tag>
  );
}
