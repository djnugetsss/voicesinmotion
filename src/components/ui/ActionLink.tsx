import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ActionVariant =
  | "primary"
  | "secondary"
  | "gold"
  /** Filled gold — the one loud button, for the closing band. */
  | "gold-solid"
  /** Outlined light, for use on the deep band. */
  | "outline-light";
export type ActionSize = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full " +
  "font-medium tracking-[-0.01em] whitespace-nowrap " +
  "transition-[translate,box-shadow,background-color,border-color,color] duration-300 ease-out " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-azure " +
  "motion-safe:hover:-translate-y-0.5 active:translate-y-0";

const variants: Record<ActionVariant, string> = {
  primary:
    "bg-azure text-paper shadow-[0_10px_30px_-12px_rgba(16,27,46,0.55)] " +
    "hover:bg-ink hover:shadow-[0_18px_40px_-14px_rgba(16,27,46,0.6)]",
  secondary:
    "border border-ink/12 bg-paper/70 text-ink backdrop-blur-sm " +
    "hover:border-azure/45 hover:bg-paper",
  gold:
    "border border-gold/60 text-ink/90 " +
    "hover:border-gold hover:bg-gold/10 hover:text-ink",
  "gold-solid":
    "bg-gold text-ink shadow-[0_14px_36px_-14px_rgba(217,164,65,0.75)] " +
    "hover:bg-[color-mix(in_oklab,var(--gold)_86%,white)] " +
    "hover:shadow-[0_22px_46px_-16px_rgba(217,164,65,0.85)] " +
    "focus-visible:outline-gold",
  "outline-light":
    "border border-paper/35 text-paper " +
    "hover:border-paper/70 hover:bg-paper/10 " +
    "focus-visible:outline-paper",
};

const sizes: Record<ActionSize, string> = {
  sm: "px-4 py-2 text-[0.8125rem]",
  md: "px-5 py-2.5 text-[0.875rem]",
  lg: "px-6 py-3.5 text-[0.9375rem] sm:px-7 sm:py-4 sm:text-base",
};

export type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ActionVariant;
  size?: ActionSize;
  external?: boolean;
  className?: string;
  onClick?: () => void;
};

export function ActionLink({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  className,
  onClick,
}: ActionLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isExternal = external ?? /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}
