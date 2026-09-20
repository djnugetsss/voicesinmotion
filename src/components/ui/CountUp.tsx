"use client";

import { animate, useInView } from "motion/react";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-media-preference";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";

export type CountUpProps = {
  value: number;
  duration?: number;
  decimals?: number;
  className?: string;
};

/**
 * Counts from zero to `value` the first time it scrolls into view.
 *
 * The final value is what renders on the server, so the real number is in the
 * HTML for crawlers and for anyone without JS. The reset to zero happens in a
 * layout effect — before paint — so there is no flash of the end state. Under
 * reduced motion nothing animates at all and the number is simply there.
 */
export function CountUp({
  value,
  duration = 1.7,
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-15% 0px -10% 0px" });

  const format = (v: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(v);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      el.textContent = format(value);
      return;
    }

    if (!inView) {
      el.textContent = format(0);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });

    return () => controls.stop();
  }, [inView, reduced, value, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
