import { RevealBlock, RevealWords } from "@/components/motion";
import { Section, SectionEyebrow } from "@/components/layout/Section";
import { CoachCard } from "@/components/ui/CoachCard";
import { coaches } from "@/content";

export function CoachesSection() {
  return (
    <Section
      id={coaches.id}
      tone="mist"
      size="md"
      labelledBy="coaches-heading"
    >
      <RevealBlock>
        <SectionEyebrow>{coaches.eyebrow}</SectionEyebrow>
      </RevealBlock>

      <RevealWords
        as="h2"
        id="coaches-heading"
        text={coaches.title}
        className="font-display mt-6 max-w-[20ch] text-[length:var(--text-section)] text-ink"
        stagger={0.05}
        distance={22}
      />

      <RevealBlock delay={0.2}>
        <p className="mt-5 max-w-[50ch] text-[length:var(--text-lead)] leading-[1.6] text-ink/70">
          {coaches.intro}
        </p>
      </RevealBlock>

      <ul className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
        {coaches.coaches.map((coach, i) => (
          <RevealBlock
            key={coach.id}
            as="li"
            delay={i * 0.08}
            distance={26}
            className="h-full"
          >
            <CoachCard coach={coach} />
          </RevealBlock>
        ))}
      </ul>
    </Section>
  );
}
