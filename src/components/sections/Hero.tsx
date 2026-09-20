"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";
import { ScrollCue } from "./ScrollCue";
import { Parallax, RevealBlock, RevealWords, Spotlight } from "@/components/motion";
import { ActionLink } from "@/components/ui/ActionLink";
import { Waveform } from "@/components/ui/Waveform";
import { hero } from "@/content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // 0 at the top of the hero, 1 once it has scrolled fully past.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-[var(--header-h)] pb-24 sm:pb-28"
    >
      {/* ---- Ambient light: drifting gradient layers, transform + opacity ---- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(175deg, var(--paper) 0%, var(--mist) 46%, color-mix(in oklab, var(--sky) 34%, var(--paper)) 100%)",
          }}
        />
        <div
          className="drift-a absolute -top-[28%] left-[-15%] h-[85vh] w-[85vw] rounded-full blur-[70px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--sky) 62%, transparent) 0%, transparent 68%)",
          }}
        />
        <div
          className="drift-b absolute -right-[20%] bottom-[-25%] h-[80vh] w-[80vw] rounded-full blur-[80px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--azure) 30%, transparent) 0%, transparent 66%)",
          }}
        />
        {/* Stage floor: a soft lift of light along the bottom edge. */}
        <div
          className="absolute inset-x-0 bottom-0 h-[42vh]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--paper) 78%, transparent) 70%, var(--paper) 100%)",
          }}
        />
      </div>

      <Spotlight size={700} intensity={0.6} />

      {/* ---- The voice ----
          Sits low on phones, where the type runs full-bleed and needs the
          room; rises to centre once there is a column of empty space beside
          the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[84%] -z-10 h-[20vh] max-h-[170px] min-h-[110px] -translate-y-1/2 md:top-1/2 md:h-[46vh] md:max-h-[460px] md:min-h-[240px]"
      >
        <Parallax rate={-0.06} className="h-full">
          <Waveform
            progress={scrollYProgress}
            pointerHost={ref}
            amplitude={0.4}
            amplitudeGain={1.8}
            speed={0.085}
            lineCount={4}
            frequency={1.5}
            envelope="rise"
            accentIndex={1}
            className="h-full"
          />
        </Parallax>
      </div>

      {/* ---- Content ---- */}
      <div className="shell relative">
        <div className="max-w-[min(100%,52rem)]">
          <RevealBlock direction="up" distance={14} duration={0.7}>
            <p className="flex items-center gap-2.5 text-[length:var(--text-eyebrow)] font-medium tracking-[0.2em] text-ink/55 uppercase">
              <span
                aria-hidden="true"
                className="inline-block size-1.5 shrink-0 rounded-full bg-gold"
              />
              {hero.eyebrow}
            </p>
          </RevealBlock>

          <RevealWords
            as="h1"
            id="hero-heading"
            text={hero.headline}
            className="font-display mt-5 text-[length:var(--text-display)] text-balance-tight text-ink sm:mt-7"
            stagger={0.055}
            delay={0.12}
            duration={0.95}
            distance={26}
            blur={12}
          />

          <RevealBlock direction="up" delay={0.42} distance={20}>
            <p className="mt-6 max-w-[46ch] text-[length:var(--text-lead)] leading-[1.6] text-ink/70 sm:mt-8">
              {hero.subhead}
            </p>
          </RevealBlock>

          <RevealBlock direction="up" delay={0.56} distance={20}>
            <div className="mt-9 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:items-center sm:gap-4">
              <ActionLink
                href={hero.primaryCta.href}
                external={hero.primaryCta.external}
                variant="primary"
                size="lg"
              >
                {hero.primaryCta.label}
              </ActionLink>
              <ActionLink
                href={hero.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {hero.secondaryCta.label}
              </ActionLink>
            </div>
          </RevealBlock>
        </div>
      </div>

      {/* ---- Scroll cue ---- */}
      <div className="absolute inset-x-0 bottom-7 sm:bottom-9">
        <div className="shell">
          <ScrollCue label={hero.scrollCue} progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
