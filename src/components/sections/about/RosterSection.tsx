"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { RevealBlock, usePrefersReducedMotion } from "@/components/motion";
import { Section, SectionEyebrow } from "@/components/layout/Section";
import { FounderCard } from "@/components/ui/FounderCard";
import { StaffCard } from "@/components/ui/StaffCard";
import { about, founders, staff, team } from "@/content";

export function RosterSection() {
  const reduced = usePrefersReducedMotion();
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <Section
      tone="mist"
      size="flush"
      labelledBy="roster-heading"
      className="pt-[calc(var(--header-h)+4.5rem)] pb-24 sm:pt-[calc(var(--header-h)+6rem)] sm:pb-28 lg:pb-36"
    >
      <RevealBlock>
        <SectionEyebrow>{about.roster.eyebrow}</SectionEyebrow>
      </RevealBlock>

      <RevealBlock delay={0.08}>
        <h1
          id="roster-heading"
          className="font-display mt-6 text-[length:var(--text-section)] text-ink"
        >
          {about.roster.title}
        </h1>
      </RevealBlock>

      <RevealBlock delay={0.16}>
        <p className="mt-5 max-w-[46ch] text-[length:var(--text-lead)] leading-[1.6] text-ink/70">
          {about.roster.intro}
        </p>
      </RevealBlock>

      {/*
        Each cell carries `layout`, so opening one card glides the other to its
        new position instead of snapping. That reflow is the layout animation,
        and it runs on transforms.
      */}
      <ul className="mx-auto mt-12 grid max-w-[58rem] gap-5 sm:mt-14 lg:grid-cols-2 lg:gap-7">
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
