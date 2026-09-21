import { cn } from "@/lib/cn";

/** Marks a tile as a clip. Same line language as the pillar icons. */
export function PlayBadge({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-paper/60 bg-ink/25 text-paper backdrop-blur-sm",
        className,
      )}
    >
      <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true">
        <path d="M5 3.4v9.2a.6.6 0 0 0 .92.5l7.2-4.6a.6.6 0 0 0 0-1l-7.2-4.6A.6.6 0 0 0 5 3.4Z" />
      </svg>
    </span>
  );
}
