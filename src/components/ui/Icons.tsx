import type { PillarIcon } from "@/content";

/**
 * Hand-drawn line icons, one consistent style: 32×32 box, 1.5 stroke,
 * currentColor, round caps and joins, never filled. No icon library.
 */
const shared = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  focusable: "false" as const,
};

/** A speaker's lectern, with the mic angled off the top. */
export function PodiumIcon({ className }: { className?: string }) {
  return (
    <svg {...shared} className={className}>
      <path d="M7 10h18l-2.2 4H9.2z" />
      <path d="M13 14v11M19 14v11" />
      <path d="M8.5 27h15" />
      <path d="M22 9.5V7a1.6 1.6 0 0 1 3.2 0" />
      <circle cx="25.2" cy="5.4" r="1.4" />
    </svg>
  );
}

/** Balance scales — the argument pillar. */
export function ScalesIcon({ className }: { className?: string }) {
  return (
    <svg {...shared} className={className}>
      <circle cx="16" cy="6.2" r="1.5" />
      <path d="M16 7.8V26" />
      <path d="M11 27.5h10" />
      <path d="M6.5 11.5h19" />
      <path d="M16 9.6 6.5 11.5M16 9.6l9.5 1.9" />
      <path d="M3 16.4h7M25 16.4h4" />
      <path d="M3 16.4a3.5 3.5 0 0 0 7 0" />
      <path d="M22 16.4a3.5 3.5 0 0 0 7 0" />
      <path d="M6.5 11.5v4.9M25.5 11.5v4.9" />
    </svg>
  );
}

/** The same sine the site runs on, reduced to a mark. */
export function WaveformIcon({ className }: { className?: string }) {
  return (
    <svg {...shared} className={className}>
      <path d="M2.5 16c3 0 3-7.5 6-7.5S11.5 23.5 14.5 23.5 17.5 5 20.5 5s3 11 6 11h3" />
    </svg>
  );
}

const icons: Record<PillarIcon, (props: { className?: string }) => React.ReactElement> = {
  podium: PodiumIcon,
  scales: ScalesIcon,
  waveform: WaveformIcon,
};

export function PillarGlyph({
  name,
  className,
}: {
  name: PillarIcon;
  className?: string;
}) {
  const Glyph = icons[name];
  return <Glyph className={className} />;
}
