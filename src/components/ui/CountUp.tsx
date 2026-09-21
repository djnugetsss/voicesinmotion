"use client";

import { animate, useInView } from "motion/react";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-media-preference";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import { cn } from "@/lib/cn";

export type CountUpProps = {
  value: number;
  /** Rendered after the number, e.g. "+". Held back until the count lands. */
  suffix?: string;
  suffixClassName?: string;
  duration?: number;
  decimals?: number;
  className?: string;
};

/**
 * Counts from zero to `value` the first time it scrolls into view.
 *
 * The final value is what renders on the server, so the real number is in the
 * HTML for crawlers and for anyone without JS. The reset to zero happens in a
 * layout effect (before paint), so there is no flash of the end state.
 *
 * A `suffix` stays hidden while the number is still climbing and fades in once
 * it settles, so the figure never reads as "47+" on its way to 300. Under
 * reduced motion nothing animates and the whole thing, suffix included, is
 * simply there.
 */
export function CountUp({
  value,
  suffix,
  suffixClassName,
  duration = 1.7,
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const suffixRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-15% 0px -10% 0px" });

  const format = (v: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(v);

  useIsomorphicLayoutEffect(() => {
    const el = numberRef.current;
    if (!el) return;
    const tail = suffixRef.current;

    const showSuffix = (shown: boolean) => {
      if (tail) tail.style.opacity = shown ? "1" : "0";
    };

    if (reduced) {
      el.textContent = format(value);
      showSuffix(true);
      return;
    }

    if (!inView) {
      el.textContent = format(0);
      showSuffix(false);
      return;
    }

    showSuffix(false);
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = format(v);
      },
      onComplete: () => showSuffix(true),
    });

    return () => controls.stop();
  }, [inView, reduced, value, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      <span ref={numberRef}>{format(value)}</span>
      {suffix ? (
        <span
          ref={suffixRef}
          // Visible by default so it is present without JS; the effect hides
          // it before paint when an animation is about to run.
          className={cn("transition-opacity duration-300 ease-out", suffixClassName)}
        >
          {suffix}
        </span>
      ) : null}
    </span>
  );
}
