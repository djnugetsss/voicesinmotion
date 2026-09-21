import type { ElementType, Ref, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The background character of a section. Every wash except `deep` starts and
 * ends at paper, so neighbouring sections always meet on the same colour and
 * no seam shows wherever they land. `deep` is the one deliberate hard band.
 */
export type SectionTone = "hero" | "paper" | "mist" | "sky" | "deep" | "none";

/** Vertical rhythm. `flush` is for sections that own their own spacing. */
export type SectionSize = "flush" | "sm" | "md" | "lg";

const rhythm: Record<SectionSize, string> = {
  flush: "",
  sm: "py-16 sm:py-20 lg:py-24",
  md: "py-24 sm:py-28 lg:py-36",
  lg: "py-28 sm:py-36 lg:py-44",
};

const washes: Record<Exclude<SectionTone, "none" | "hero">, string> = {
  paper:
    "linear-gradient(180deg, var(--paper) 0%, color-mix(in oklab, var(--sky) 12%, var(--paper)) 50%, var(--paper) 100%)",
  mist:
    "linear-gradient(180deg, var(--paper) 0%, var(--mist) 45%, var(--mist) 62%, var(--paper) 100%)",
  sky:
    "linear-gradient(180deg, var(--paper) 0%, var(--mist) 32%, color-mix(in oklab, var(--sky) 34%, var(--mist)) 60%, var(--paper) 100%)",
  deep:
    "linear-gradient(165deg, var(--azure) 0%, color-mix(in oklab, var(--azure) 55%, var(--ink)) 45%, var(--ink) 100%)",
};

function SectionWash({ tone }: { tone: Exclude<SectionTone, "none"> }) {
  if (tone === "hero") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(175deg, var(--paper) 0%, var(--mist) 46%, color-mix(in oklab, var(--sky) 34%, var(--paper)) 100%)",
          }}
        />
        <div
          className="drift-a absolute -top-[28%] left-[-15%] h-[85vh] w-[85vw] rounded-full blur-[48px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--sky) 62%, transparent) 0%, transparent 68%)",
          }}
        />
        <div
          className="drift-b absolute -right-[20%] bottom-[-25%] h-[80vh] w-[80vw] rounded-full blur-[52px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--azure) 30%, transparent) 0%, transparent 66%)",
          }}
        />
        {/* Stage floor: a soft lift of light along the bottom edge. */}
        <div
          className="absolute inset-x-0 bottom-0 h-[42vh]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--paper) 78%, transparent) 70%, var(--paper) 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0" style={{ backgroundImage: washes[tone] }} />
      {tone === "mist" ? (
        <div
          className="drift-b absolute top-[10%] -left-[18%] h-[70vh] w-[70vw] rounded-full blur-[56px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--sky) 38%, transparent) 0%, transparent 70%)",
          }}
        />
      ) : null}
      {tone === "sky" ? (
        <div
          className="drift-a absolute -top-[12%] right-[-15%] h-[65vh] w-[65vw] rounded-full blur-[56px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--azure) 26%, transparent) 0%, transparent 70%)",
          }}
        />
      ) : null}
    </div>
  );
}

export type SectionProps = {
  children: ReactNode;
  id?: string;
  tone?: SectionTone;
  size?: SectionSize;
  /** Wrap children in the page shell. Pass `false` for full-bleed content. */
  contained?: boolean;
  as?: ElementType;
  className?: string;
  innerClassName?: string;
  labelledBy?: string;
  label?: string;
  /** Forwarded to the section element: `useScroll` targets need it. */
  ref?: Ref<HTMLElement>;
};

/**
 * Page section: one wash, one rhythm, one shell.
 *
 * Deliberately never sets `overflow-hidden` on the section element, which
 * would make it the scroll container for any `position: sticky` descendant
 * and quietly break the pinned sections. The wash layer clips itself instead.
 */
export function Section({
  children,
  id,
  tone = "paper",
  size = "md",
  contained = true,
  as: Tag = "section",
  className,
  innerClassName,
  labelledBy,
  label,
  ref,
}: SectionProps) {
  return (
    <Tag
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cn("relative isolate", rhythm[size], className)}
    >
      {tone === "none" ? null : <SectionWash tone={tone} />}
      {contained ? (
        <div className={cn("shell", innerClassName)}>{children}</div>
      ) : (
        children
      )}
    </Tag>
  );
}

/** Shared eyebrow: a hairline rule plus a small caps label. */
export function SectionEyebrow({
  children,
  as: Tag = "p",
  id,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  id?: string;
  className?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "flex items-center gap-2.5 text-[length:var(--text-eyebrow)] font-medium tracking-[0.2em] uppercase",
        className ?? "text-ink/65",
      )}
    >
      <span
        aria-hidden="true"
        className="inline-block h-px w-6 shrink-0 bg-current opacity-40"
      />
      {children}
    </Tag>
  );
}
