import { cn } from "@/lib/cn";
import type { Review } from "@/content";

export function ReviewCard({
  review,
  className,
}: {
  review: Review;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ink/10 p-7 sm:rounded-[1.75rem] sm:p-8",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(158deg, color-mix(in oklab, var(--paper) 94%, transparent) 0%, color-mix(in oklab, var(--sky) 22%, transparent) 100%)",
      }}
    >
      {/*
        Oversized opening mark, behind the quote. Kept at z-0 rather than a
        negative z-index — the card paints its own gradient background, and
        anything behind that is invisible.
      */}
      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute -top-6 left-3 z-0 text-[13rem] leading-none text-sky/45 select-none"
      >
        &ldquo;
      </span>

      <blockquote className="relative z-10 text-[1.0625rem] leading-[1.6] text-ink/80 sm:text-[1.125rem]">
        {review.quote}
      </blockquote>

      <figcaption className="relative z-10 mt-auto flex flex-col gap-1 pt-8">
        <span className="font-display text-[1.25rem] leading-none text-ink">
          {review.name}
        </span>
        <span className="text-[0.875rem] text-ink/65">
          {review.role} · {review.session}
        </span>
      </figcaption>
    </figure>
  );
}
