"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { RevealBlock, RevealWords, usePrefersReducedMotion } from "@/components/motion";
import { Section, SectionEyebrow } from "@/components/layout/Section";
import { FounderCard } from "@/components/ui/FounderCard";
import { StaffCard } from "@/components/ui/StaffCard";
import { founders, staff, team } from "@/content";

export function TeamSection() {
  const reduced = usePrefersReducedMotion();
  const [openSlug, setOpenSlug] = useState<string | null>(null);

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

      {/*
        Same disclosure as the roster on /about: each cell carries `layout`,
        so opening one card glides the other to its new position rather than
        snapping. That reflow is the layout animation, and it runs on
        transforms.
      */}
      <ul className="mx-auto mt-12 grid max-w-[58rem] gap-5 sm:mt-16 lg:grid-cols-2 lg:gap-7">
        {founders.map((member) => (
          <motion.li
            key={member.slug}
            layout={reduced ? false : true}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <FounderCard
              member={member}
              expandable
              expanded={openSlug === member.slug}
              onToggle={() =>
                setOpenSlug((current) =>
                  current === member.slug ? null : member.slug,
                )
              }
            />
          </motion.li>
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
