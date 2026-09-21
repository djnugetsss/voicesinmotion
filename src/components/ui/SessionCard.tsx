"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { ActionLink } from "@/components/ui/ActionLink";
import type { WorkshopSession } from "@/content";

/**
 * The muted state a session sits in until its form exists. Deliberately not a
 * button: there is nothing to press yet, and nothing here should read as one.
 */
function SignupPending({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 px-3.5 py-1.5 text-[0.6875rem] font-medium tracking-[0.16em] text-ink/65 uppercase">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-ink/30" />
      {label}
    </span>
  );
}

export function SessionCard({
  session,
  signupLabel,
  signupPendingLabel,
  progress,
  range,
  scrubbed,
}: {
  session: WorkshopSession;
  signupLabel: string;
  signupPendingLabel: string;
  progress: MotionValue<number>;
  /** Progress window over which this card slides in and locks. */
  range: [number, number];
  scrubbed: boolean;
}) {
  const t = useTransform(progress, range, [0, 1]);
  const opacity = useTransform(t, [0, 1], [0.2, 1]);
  const y = useTransform(t, [0, 1], [40, 0]);
  const scale = useTransform(t, [0, 1], [0.95, 1]);

  return (
    <motion.article
      aria-labelledby={`${session.id}-name`}
      style={
        scrubbed
          ? { opacity, y, scale, willChange: "transform, opacity" }
          : undefined
      }
      className="relative flex w-full shrink-0 flex-col overflow-hidden rounded-[1.5rem] border border-ink/10 p-7 motion-safe:lg:w-[28rem] sm:rounded-[1.75rem] sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(158deg, color-mix(in oklab, var(--paper) 92%, transparent) 0%, color-mix(in oklab, var(--sky) 26%, transparent) 100%)",
        }}
      />

      <span className="font-display text-[1.75rem] leading-none text-azure-ink">
        {session.marker}
      </span>

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

      {/* One field decides this: a `signupUrl` is a live button, `null` is the
          muted state above it. See the note in `content/workshops.ts`. */}
      <div className="mt-auto pt-8">
        {session.signupUrl ? (
          <ActionLink
            href={session.signupUrl}
            external
            variant="primary"
            size="md"
          >
            {signupLabel}
          </ActionLink>
        ) : (
          <SignupPending label={signupPendingLabel} />
        )}
      </div>
    </motion.article>
  );
}
