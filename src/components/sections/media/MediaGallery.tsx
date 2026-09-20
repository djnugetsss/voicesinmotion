"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion";
import { placeholderGradient } from "@/components/ui/MediaFrame";
import { useIsomorphicLayoutEffect } from "@/lib/use-isomorphic-layout-effect";
import { MediaLightbox } from "./MediaLightbox";
import { PlayBadge } from "./PlayBadge";
import { media } from "@/content";
import type { MediaItem } from "@/content";

/** Seconds of delay added per column, so the reveal cascades sideways. */
const COLUMN_STAGGER = 0.09;

function columnsFor(width: number) {
  if (width < 560) return 1;
  if (width < 900) return 2;
  return 3;
}

export function MediaGallery() {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);
  const [filter, setFilter] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [originId, setOriginId] = useState<string | null>(null);

  // Measured in a layout effect so the correct column count is in place
  // before the browser paints — no flash of the single-column fallback.
  useIsomorphicLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const measure = () => setColumns(columnsFor(element.clientWidth));
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const visible = useMemo(
    () =>
      filter === "all"
        ? media.items
        : media.items.filter((item) => item.category === filter),
    [filter],
  );

  /** Shortest-column-first, using the reserved aspect as the height proxy. */
  const laid = useMemo(() => {
    const buckets: MediaItem[][] = Array.from({ length: columns }, () => []);
    const heights = new Array<number>(columns).fill(0);

    for (const item of visible) {
      let shortest = 0;
      for (let i = 1; i < columns; i++) {
        if (heights[i] < heights[shortest]) shortest = i;
      }
      buckets[shortest].push(item);
      heights[shortest] += 1 / item.aspect;
    }
    return buckets;
  }, [visible, columns]);

  const openIndex = visible.findIndex((item) => item.id === openId);
  const openItem = openIndex >= 0 ? visible[openIndex] : null;

  const close = useCallback(() => {
    const id = openId;
    setOpenId(null);
    setOriginId(null);
    // Hand focus back to the tile that opened it.
    if (id) {
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(`[data-tile="${id}"]`)?.focus();
      });
    }
  }, [openId]);

  // Functional update rather than reading `openIndex` from the closure, so
  // holding an arrow key steps through instead of landing on the same
  // neighbour over and over.
  const step = useCallback(
    (delta: number) => {
      setOpenId((current) => {
        if (!current || visible.length === 0) return current;
        const at = visible.findIndex((item) => item.id === current);
        if (at < 0) return current;
        return visible[(at + delta + visible.length) % visible.length].id;
      });
    },
    [visible],
  );

  return (
    <>
      {/* Filter row */}
      <div
        role="group"
        aria-label="Filter gallery"
        className="flex flex-wrap gap-2"
      >
        {media.filters.map((option) => {
          const active = filter === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setFilter(option.id)}
              aria-pressed={active}
              className="relative rounded-full px-4 py-2 text-[0.875rem] transition-colors duration-200"
            >
              {active ? (
                <motion.span
                  layoutId="media-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-ink"
                  transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
              <span className={active ? "text-paper" : "text-ink/60"}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      <LayoutGroup>
        <div ref={containerRef} className="mt-10 flex gap-4 sm:mt-12">
          {laid.map((bucket, column) => (
            <div
              key={column}
              className="flex min-w-0 flex-1 flex-col gap-4"
            >
              <AnimatePresence initial={false}>
                {bucket.map((item, i) => (
                  <motion.div
                    key={item.id}
                    // Reveal lives on the outer wrapper; the frame inside
                    // carries the layout identity for the lightbox morph.
                    initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    exit={reduced ? undefined : { opacity: 0, scale: 0.94 }}
                    viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
                    transition={{
                      duration: reduced ? 0 : 0.55,
                      // Keyed to the column, not the index, so the cascade
                      // runs across the row rather than down one stack.
                      delay: reduced ? 0 : column * COLUMN_STAGGER + i * 0.015,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <motion.div
                      layout={reduced ? false : true}
                      layoutId={`media-${item.id}`}
                      transition={{ duration: reduced ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        aspectRatio: item.aspect,
                        // The open item's tile steps aside so the morphing
                        // frame is not doubled.
                        opacity: openId === item.id ? 0 : 1,
                      }}
                      className="relative overflow-hidden rounded-[1.25rem] border border-ink/10"
                    >
                      <button
                        type="button"
                        data-tile={item.id}
                        onClick={() => {
                          setOpenId(item.id);
                          setOriginId(item.id);
                        }}
                        aria-label={`Open ${item.caption}`}
                        className="group absolute inset-0 block w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure"
                      >
                        {item.src ? (
                          <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            sizes="(min-width: 900px) 30vw, (min-width: 560px) 45vw, 92vw"
                            className="object-cover transition-[scale] duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                          />
                        ) : (
                          <span
                            role="img"
                            aria-label={item.alt}
                            className="absolute inset-0 transition-[scale] duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                            style={{ backgroundImage: placeholderGradient(i + column * 2) }}
                          />
                        )}

                        <span className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        {item.type === "video" ? (
                          <span className="absolute top-3 left-3">
                            <PlayBadge />
                          </span>
                        ) : null}

                        <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left text-[0.875rem] text-paper opacity-0 transition-[opacity,translate] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          {item.caption}
                        </span>
                      </button>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </LayoutGroup>

      <MediaLightbox
        item={openItem}
        index={openIndex < 0 ? 0 : openIndex}
        total={visible.length}
        sharedLayout={openItem !== null && openItem.id === originId}
        seed={openIndex}
        onClose={close}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </>
  );
}
