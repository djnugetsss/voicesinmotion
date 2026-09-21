"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/components/motion";
import { cn } from "@/lib/cn";
import type { TeamMember } from "@/content";

export type FounderCardProps = {
  member: TeamMember;
  /** Turns the card into a disclosure that reveals the full bio inline. */
  expandable?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
};

export function FounderCard({
  member,
  expandable = false,
  expanded = false,
  onToggle,
}: FounderCardProps) {
  const reduced = usePrefersReducedMotion();
  const bioId = `${member.slug}-bio`;
  const zoom = member.photoZoom ?? 1;

  const identity = (
    <>
      <h3 className="font-display text-[1.625rem] leading-none text-ink sm:text-[1.875rem]">
        {member.name}
      </h3>
      <p className="mt-3 text-[0.9375rem] text-azure-ink">{member.role}</p>
    </>
  );

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/10",
        "transition-[translate,border-color,box-shadow] duration-500 ease-out",
        "hover:border-azure/40 hover:shadow-[0_28px_60px_-34px_rgba(16,27,46,0.55)]",
        "motion-safe:hover:-translate-y-1.5",
        expanded && "border-azure/45",
      )}
      style={{
        backgroundImage:
          "linear-gradient(165deg, color-mix(in oklab, var(--paper) 94%, transparent) 0%, color-mix(in oklab, var(--sky) 20%, transparent) 100%)",
      }}
    >
      {/*
        4:5 portrait region. The headshot sits inside it as a circle: both
        founder photos arrived as circular crops matted on solid black, and
        clipping to the circle drops that matte cleanly instead of showing
        black wedges in the corners of the card.
      */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-6">
          <div className="relative aspect-square w-full overflow-hidden rounded-full ring-1 ring-ink/10">
            {/*
              A sized wrapper, not width on the image itself: next/image's
              `fill` owns the image's own width, so the zoom has to live on a
              box around it. Making that box wider than the circle is what
              gives object-cover a vertical overflow to work with, which is
              the only way `photoFocus` can move a face up or down here. The
              sources are square, so without it object-position would be inert.
            */}
            <div
              className="absolute inset-y-0"
              style={{
                width: `${zoom * 100}%`,
                left: `${(1 - zoom) * 50}%`,
              }}
            >
              <Image
                src={member.photo}
                alt={`${member.name}, co-founder of Voices In Motion`}
                fill
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 42vw, 76vw"
                priority
                className={cn(
                  "object-cover transition-[filter] duration-700 ease-out",
                  // Desaturation only where a pointer can undo it. Held at 55%
                  // rather than full grey so the photos still read as people.
                  "[@media(hover:hover)]:grayscale-[55%] group-hover:grayscale-0",
                )}
                style={{ objectPosition: member.photoFocus }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7 pt-0 sm:p-8 sm:pt-0">
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
                transition={{ duration: reduced ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-4 pt-5">
                  {member.bio.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-[0.9375rem] leading-[1.65] text-ink/70"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        ) : null}

        {member.highlights && member.highlights.length > 0 ? (
          <ul
            className={cn(
              "mt-6 flex flex-col gap-2 border-t border-ink/8 pt-6",
              expandable && "mt-auto",
            )}
          >
            {member.highlights.map((highlight, i) => (
              <li
                key={highlight}
                style={{ transitionDelay: `${80 + i * 70}ms` }}
                className={cn(
                  "flex gap-2.5 text-[0.875rem] text-ink/70",
                  "transition-[opacity,translate] duration-500 ease-out",
                  // Hidden only when motion is welcome and there is a pointer
                  // to reveal them. Always visible on mobile.
                  !expandable &&
                    "motion-safe:lg:translate-y-2 motion-safe:lg:opacity-0",
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
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
