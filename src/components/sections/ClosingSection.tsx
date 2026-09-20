"use client";

import { RevealBlock, RevealWords } from "@/components/motion";
import { Section } from "@/components/layout/Section";
import { ActionLink } from "@/components/ui/ActionLink";
import { Waveform } from "@/components/ui/Waveform";
import { closing } from "@/content";

export function ClosingSection() {
  return (
    <Section
      id={closing.id}
      tone="deep"
      size="lg"
      contained={false}
      labelledBy="closing-heading"
      className="overflow-hidden"
    >
      {/* Full amplitude, faint, behind the type. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[62%] -translate-y-1/2"
      >
        <Waveform
          amplitude={0.86}
          lineCount={5}
          frequency={1.35}
          speed={0.07}
          strokeWidth={1.25}
          stroke="var(--sky)"
          accentStroke="var(--sky)"
          baseOpacity={0.3}
          accentIndex={-1}
          interactive={false}
        />
      </div>

      <div className="shell text-center">
        <RevealWords
          as="h2"
          id="closing-heading"
          text={closing.headline}
          className="font-display text-balance-tight mx-auto max-w-[17ch] text-[length:var(--text-display)] text-paper"
          stagger={0.055}
          distance={26}
          blur={12}
        />

        <RevealBlock delay={0.3}>
          <p className="mx-auto mt-7 max-w-[52ch] text-[length:var(--text-lead)] leading-[1.6] text-paper/70">
            {closing.subhead}
          </p>
        </RevealBlock>

        <RevealBlock delay={0.44}>
          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <ActionLink
              href={closing.primaryCta.href}
              external={closing.primaryCta.external}
              variant="gold-solid"
              size="lg"
            >
              {closing.primaryCta.label}
            </ActionLink>
            <ActionLink
              href={closing.secondaryCta.href}
              external={closing.secondaryCta.external}
              variant="outline-light"
              size="lg"
            >
              {closing.secondaryCta.label}
            </ActionLink>
          </div>
        </RevealBlock>
      </div>
    </Section>
  );
}
