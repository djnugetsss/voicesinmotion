"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { RevealBlock, usePrefersReducedMotion } from "@/components/motion";
import { Section, SectionEyebrow } from "@/components/layout/Section";
import { CoachCard } from "@/components/ui/CoachCard";
import { about, coaches } from "@/content";

export function RosterSection() {
  const reduced = usePrefersReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Section tone="mist" size="md" labelledBy="roster-heading">
      <RevealBlock>
        <SectionEyebrow>{about.roster.eyebrow}</SectionEyebrow>
      </RevealBlock>

      <RevealBlock delay={0.08}>
        <h2
          id="roster-heading"
          className="font-display mt-6 text-[length:var(--text-section)] text-ink"
        >
          {about.roster.title}
        </h2>
      </RevealBlock>

      <RevealBlock delay={0.16}>
        <p className="mt-5 max-w-[46ch] text-[length:var(--text-lead)] leading-[1.6] text-ink/70">
          {about.roster.intro}
        </p>
      </RevealBlock>

      {/*
        Denser than the home grid. Each cell carries `layout`, so opening one
        card glides every other card to its new position instead of snapping —
        that reflow is the layout animation, and it runs on transforms.
      */}
      <ul className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
        {coaches.coaches.map((coach, i) => (
          <motion.li
            key={coach.id}
            layout={reduced ? false : true}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <CoachCard
              coach={coach}
              seed={i}
              dense
              expandable
              expanded={openId === coach.id}
              onToggle={() =>
                setOpenId((current) => (current === coach.id ? null : coach.id))
              }
            />
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
