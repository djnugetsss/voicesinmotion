"use client";

import Lenis from "lenis";
import { frame, cancelFrame } from "motion/react";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "./use-media-preference";

let instance: Lenis | null = null;

/** Pause smooth scrolling and lock the page (used by the mobile menu). */
export function lockScroll() {
  instance?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  document.documentElement.style.overflow = "";
  instance?.start();
}

/** Scroll to a selector or offset, falling back to native behaviour. */
export function scrollToTarget(target: string | number, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { offset });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target + offset });
    return;
  }
  document.querySelector(target)?.scrollIntoView();
}

/**
 * Lenis smooth scroll, driven off Motion's frame loop so scroll-linked
 * animations resolve in the same tick as the scroll itself. Disabled outright
 * under `prefers-reduced-motion`: native scrolling is the reduced state.
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      lerp: 0.1,
      smoothWheel: true,
      // Native momentum on touch beats an emulated one.
      syncTouch: false,
      anchors: { offset: 0 },
      autoRaf: false,
    });
    instance = lenis;

    const update = (data: { timestamp: number }) => lenis.raf(data.timestamp);
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
      instance = null;
    };
  }, [reduced]);

  return null;
}
