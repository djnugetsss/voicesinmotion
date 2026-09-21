"use client";

import { type MotionValue } from "motion/react";
import type { RefObject } from "react";
import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/cn";
import {
  usePointerFine,
  usePrefersReducedMotion,
} from "@/components/motion/use-media-preference";

const VIEW_W = 1000;
const VIEW_H = 400;
const MID = VIEW_H / 2;
/* 140 samples across a 1000-unit viewBox is ~7 units per segment, below the
   threshold where faceting is visible on a sine, and ~25% less string building
   per frame than 180. */
const SAMPLES = 140;

export type WaveformProps = {
  /** Resting amplitude as a fraction of half the band height (0–1). */
  amplitude?: number;
  /** Oscillation speed in cycles per second. */
  speed?: number;
  /** Number of stacked strands. */
  lineCount?: number;
  /** Wave cycles across the full width. */
  frequency?: number;
  /**
   * Optional 0–1 scroll progress. Amplitude grows with it, so the voice gets
   * louder as the visitor moves down the section.
   */
  progress?: MotionValue<number>;
  /** How much `progress` multiplies amplitude at 1. */
  amplitudeGain?: number;
  /** Bulge the wave toward the cursor. Desktop pointers only. */
  interactive?: boolean;
  /**
   * Element the cursor is tracked across. Defaults to the SVG's parent. Pass
   * the whole section when the wave is only a band inside it, so the bulge
   * does not drop out as the pointer crosses content layered above.
   */
  pointerHost?: RefObject<HTMLElement | null>;
  /** Peak local amplitude multiplier under the cursor. */
  bulgeStrength?: number;
  /** Width of the cursor bulge, as a fraction of total width. */
  bulgeWidth?: number;
  /**
   * Shape of the amplitude envelope across the width.
   * `arc` swells at the centre and tapers to nothing at both edges, the
   * neutral choice for a divider. `rise` stays quiet on the left and opens up
   * toward the right, which keeps the wave off left-aligned type.
   */
  envelope?: "arc" | "rise";
  strokeWidth?: number;
  /** Stroke for the ordinary strands. Any CSS colour. */
  stroke?: string;
  /** Stroke for the accent strand. */
  accentStroke?: string;
  /** Opacity of the first strand; later strands step down from here. */
  baseOpacity?: number;
  /** Which strand gets the accent treatment. `-1` for none. */
  accentIndex?: number;
  className?: string;
};

type Strand = {
  ampScale: number;
  freqScale: number;
  speedScale: number;
  phase: number;
};

/**
 * The signature element: an animated voice waveform.
 *
 * Idles on a gentle sine, swells with scroll progress, and bulges locally
 * toward the cursor. The whole thing is one rAF loop writing `d` on a handful
 * of paths: no React state per frame, no layout properties touched. It pauses
 * itself when scrolled out of view, and renders a single still frame under
 * `prefers-reduced-motion`.
 *
 * Reused later as a section divider: drop the amplitude, drop the line count.
 */
