"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/use-media-preference";

/** The small "Scroll" affordance that dissolves as the hero leaves. */
export function ScrollCue({
  label,
  progress,
}: {
  label: string;
  progress: MotionValue<number>;
}) {
  const reduced = usePrefersReducedMotion();
  const opacity = useTransform(progress, [0, 0.18], [1, 0]);
  const y = useTransform(progress, [0, 0.18], [0, 14]);

  return (
    <motion.div
      className="flex items-center gap-3"
      style={reduced ? undefined : { opacity, y, willChange: "transform, opacity" }}
      aria-hidden="true"
    >
      <span className="text-[0.6875rem] tracking-[0.22em] text-ink/45 uppercase">
        {label}
      </span>
      <span className="relative block h-px w-12 overflow-hidden bg-ink/12">
        {!reduced && (
          <motion.span
            className="absolute inset-y-0 left-0 block w-1/3 bg-azure"
            animate={{ x: ["-120%", "320%"] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
              repeatDelay: 0.3,
            }}
            style={{ willChange: "transform" }}
          />
        )}
      </span>
    </motion.div>
  );
}
