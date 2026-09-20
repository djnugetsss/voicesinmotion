import { RevealBlock } from "@/components/motion";
import { Section, SectionEyebrow } from "@/components/layout/Section";
import { PillarGlyph } from "@/components/ui/Icons";
import { about } from "@/content";

export function MissionSection() {
  return (
    <Section tone="paper" size="md" labelledBy="mission-heading">
      <RevealBlock>
        <SectionEyebrow>{about.mission.eyebrow}</SectionEyebrow>
      </RevealBlock>

      <RevealBlock delay={0.08}>
        <h2
          id="mission-heading"
          className="font-display mt-6 max-w-[16ch] text-[length:var(--text-section)] text-ink"
        >
          {about.mission.title}
        </h2>
      </RevealBlock>

      <ul className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-3 lg:gap-7">
        {about.mission.pillars.map((pillar, i) => (
          <RevealBlock
            key={pillar.id}
            as="li"
            delay={i * 0.1}
            distance={26}
            className="h-full"
          >
            <div
              className="flex h-full flex-col rounded-[1.5rem] border border-ink/10 p-7 sm:p-8"
              style={{
                backgroundImage:
                  "linear-gradient(160deg, color-mix(in oklab, var(--paper) 92%, transparent) 0%, color-mix(in oklab, var(--sky) 20%, transparent) 100%)",
              }}
            >
              <PillarGlyph name={pillar.icon} className="size-9 text-azure" />
              <h3 className="font-display mt-7 text-[1.625rem] leading-none text-ink">
                {pillar.title}
              </h3>
              <p className="mt-4 max-w-[30ch] text-[0.9375rem] leading-[1.6] text-ink/65">
                {pillar.body}
              </p>
            </div>
          </RevealBlock>
        ))}
      </ul>
    </Section>
  );
}