export function Waveform({
  amplitude = 0.42,
  speed = 0.09,
  lineCount = 4,
  frequency = 1.6,
  progress,
  amplitudeGain = 1.5,
  interactive = true,
  pointerHost,
  bulgeStrength = 1.25,
  bulgeWidth = 0.1,
  envelope = "arc",
  strokeWidth = 1.5,
  stroke = "var(--azure)",
  accentStroke = "var(--gold)",
  baseOpacity = 0.4,
  accentIndex = 1,
  className,
}: WaveformProps) {
  const hostRef = useRef<SVGSVGElement>(null);
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();
  const fine = usePointerFine();
  const cursorEnabled = interactive && fine && !reduced;

  // Mutable animation inputs: read inside rAF, never through React state.
  const cursor = useRef({ x: 0.5, target: 0.5, strength: 0, targetStrength: 0 });

  const strands: Strand[] = useMemo(
    () =>
      Array.from({ length: lineCount }, (_, i) => ({
        ampScale: 1 - i * (0.62 / Math.max(lineCount, 1)),
        freqScale: 1 + i * 0.14,
        speedScale: 1 + i * 0.09,
        phase: i * 0.85,
      })),
    [lineCount],
  );

  useEffect(() => {
    const svg = hostRef.current;
    if (!svg) return;

    const build = (elapsed: number, boost: number) => {
      const c = cursor.current;
      const bulgeVar = 2 * bulgeWidth * bulgeWidth;

      for (let i = 0; i < strands.length; i++) {
        const strand = strands[i];
        const el = pathsRef.current[i];
        if (!el) continue;
        const amp =
          amplitude * MID * strand.ampScale * (1 + boost * amplitudeGain);
        const w = frequency * strand.freqScale * Math.PI * 2;
        const t0 = elapsed * speed * strand.speedScale * Math.PI * 2 + strand.phase;

        let d = "";
        for (let s = 0; s <= SAMPLES; s++) {
          const t = s / SAMPLES;
          // Taper to nothing at both edges so the wave sits inside the band.
          const arc = Math.pow(Math.sin(Math.PI * t), 0.85);
          const shape = envelope === "rise" ? arc * Math.pow(t, 1.15) * 1.55 : arc;
          const dx = t - c.x;
          const bulge =
            c.strength > 0.001
              ? 1 + c.strength * bulgeStrength * Math.exp(-(dx * dx) / bulgeVar)
              : 1;
          const y = MID + Math.sin(t * w - t0) * amp * shape * bulge;
          d += `${s === 0 ? "M" : "L"}${Math.round(t * VIEW_W * 10) / 10} ${
            Math.round(y * 10) / 10
          }`;
        }
        el.setAttribute("d", d);
      }
    };

    // Reduced motion: one still frame, nothing scheduled, nothing listening.
    if (reduced) {
      build(0, 0);
      return;
    }

    let raf = 0;
    let start = 0;
    let visible = true;

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = (now - start) / 1000;

      const c = cursor.current;
      c.x += (c.target - c.x) * 0.09;
      c.strength += (c.targetStrength - c.strength) * 0.07;

      build(elapsed, progress ? progress.get() : 0);
      raf = requestAnimationFrame(tick);
    };

    const play = () => {
      if (raf) return;
      start = 0;
      raf = requestAnimationFrame(tick);
    };
    const pause = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) play();
        else pause();
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(svg);

    const onVisibility = () => {
      if (document.hidden) pause();
      else if (visible) play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let onMove: ((e: PointerEvent) => void) | undefined;
    let onLeave: (() => void) | undefined;
    const host = cursorEnabled
      ? (pointerHost?.current ?? svg.parentElement)
      : null;

    if (host) {
      onMove = (event: PointerEvent) => {
        const rect = host.getBoundingClientRect();
        cursor.current.target = (event.clientX - rect.left) / rect.width;
        cursor.current.targetStrength = 1;
      };
      onLeave = () => {
        cursor.current.targetStrength = 0;
      };
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave, { passive: true });
    }

    play();

    return () => {
      pause();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (host && onMove && onLeave) {
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
      }
    };
  }, [
    amplitude,
    amplitudeGain,
    bulgeStrength,
    bulgeWidth,
    cursorEnabled,
    envelope,
    frequency,
    pointerHost,
    progress,
    reduced,
    speed,
    strands,
  ]);

  return (
    <svg
      ref={hostRef}
      aria-hidden="true"
      focusable="false"
      className={cn("block h-full w-full", className)}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
    >
      {strands.map((strand, i) => {
        const isAccent = i === accentIndex;
        return (
          <path
            key={i}
            ref={(el) => {
              pathsRef.current[i] = el;
            }}
            fill="none"
            stroke={isAccent ? accentStroke : stroke}
            strokeWidth={strokeWidth * (isAccent ? 1.1 : 1 - i * 0.12)}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity={Math.max(
              0.06,
              isAccent ? baseOpacity + 0.15 : baseOpacity - i * 0.07,
            )}
          />
        );
      })}
    </svg>
  );
}
