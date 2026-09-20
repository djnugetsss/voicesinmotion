import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Five washes in the palette, rotated by seed so a wall of placeholders does
 * not read as one flat colour.
 */
const gradients = [
  "linear-gradient(150deg, color-mix(in oklab, var(--sky) 55%, var(--paper)) 0%, color-mix(in oklab, var(--azure) 42%, var(--mist)) 100%)",
  "linear-gradient(200deg, color-mix(in oklab, var(--mist) 90%, var(--paper)) 0%, color-mix(in oklab, var(--sky) 70%, var(--paper)) 100%)",
  "linear-gradient(120deg, color-mix(in oklab, var(--azure) 38%, var(--mist)) 0%, color-mix(in oklab, var(--sky) 40%, var(--paper)) 100%)",
  "linear-gradient(170deg, color-mix(in oklab, var(--sky) 38%, var(--paper)) 0%, color-mix(in oklab, var(--ink) 16%, var(--sky)) 100%)",
  "linear-gradient(135deg, color-mix(in oklab, var(--paper) 88%, var(--sky)) 0%, color-mix(in oklab, var(--azure) 46%, var(--mist)) 100%)",
];

export function placeholderGradient(seed: number) {
  return gradients[Math.abs(seed) % gradients.length];
}

export type MediaFrameProps = {
  src: string | null;
  alt: string;
  /** Width ÷ height. Reserves the box before anything loads. */
  aspect: number;
  /** Required whenever `src` is set — next/image needs it to pick a source. */
  sizes?: string;
  seed?: number;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  children?: React.ReactNode;
};

/**
 * One box for a picture that may not exist yet.
 *
 * The box is always reserved from `aspect`, so the placeholder and the real
 * file occupy exactly the same space and swapping one in shifts nothing.
 */
export function MediaFrame({
  src,
  alt,
  aspect,
  sizes = "100vw",
  seed = 0,
  priority,
  className,
  imageClassName,
  children,
}: MediaFrameProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: aspect }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        // Stands in for a picture, so it is announced as one rather than
        // being hidden outright.
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0"
          style={{ backgroundImage: placeholderGradient(seed) }}
        />
      )}
      {children}
    </div>
  );
}
