"use client";

import { Spotlight, Tilt } from "@/components/motion";
import { ActionLink } from "@/components/ui/ActionLink";
import { cn } from "@/lib/cn";
import type { Program } from "@/content";

/** Resting wash, per card. Warms toward azure on the hover layer below. */
const resting: Record<Program["tone"], string> = {
  workshops:
    "linear-gradient(155deg, color-mix(in oklab, var(--paper) 94%, transparent) 0%, color-mix(in oklab, var(--mist) 90%, transparent) 55%, color-mix(in oklab, var(--sky) 26%, transparent) 100%)",
  lessons:
    "linear-gradient(155deg, color-mix(in oklab, var(--mist) 92%, transparent) 0%, color-mix(in oklab, var(--sky) 22%, transparent) 60%, color-mix(in oklab, var(--paper) 90%, transparent) 100%)",
};

const hovered: Record<Program["tone"], string> = {
  workshops:
    "linear-gradient(155deg, color-mix(in oklab, var(--paper) 92%, transparent) 0%, color-mix(in oklab, var(--sky) 42%, transparent) 50%, color-mix(in oklab, var(--azure) 34%, transparent) 100%)",
  lessons:
    "linear-gradient(155deg, color-mix(in oklab, var(--sky) 34%, transparent) 0%, color-mix(in oklab, var(--azure) 30%, transparent) 55%, color-mix(in oklab, var(--sky) 20%, transparent) 100%)",
};

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Tilt className="h-full" max={6}>
      <article
        id={program.id}
        aria-labelledby={`${program.id}-title`}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]",
          "border border-ink/10 p-7 sm:p-9 lg:p-10",
          "transition-[translate,border-color,box-shadow] duration-500 ease-out",
          "shadow-[0_10px_40px_-28px_rgba(16,27,46,0.45)]",
          "hover:border-azure/45 hover:shadow-[0_30px_70px_-32px_rgba(16,27,46,0.5)]",
          "motion-safe:hover:-translate-y-1.5",
        )}
      >
        {/* Cursor light, clipped to the card. Renders nothing on touch. */}
        <Spotlight size={460} intensity={0.5} />

        {/* Two stacked washes; only the top one's opacity moves. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20"
          style={{ backgroundImage: resting[program.tone] }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          style={{ backgroundImage: hovered[program.tone] }}
        />

        <p className="text-[0.75rem] font-medium tracking-[0.18em] text-azure-ink uppercase">
          {program.kicker}
        </p>

        <h3
          id={`${program.id}-title`}
          className="font-display mt-5 text-[clamp(1.875rem,1.4rem+1.9vw,2.75rem)] leading-[1.02] text-ink"
        >
          {program.title}
        </h3>

        <p className="mt-3 text-[0.9375rem] text-ink/65">{program.audience}</p>

        <p className="mt-5 max-w-[44ch] text-[length:var(--text-lead)] leading-[1.6] text-ink/70">
          {program.description}
        </p>

        <ul className="mt-7 flex flex-col gap-3 border-t border-ink/8 pt-7">
          {program.points.map((point) => (
            <li key={point} className="flex gap-3 text-[0.9375rem] text-ink/65">
              <span
                aria-hidden="true"
                className="mt-[0.55rem] inline-block size-1 shrink-0 rounded-full bg-azure/70"
              />
              {point}
            </li>
          ))}
        </ul>

        {/* Pushes the actions to the bottom so both cards line up. */}
        <div className="mt-auto flex flex-col gap-3 pt-9 sm:flex-row sm:flex-wrap sm:items-center">
          {program.ctas.map((cta, i) => (
            <ActionLink
              key={cta.href}
              href={cta.href}
              external={cta.external}
              variant={i === 0 ? "primary" : "secondary"}
              size="md"
            >
              {cta.label}
            </ActionLink>
          ))}
        </div>
      </article>
    </Tilt>
  );
}
