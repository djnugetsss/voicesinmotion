"use client";

import { motion, type MotionValue } from "motion/react";
import { useCallback } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-media-preference";
import { useScrubbedStyle } from "@/components/motion/use-scrubbed-style";

/** The small "Scroll" affordance that dissolves as the hero leaves. */
export function ScrollCue({
  label,
  progress,
}: {
  label: string;
  progress: MotionValue<number>;
}) {
  const reduced = usePrefersReducedMotion();

  const apply = useCallback((element: HTMLDivElement, p: number) => {
    const t = p < 0 ? 0 : p > 0.18 ? 1 : p / 0.18;
    element.style.opacity = (1 - t).toFixed(3);
    element.style.transform = `translate3d(0, ${(t * 14).toFixed(2)}px, 0)`;
    element.style.willChange = t >= 1 ? "auto" : "transform, opacity";
  }, []);

  const ref = useScrubbedStyle<HTMLDivElement>(progress, apply, !reduced);

  return (
    <div ref={ref} className="flex items-center gap-3" aria-hidden="true">
      <span className="text-[0.6875rem] tracking-[0.22em] text-ink/65 uppercase">
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
    </div>
  );
}
