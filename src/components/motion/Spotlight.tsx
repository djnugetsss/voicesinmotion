"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { usePointerFine, usePrefersReducedMotion } from "./use-media-preference";

export type SpotlightProps = {
  /** Diameter of the light in px. */
  size?: number;
  /** 0–1. How hard the light hits. */
  intensity?: number;
  /** Core colour of the light. */
  color?: string;
  /** Warm rim colour, mixed in at the edge of the core. */
  edgeColor?: string;
  /** Lower = lazier follow. */
  stiffness?: number;
  damping?: number;
  className?: string;
};

/**
 * A soft radial light that tracks the cursor across its parent section and
 * brightens whatever sits under it.
 *
 * Drop it as the first child of a `position: relative` section. It listens on
 * that parent, paints on a compositor-only layer, and renders nothing at all
 * for coarse pointers or reduced-motion visitors.
 */
export function Spotlight({
  size = 620,
  intensity = 0.55,
  color = "rgba(255, 255, 255, 0.95)",
  edgeColor = "rgba(217, 164, 65, 0.20)",
  stiffness = 120,
  damping = 26,
  className,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const opacity = useMotionValue(0);

  const sx = useSpring(x, { stiffness, damping, mass: 0.6 });
  const sy = useSpring(y, { stiffness, damping, mass: 0.6 });
  const so = useSpring(opacity, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (!enabled) return;
    const host = ref.current?.parentElement;
    if (!host) return;

    let primed = false;

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const nx = event.clientX - rect.left - size / 2;
      const ny = event.clientY - rect.top - size / 2;
      if (!primed) {
        // Jump to the cursor on first contact instead of sweeping in from 0,0.
        primed = true;
        sx.jump(nx);
        sy.jump(ny);
      }
      x.set(nx);
      y.set(ny);
      opacity.set(intensity);
    };

    const onLeave = () => {
      primed = false;
      opacity.set(0);
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, intensity, size, x, y, opacity, sx, sy]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute top-0 left-0 z-0", className)}
      style={{
        x: sx,
        y: sy,
        opacity: so,
        width: size,
        height: size,
        borderRadius: "9999px",
        mixBlendMode: "overlay",
        willChange: "transform, opacity",
        background: `radial-gradient(circle closest-side, ${color} 0%, ${edgeColor} 45%, rgba(255,255,255,0) 72%)`,
      }}
    />
  );
}
