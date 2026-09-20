"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useCallback, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { usePointerFine, usePrefersReducedMotion } from "./use-media-preference";

export type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation on either axis, in degrees. Keep it subtle. */
  max?: number;
  /** Perspective depth in px. Larger is flatter. */
  perspective?: number;
  stiffness?: number;
  damping?: number;
};

/**
 * Shared 3D tilt. Rotates its child toward the cursor on pointer move and
 * springs back on leave.
 *
 * Completely inert — a plain wrapper, no listeners, no motion values applied —
 * for coarse pointers and reduced-motion visitors.
 */
export function Tilt({
  children,
  className,
  max = 6,
  perspective = 1100,
  stiffness = 150,
  damping = 18,
}: TiltProps) {
  const fine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness, damping, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness, damping, mass: 0.5 });

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      // -0.5 … 0.5 from the centre of the card.
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(nx * 2 * max);
      rotateX.set(-ny * 2 * max);
    },
    [max, rotateX, rotateY],
  );

  const onPointerLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={className}
      style={{ perspective }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div
        className={cn("h-full")}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
