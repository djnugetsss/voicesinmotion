import { MediaFrame } from "@/components/ui/MediaFrame";
import { cn } from "@/lib/cn";
import type { Photo } from "@/content";

/**
 * A photo in a rounded, softly shadowed frame. Reserves its box from the
 * photo's aspect so nothing shifts as it loads.
 */
export function PhotoCard({
  photo,
  sizes,
  aspect,
  priority,
  compact,
  className,
  imageClassName,
}: {
  photo: Photo;
  sizes: string;
  /** Overrides the photo's own box; the image is cropped to fit. */
  aspect?: number;
  priority?: boolean;
  /** Small accent frame: tighter corners, a light ring, a lighter shadow. */
  compact?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <MediaFrame
      src={photo.src}
      alt={photo.alt}
      aspect={aspect ?? photo.aspect}
      sizes={sizes}
      priority={priority}
      imageClassName={imageClassName}
      className={cn(
        compact
          ? "rounded-2xl ring-2 ring-paper/85 shadow-[0_18px_40px_-20px_rgba(16,27,46,0.55)]"
          : "rounded-[1.5rem] border border-ink/10 shadow-[0_30px_70px_-34px_rgba(16,27,46,0.5)] sm:rounded-[1.75rem]",
        className,
      )}
    />
  );
}
