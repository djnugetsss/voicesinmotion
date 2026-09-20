"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { lockScroll, unlockScroll, usePrefersReducedMotion } from "@/components/motion";
import { placeholderGradient } from "@/components/ui/MediaFrame";
import { PlayBadge } from "./PlayBadge";
import type { MediaItem } from "@/content";

const FOCUSABLE = 'button, [href], input, [tabindex]:not([tabindex="-1"])';

export function MediaLightbox({
  item,
  index,
  total,
  /** True while the open item is the one that was clicked — the frame morphs
   *  from that thumbnail. After arrowing away there is nothing to morph from,
   *  so it crossfades instead. */
  sharedLayout,
  seed,
  onClose,
  onPrev,
  onNext,
}: {
  item: MediaItem | null;
  index: number;
  total: number;
  sharedLayout: boolean;
  seed: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const open = item !== null;

  useEffect(() => {
    if (!open) return;
    lockScroll();
    panelRef.current?.focus({ preventScroll: true });
    return () => unlockScroll();
  }, [open]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
        return;
      }
      if (event.key !== "Tab") return;

      // Focus trap: keep Tab inside the dialog in both directions.
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose, onNext, onPrev],
  );

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {item ? (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.caption} — item ${index + 1} of ${total}`}
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className="fixed inset-0 z-[80] flex flex-col outline-none"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.28 }}
        >
          <button
            type="button"
            aria-label="Close gallery"
            onClick={onClose}
            className="absolute inset-0 -z-10 cursor-default bg-ink/85 backdrop-blur-xl"
          />

          <div className="flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-7">
            <p className="text-[0.8125rem] tracking-[0.16em] text-paper/60 uppercase">
              {index + 1} / {total}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="inline-flex size-11 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors duration-200 hover:border-paper/70 hover:bg-paper/10"
            >
              <svg
                viewBox="0 0 16 16"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
              </svg>
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center gap-3 px-3 py-5 sm:gap-5 sm:px-8">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous item"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors duration-200 hover:border-paper/70 hover:bg-paper/10"
            >
              <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 3l-5 5 5 5" />
              </svg>
            </button>

            <div className="flex min-w-0 flex-1 items-center justify-center">
              <motion.div
                key={item.id}
                layoutId={sharedLayout ? `media-${item.id}` : undefined}
                transition={{ duration: reduced ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-h-full w-full overflow-hidden rounded-[1.25rem]"
                style={{ aspectRatio: item.aspect, maxWidth: `min(100%, ${Math.round(item.aspect * 72)}vh)` }}
              >
                {item.src ? (
                  item.type === "video" ? (
                    <video
                      src={item.src}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="absolute inset-0 size-full object-cover"
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 80vw, 92vw"
                      className="object-cover"
                    />
                  )
                ) : (
                  <div
                    role="img"
                    aria-label={item.alt}
                    className="absolute inset-0"
                    style={{ backgroundImage: placeholderGradient(seed) }}
                  />
                )}

                {item.type === "video" && !item.src ? (
                  <span className="absolute inset-0 grid place-items-center">
                    <PlayBadge className="size-14" />
                  </span>
                ) : null}
              </motion.div>
            </div>

            <button
              type="button"
              onClick={onNext}
              aria-label="Next item"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors duration-200 hover:border-paper/70 hover:bg-paper/10"
            >
              <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 3l5 5-5 5" />
              </svg>
            </button>
          </div>

          <p className="px-5 pb-8 text-center text-[0.9375rem] text-paper/75 sm:px-8 sm:pb-10">
            {item.caption}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
