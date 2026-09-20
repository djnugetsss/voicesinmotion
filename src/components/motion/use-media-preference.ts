"use client";

import { useSyncExternalStore } from "react";

function subscribeTo(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

function snapshotOf(query: string) {
  return () => window.matchMedia(query).matches;
}

/**
 * SSR-safe media query hook. Returns `serverValue` during render on the
 * server and on the first client render, so hydration never mismatches.
 */
function useMediaQuery(query: string, serverValue: boolean): boolean {
  return useSyncExternalStore(
    subscribeTo(query),
    snapshotOf(query),
    () => serverValue,
  );
}

/**
 * The guard every motion primitive runs through.
 *
 * Returns `true` when the visitor has asked for reduced motion. Defaults to
 * `false` on the server so the markup matches the common case, then corrects
 * itself on the first client commit — before any animation is allowed to run.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}

/**
 * True only for precise pointers (mouse / trackpad). Cursor-driven effects —
 * <Spotlight>, the waveform bulge — are gated on this so touch devices never
 * pay for work they cannot trigger.
 */
export function usePointerFine(): boolean {
  return useMediaQuery("(pointer: fine)", false);
}

/**
 * True at or above `px`. Used to decide whether a section can afford its
 * pinned, scroll-scrubbed layout. Server-renders as `false`, so the stacked
 * layout is always the one that ships in the HTML.
 */
export function useMinWidth(px: number): boolean {
  return useMediaQuery(`(min-width: ${px}px)`, false);
}

/** Convenience: animation is allowed only when motion is not reduced. */
export function useMotionAllowed(): boolean {
  return !usePrefersReducedMotion();
}
