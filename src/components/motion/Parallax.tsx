"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./use-media-preference";

export type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /**
   * Travel rate. 0 is pinned to the page, 1 would move a full viewport
   * height across the scroll range. Negative values lead the scroll.
   */
  rate?: number;
  axis?: "y" | "x";
  /** Optional scale drift applied across the same range. */
  scaleFrom?: number;
  scaleTo?: number;
  /** Scroll range the effect is measured over. */
  offset?: [string, string];
};

/**
 * Translates its child on scroll at a configurable rate. Inert — renders a
 * plain wrapper — when reduced motion is requested.
 */
export function Parallax({
  children,
  className,
  rate = 0.15,
  axis = "y",
  scaleFrom,
  scaleTo,
  offset = ["start end", "end start"],
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as never,
  });

  // Expressed in viewport units so the effect holds at any screen size.
  const travel = rate * 100;
  const shift = useTransform(scrollYProgress, [0, 1], [`${travel}vh`, `${-travel}vh`]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [scaleFrom ?? 1, scaleTo ?? scaleFrom ?? 1],
  );

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        [axis]: shift,
        ...(scaleFrom !== undefined ? { scale } : {}),
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}
