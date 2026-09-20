"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./use-media-preference";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

export type RevealBlockProps = {
  children: ReactNode;
  className?: string;
  /** Which way the block travels in from. */
  direction?: RevealDirection;
  /** Travel distance in px. */
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  /** Viewport margin for the trigger, e.g. "-20% 0px". */
  margin?: string;
  as?: "div" | "section" | "li" | "p" | "figure" | "article";
};

const offsets: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

/** Generic fade + rise for paragraphs, cards and images. */
export function RevealBlock({
  children,
  className,
  direction = "up",
  distance = 26,
  delay = 0,
  duration = 0.75,
  once = true,
  margin = "-12% 0px -12% 0px",
  as = "div",
}: RevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, {
    once,
    margin: margin as `${number}% ${number}px ${number}% ${number}px`,
  });
  const [settled, setSettled] = useState(false);

  // All of the allowed tags share the same motion props surface; narrowing to
  // one keeps the ref type from collapsing into an unusable intersection.
  const Tag = motion[as] as typeof motion.div;
  const dir = offsets[direction];

  return (
    <Tag
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, x: dir.x * distance, y: dir.y * distance }}
      animate={
        reduced || inView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: dir.x * distance, y: dir.y * distance }
      }
      transition={
        reduced
          ? { duration: 0 }
          : { duration, delay, ease: [0.22, 1, 0.36, 1] }
      }
      style={{ willChange: reduced || settled ? "auto" : "transform, opacity" }}
      onAnimationComplete={() => setSettled(true)}
    >
      {children}
    </Tag>
  );
}
