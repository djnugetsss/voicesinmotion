"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/components/motion";
import { cn } from "@/lib/cn";
import { placeholderGradient } from "@/components/ui/MediaFrame";
import type { Coach } from "@/content";

export type CoachCardProps = {
  coach: Coach;
  /** Index, used only to vary the placeholder wash. */
  seed?: number;
  /** Tighter padding and type, for the /about roster. */
  dense?: boolean;
  /** Turns the card into a disclosure that reveals the bio inline. */
  expandable?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
};

export function CoachCard({
  coach,
  seed = 0,
  dense = false,
  expandable = false,
  expanded = false,
  onToggle,
}: CoachCardProps) {
  const reduced = usePrefersReducedMotion();
  const bioId = `${coach.id}-bio`;

  const identity = (
    <>
      <h3
        className={cn(
          "font-display leading-none text-ink",
          dense ? "text-[1.3rem]" : "text-[1.5rem]",
        )}
      >
        {coach.name}
      </h3>
      <p className="mt-2.5 text-[0.875rem] text-azure-ink">{coach.role}</p>
      <p className="mt-1 text-[0.875rem] text-ink/65">{coach.events}</p>
    </>
  );

  return (
    <article
      data-placeholder={coach.placeholder || undefined}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ink/10",
        "transition-[translate,border-color,box-shadow] duration-500 ease-out",
        "hover:border-azure/40 hover:shadow-[0_28px_60px_-34px_rgba(16,27,46,0.55)]",
        "motion-safe:hover:-translate-y-1.5",
        expanded && "border-azure/45",
      )}
      style={{
        backgroundImage:
          "linear-gradient(165deg, color-mix(in oklab, var(--paper) 94%, transparent) 0%, color-mix(in oklab, var(--sky) 18%, transparent) 100%)",
      }}
    >
      {/* Reserved whether or not a file exists yet. The roster crops square
          so the grid packs tighter than the four-across home row. */}
      <div
        className={cn(
          "relative w-full overflow-hidden",
          dense ? "aspect-square" : "aspect-[4/5]",
        )}
      >
        {coach.photo ? (
          <Image
            src={coach.photo.src}
            alt={coach.photo.alt}
            fill
            sizes={
              dense
                ? "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                : "(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
            }
            className={cn(
              "object-cover transition-[filter,scale] duration-700 ease-out",
              // Desaturate only where there is a pointer that can undo it.
              // On touch, the photo is simply in colour.
              "[@media(hover:hover)]:grayscale group-hover:grayscale-0",
              "motion-safe:group-hover:scale-[1.03]",
            )}
          />
        ) : (
          <div
            role="img"
            aria-label={`Placeholder portrait of ${coach.name}`}
            className={cn(
              "absolute inset-0 transition-[filter] duration-700 ease-out",
              "[@media(hover:hover)]:grayscale group-hover:grayscale-0",
            )}
            style={{ backgroundImage: placeholderGradient(seed) }}
          />
        )}
      </div>

      <div className={cn("flex flex-1 flex-col", dense ? "p-5" : "p-6")}>
        {expandable ? (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={bioId}
            className="rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azure"
          >
            {identity}
            <span className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-azure-ink">
              {expanded ? "Close" : "Read more"}
              <motion.span
                aria-hidden="true"
                className="inline-block"
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg
                  viewBox="0 0 16 16"
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 6l5 5 5-5" />
                </svg>
              </motion.span>
            </span>
          </button>
        ) : (
          identity
        )}

        {expandable ? (
          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div
                key="bio"
                id={bioId}
                initial={reduced ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.34,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden"
              >
                <p className="pt-5 text-[0.9375rem] leading-[1.6] text-ink/70">
                  {coach.bio}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        ) : null}

        <ul
          className={cn(
            "mt-5 flex flex-col gap-2 border-t border-ink/8 pt-5",
            expandable && "mt-auto",
          )}
        >
          {coach.achievements.map((achievement, i) => (
            <li
              key={achievement}
              style={{ transitionDelay: `${80 + i * 70}ms` }}
              className={cn(
                "flex gap-2.5 text-[0.875rem] text-ink/65",
                "transition-[opacity,translate] duration-500 ease-out",
                // Hidden only when motion is welcome. Written as `motion-safe`
                // rather than hiding and then undoing it with `motion-reduce`,
                // which loses to `lg:` on equal specificity.
                !expandable && "motion-safe:lg:translate-y-2 motion-safe:lg:opacity-0",
                !expandable &&
                  "lg:group-hover:translate-y-0 lg:group-hover:opacity-100",
                !expandable &&
                  "lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100",
              )}
            >
              <span
                aria-hidden="true"
                className="mt-[0.5rem] inline-block size-1 shrink-0 rounded-full bg-gold"
              />
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
