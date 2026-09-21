import { RevealBlock, RevealWords } from "@/components/motion";
import { Section, SectionEyebrow } from "@/components/layout/Section";
import { FounderCard } from "@/components/ui/FounderCard";
import { StaffCard } from "@/components/ui/StaffCard";
import { founders, staff, team } from "@/content";

export function TeamSection() {
  return (
    <Section id={team.id} tone="mist" size="md" labelledBy="team-heading">
      <RevealBlock>
        <SectionEyebrow>{team.eyebrow}</SectionEyebrow>
      </RevealBlock>

      <RevealWords
        as="h2"
        id="team-heading"
        text={team.foundersTitle}
        className="font-display mt-6 max-w-[20ch] text-[length:var(--text-section)] text-ink"
        stagger={0.05}
        distance={22}
      />

      <RevealBlock delay={0.2}>
        <p className="mt-5 max-w-[50ch] text-[length:var(--text-lead)] leading-[1.6] text-ink/70">
          {team.foundersIntro}
        </p>
      </RevealBlock>

      <ul className="mx-auto mt-12 grid max-w-[58rem] gap-5 sm:mt-16 lg:grid-cols-2 lg:gap-7">
        {founders.map((member, i) => (
          <RevealBlock
            key={member.slug}
            as="li"
            delay={i * 0.1}
            distance={26}
            className="h-full"
          >
            <FounderCard member={member} />
          </RevealBlock>
        ))}
      </ul>

      {staff.length > 0 ? (
        <div className="mt-16 sm:mt-20">
          <RevealBlock>
            <h3 className="text-[0.8125rem] font-medium tracking-[0.18em] text-ink/65 uppercase">
              {team.staffTitle}
            </h3>
          </RevealBlock>

          <ul className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-2 lg:gap-5">
            {staff.map((member, i) => (
              <RevealBlock
                key={member.slug}
                as="li"
                delay={i * 0.08}
                distance={20}
                className="h-full"
              >
                <StaffCard member={member} />
              </RevealBlock>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
