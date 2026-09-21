import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { RevealBlock, RevealWords } from "@/components/motion";
import { Section, SectionEyebrow } from "@/components/layout/Section";
import { MediaGallery } from "@/components/sections/media/MediaGallery";
import { media, showMedia, siteMeta } from "@/content";

export const metadata: Metadata = {
  title: "Media",
  description: media.intro,
  alternates: { canonical: "/media" },
  openGraph: {
    title: `Media: ${siteMeta.name}`,
    description: media.intro,
    url: `${siteMeta.url}/media`,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function MediaPage() {
  /* The page is pulled for now, not deleted: everything below still works.
     Flip `showMedia` in `content/flags.ts` to bring it back. */
  if (!showMedia) redirect("/");

  return (
    <Section
      tone="mist"
      size="flush"
      labelledBy="media-heading"
      className="pt-[calc(var(--header-h)+4.5rem)] pb-24 sm:pt-[calc(var(--header-h)+6rem)] sm:pb-28 lg:pb-36"
    >
      <RevealBlock eager>
        <SectionEyebrow>{media.eyebrow}</SectionEyebrow>
      </RevealBlock>

      <RevealWords
        eager
        as="h1"
        id="media-heading"
        text={media.title}
        className="font-display mt-6 text-[length:var(--text-section)] text-ink"
        stagger={0.05}
        distance={24}
      />

      <RevealBlock eager delay={0.2}>
        <p className="mt-5 mb-10 max-w-[48ch] text-[length:var(--text-lead)] leading-[1.6] text-ink/70 sm:mb-12">
          {media.intro}
        </p>
      </RevealBlock>

      <MediaGallery />
    </Section>
  );
}
