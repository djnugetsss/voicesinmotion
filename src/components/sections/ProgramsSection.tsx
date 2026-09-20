import { RevealBlock, RevealWords } from "@/components/motion";
import { Section, SectionEyebrow } from "@/components/layout/Section";
import { ProgramCard } from "@/components/ui/ProgramCard";
import { programs } from "@/content";

export function ProgramsSection() {
  return (
    <Section tone="paper" size="md" labelledBy="programs-heading">
      <RevealBlock>
        <SectionEyebrow>{programs.eyebrow}</SectionEyebrow>
      </RevealBlock>

      <RevealWords
        as="h2"
        id="programs-heading"
        text={programs.title}
        className="font-display mt-6 text-[length:var(--text-section)] text-ink"
        stagger={0.05}
        distance={22}
      />

      <RevealBlock delay={0.24}>
        <p className="mt-5 max-w-[46ch] text-[length:var(--text-lead)] leading-[1.6] text-ink/70">
          {programs.intro}
        </p>
      </RevealBlock>

      <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-2 lg:gap-7">
        {programs.programs.map((program, i) => (
          <RevealBlock
            key={program.id}
            delay={i * 0.12}
            distance={30}
            className="h-full"
          >
            <ProgramCard program={program} />
          </RevealBlock>
        ))}
      </div>
    </Section>
  );
}
