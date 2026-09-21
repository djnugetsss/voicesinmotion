import { RevealBlock, RevealWords } from "@/components/motion";
import { Section, SectionEyebrow } from "@/components/layout/Section";
import { about } from "@/content";

/** Compact: a banner, not a viewport. */
export function AboutHero() {
  return (
    <Section
      tone="hero"
      size="flush"
      labelledBy="about-heading"
      className="pt-[calc(var(--header-h)+4.5rem)] pb-20 sm:pt-[calc(var(--header-h)+6rem)] sm:pb-24 lg:pb-28"
    >
      <RevealBlock eager>
        <SectionEyebrow>{about.hero.eyebrow}</SectionEyebrow>
      </RevealBlock>

      <RevealWords
        eager
        as="h1"
        id="about-heading"
        text={about.hero.headline}
        className="font-display mt-6 max-w-[18ch] text-[length:var(--text-section)] text-ink"
        stagger={0.05}
        distance={24}
      />

      <RevealBlock eager delay={0.24}>
        <p className="mt-6 max-w-[52ch] text-[length:var(--text-lead)] leading-[1.6] text-ink/70">
          {about.hero.subhead}
        </p>
      </RevealBlock>
    </Section>
  );
}
