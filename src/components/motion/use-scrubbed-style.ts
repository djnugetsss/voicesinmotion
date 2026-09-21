"use client";

import type { MotionValue } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Binds an element's styles to a scroll progress value.
 *
 * Handing `useTransform` output straight to a `style` prop proved unreliable
 * here for scroll-linked values: once a derived value clamped at the end of
 * its range, the element stopped tracking it and drifted: the hero's scroll
 * cue faded correctly and then came back, and the scrubbed quote froze
 * part-delivered. Subscribing once and writing the styles ourselves is
 * predictable, and it is one subscription instead of a chain of derived
 * values per element.
 *
 * `apply` must be stable, so wrap it in `useCallback`.
 */
export function useScrubbedStyle<T extends HTMLElement>(
  progress: MotionValue<number>,
  apply: (element: T, progress: number) => void,
  enabled = true,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    const run = (value: number) => apply(element, value);
    run(progress.get());
    return progress.on("change", run);
  }, [progress, apply, enabled]);

  return ref;
}
