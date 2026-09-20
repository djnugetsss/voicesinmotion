"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ActionLink } from "@/components/ui/ActionLink";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { lockScroll, unlockScroll } from "@/components/motion/SmoothScroll";
import { usePrefersReducedMotion } from "@/components/motion/use-media-preference";
import { bookingCta, navLinks, socialLinks, siteMeta } from "@/content";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    lockScroll();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    // Park focus on the panel itself, not the first link: Tab still starts
    // inside the menu, but nobody gets a focus ring they did not ask for.
    panelRef.current?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
    };
  }, [open, onClose]);

  const duration = reduced ? 0 : 0.5;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${siteMeta.name} menu`}
          tabIndex={-1}
          className="fixed inset-0 z-40 outline-none lg:hidden"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "opacity" }}
        >
          {/* Layered wash, not a flat fill. Opaque: at full-screen display
              sizes even a few percent of show-through reads as a smudge, and
              going opaque lets us drop a backdrop-filter on mobile. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(110% 60% at 50% 0%, color-mix(in oklab, var(--sky) 48%, transparent) 0%, transparent 62%), linear-gradient(180deg, var(--paper) 0%, var(--mist) 100%)",
            }}
          />

          <nav
            aria-label="Mobile"
            className="relative flex h-full flex-col justify-between px-6 pt-[calc(var(--header-h)+2rem)] pb-10"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 10, transition: { duration: reduced ? 0 : 0.2 } }}
                  transition={{
                    duration,
                    delay: reduced ? 0 : 0.08 + i * 0.055,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="font-display block border-b border-ink/8 py-4 text-[2rem] leading-none text-ink transition-colors duration-200 hover:text-azure"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="flex flex-col gap-5"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration,
                delay: reduced ? 0 : 0.08 + navLinks.length * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ActionLink
                href={bookingCta.href}
                external={bookingCta.external}
                variant="gold"
                size="lg"
                onClick={onClose}
                className="w-full"
              >
                {bookingCta.label}
              </ActionLink>

              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-ink/12 text-ink/70 transition-colors duration-200 hover:border-azure/45 hover:text-azure"
                  >
                    <InstagramIcon className="size-[1.15rem]" />
                  </a>
                ))}
              </div>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
