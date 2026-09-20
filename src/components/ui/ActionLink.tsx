import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ActionVariant = "primary" | "secondary" | "gold";
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
