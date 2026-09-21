"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { ActionLink } from "@/components/ui/ActionLink";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { usePrefersReducedMotion } from "@/components/motion/use-media-preference";
import { bookingCta, navLinks, siteMeta, socialLinks } from "@/content";

export function SiteHeader() {
  const { scrollY } = useScroll();
  const reduced = usePrefersReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [threshold, setThreshold] = useState(600);

  // The header changes state once the hero — one full viewport — is behind us.
  useEffect(() => {
    const measure = () => setThreshold(window.innerHeight * 0.82);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > threshold);
  });

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed top-3 left-3 z-[70] rounded-full bg-ink px-4 py-2 text-sm text-paper"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        {/* Frosted plate fades in on opacity alone. */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 border-b border-ink/8 bg-paper/72 backdrop-blur-xl backdrop-saturate-150"
          initial={false}
          animate={{ opacity: scrolled && !menuOpen ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "opacity" }}
        />

        <div className="relative mx-auto flex h-[var(--header-h)] max-w-[88rem] items-center justify-between gap-6 px-5 sm:px-7 lg:px-10">
          <Link
            href="/"
            className="font-display shrink-0 text-[1.375rem] leading-none tracking-[-0.02em] text-ink sm:text-[1.5rem]"
          >
            {siteMeta.name}
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative inline-block py-1 text-[0.875rem] text-ink/70 transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-azure transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex size-9 items-center justify-center rounded-full text-ink/65 transition-colors duration-200 hover:text-azure-ink"
              >
                <InstagramIcon className="size-[1.1rem]" />
              </a>
            ))}

            {/* Wrapped rather than given `hidden sm:inline-flex`: the button's
                own `inline-flex` is a display utility of equal specificity. */}
            <span className="hidden sm:block">
              <ActionLink
                href={bookingCta.href}
                external={bookingCta.external}
                variant="gold"
                size="sm"
              >
                {bookingCta.label}
              </ActionLink>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative z-50 inline-flex size-10 items-center justify-center rounded-full text-ink lg:hidden"
            >
              <span className="relative block h-[0.7rem] w-5">
                <motion.span
                  className="absolute inset-x-0 top-0 block h-px bg-current"
                  animate={
                    menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="absolute inset-x-0 bottom-0 block h-px bg-current"
                  animate={
                    menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
