import Image from "next/image";
import { cn } from "@/lib/cn";
import type { TeamMember } from "@/content";

/**
 * Compact horizontal card. Deliberately quieter than a founder card: square
 * photo, smaller type, no highlights and no lift, so the founders stay the
 * focus of the section.
 */
export function StaffCard({ member }: { member: TeamMember }) {
  const zoom = member.photoZoom ?? 1;

  return (
    <article
      className={cn(
        "group flex h-full items-start gap-5 rounded-[1.25rem] border border-ink/10 p-5 sm:gap-6 sm:p-6",
        "transition-colors duration-500 ease-out hover:border-azure/35",
      )}
      style={{
        backgroundImage:
          "linear-gradient(160deg, color-mix(in oklab, var(--paper) 92%, transparent) 0%, color-mix(in oklab, var(--sky) 14%, transparent) 100%)",
      }}
    >
      <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/10 sm:w-24">
        <Image
          src={member.photo}
          alt={`${member.name}, ${member.role} at Voices In Motion`}
          fill
          sizes="(min-width: 640px) 6rem, 5rem"
          className={cn(
            "object-cover transition-[filter] duration-700 ease-out",
            "[@media(hover:hover)]:grayscale-[55%] group-hover:grayscale-0",
          )}
          // Zoom anchored on the focal point, which is how two headshots
          // taken at different distances end up with heads the same size.
          style={{
            objectPosition: member.photoFocus,
            transformOrigin: member.photoFocus,
            scale: String(zoom),
          }}
        />
      </div>

      <div className="min-w-0">
        <h4 className="text-[1.0625rem] font-medium text-ink">{member.name}</h4>
        <p className="mt-1 text-[0.8125rem] text-azure-ink">{member.role}</p>
        {member.bio.map((paragraph, i) => (
          <p
            key={i}
            className="mt-3 text-[0.875rem] leading-[1.6] text-ink/70"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
