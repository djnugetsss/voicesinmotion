"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/cn";
import type { PriceBadge, Session } from "@/content";

export function PriceTag({ price }: { price: PriceBadge }) {
  return (
    <span
      data-placeholder={price.placeholder || undefined}
      className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-3.5 py-1.5 text-[0.6875rem] font-medium tracking-[0.16em] text-ink/80 uppercase"
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
      {price.label}: {price.value}
    </span>
  );
}

export function SessionCard({
  session,
  price,
  progress,
  range,
  scrubbed,
}: {
  session: Session;
  price: PriceBadge;
  progress: MotionValue<number>;
  /** Progress window over which this card slides in and locks. */
  range: [number, number];
  scrubbed: boolean;
}) {
  const t = useTransform(progress, range, [0, 1]);
  const opacity = useTransform(t, [0, 1], [0.2, 1]);
  const y = useTransform(t, [0, 1], [40, 0]);
  const scale = useTransform(t, [0, 1], [0.95, 1]);

  const isPaid = session.kind === "paid";

  return (
    <motion.article
      aria-labelledby={`${session.id}-name`}
      style={
        scrubbed
          ? { opacity, y, scale, willChange: "transform, opacity" }
          : undefined
      }
      className={cn(
        "relative flex shrink-0 flex-col overflow-hidden rounded-[1.5rem] border p-7 sm:rounded-[1.75rem] sm:p-8",
        "w-full motion-safe:lg:w-[28rem]",
        isPaid ? "border-gold/35" : "border-ink/10",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: isPaid
            ? "linear-gradient(158deg, color-mix(in oklab, var(--paper) 94%, transparent) 0%, color-mix(in oklab, var(--gold) 14%, transparent) 100%)"
            : "linear-gradient(158deg, color-mix(in oklab, var(--paper) 92%, transparent) 0%, color-mix(in oklab, var(--sky) 26%, transparent) 100%)",
        }}
      />

      <div className="flex items-center justify-between gap-4">
        <span className="font-display text-[1.75rem] leading-none text-azure-ink">
          {session.marker}
        </span>
        <span
          className={cn(
            "rounded-full border px-3 py-1 text-[0.6875rem] font-medium tracking-[0.14em] uppercase",
            isPaid
              ? "border-gold/50 text-ink/70"
              : "border-azure/40 text-azure-ink",
          )}
        >
          {isPaid ? "Paid" : "Free"}
        </span>
      </div>

      <h3
        id={`${session.id}-name`}
        className="font-display mt-7 text-[clamp(1.625rem,1.3rem+1.1vw,2.125rem)] leading-[1.05] text-ink"
      >
        {session.name}
      </h3>

      <p className="mt-3 text-[length:var(--text-lead)] text-ink/70">
        {session.dates}
      </p>

      {session.description ? (
        <p className="mt-5 max-w-[34ch] text-[0.9375rem] leading-[1.55] text-ink/65">
          {session.description}
        </p>
      ) : null}

      {isPaid ? (
        <div className="mt-auto pt-8">
          <PriceTag price={price} />
        </div>
      ) : null}
    </motion.article>
  );
}
