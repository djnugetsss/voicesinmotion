"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/components/motion";

const WASH_MS = 460;
const CONTENT_MS = 340;

/**
 * Route transition: the incoming page fades and lifts while a blue wash sweeps
 * across. The whole thing is done inside half a second, and it never runs on
 * the first paint — only on client-side navigations.
 *
 * Nothing animates under `prefers-reduced-motion`; the children are returned
 * untouched, with no wrapper transform at all.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);

  // Adjusting state during render — React's sanctioned "derive from changed
  // props" pattern. It re-renders before committing, so `navigations` is
  // already correct in the same commit that mounts the new page. Deferring
  // this to an effect would let the page mount before we knew to animate it.
  const [seen, setSeen] = useState(pathname);
  const [navigations, setNavigations] = useState(0);
  const [sweeping, setSweeping] = useState(false);
  if (seen !== pathname) {
    setSeen(pathname);
    setNavigations((n) => n + 1);
    setSweeping(true);
  }

  // First load ships plain, un-transformed markup: no opacity:0 in the SSR
  // HTML, so the page is never blank if the JS does not arrive.
  const isNavigation = navigations > 0 && !reduced;

  if (reduced) return <>{children}</>;

  return (
    <>
      {isNavigation && sweeping ? (
        <motion.div
          key={navigations}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60]"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: WASH_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
          // Unmount once it is past the edge. Leaving a full-viewport fixed
          // element parked at translateX(100%) can push out the document's
          // horizontal overflow.
          onAnimationComplete={() => setSweeping(false)}
          style={{
            willChange: "transform",
            backgroundImage:
              "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--sky) 60%, transparent) 28%, color-mix(in oklab, var(--azure) 62%, transparent) 52%, color-mix(in oklab, var(--sky) 40%, transparent) 72%, transparent 100%)",
          }}
        />
      ) : null}

      <motion.div
        key={pathname}
        ref={contentRef}
        initial={isNavigation ? { opacity: 0, y: 18 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: CONTENT_MS / 1000,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.05,
        }}
        // Clear the transform once it lands. A lingering `translateY(0px)`
        // would make this a containing block for any `position: fixed`
        // descendant.
        onAnimationComplete={() => {
          if (contentRef.current) contentRef.current.style.transform = "none";
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
