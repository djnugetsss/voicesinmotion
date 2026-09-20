import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Coach } from "@/content";

export function CoachCard({ coach }: { coach: Coach }) {
  return (
    <article
      data-placeholder={coach.placeholder || undefined}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ink/10",
        "transition-[translate,border-color,box-shadow] duration-500 ease-out",
        "hover:border-azure/40 hover:shadow-[0_28px_60px_-34px_rgba(16,27,46,0.55)]",
        "motion-safe:hover:-translate-y-1.5",
      )}
      style={{
        backgroundImage:
          "linear-gradient(165deg, color-mix(in oklab, var(--paper) 94%, transparent) 0%, color-mix(in oklab, var(--sky) 18%, transparent) 100%)",
      }}
    >
      {/* 4:5 portrait box. Grayscale at rest, full colour on hover. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {coach.photo ? (
          <Image
            src={coach.photo.src}
            alt={coach.photo.alt}
            fill
            sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
            className={cn(
              "object-cover transition-[filter,scale] duration-700 ease-out",
              // Desaturate only where there is a pointer that can undo it —
              // on touch, the photo is simply in colour.
              "[@media(hover:hover)]:grayscale group-hover:grayscale-0",
              "motion-safe:group-hover:scale-[1.03]",
            )}
          />
        ) : (
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 transition-[filter] duration-700 ease-out",
              "[@media(hover:hover)]:grayscale group-hover:grayscale-0",
            )}
            style={{
              backgroundImage:
                "linear-gradient(150deg, color-mix(in oklab, var(--sky) 45%, var(--paper)) 0%, color-mix(in oklab, var(--azure) 38%, var(--mist)) 58%, color-mix(in oklab, var(--sky) 80%, var(--mist)) 100%)",
            }}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[1.5rem] leading-none text-ink">
          {coach.name}
        </h3>
        <p className="mt-2.5 text-[0.875rem] text-azure">{coach.role}</p>
        <p className="mt-1 text-[0.875rem] text-ink/55">{coach.events}</p>

        {/*
          Always in the layout so nothing reflows and screen readers always
          reach it. Hidden only visually, and only from `lg` up, where there
          is room for the reveal to read as intentional.
        */}
        <ul className="mt-5 flex flex-col gap-2 border-t border-ink/8 pt-5">
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
                "motion-safe:lg:translate-y-2 motion-safe:lg:opacity-0",
                "lg:group-hover:translate-y-0 lg:group-hover:opacity-100",
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
