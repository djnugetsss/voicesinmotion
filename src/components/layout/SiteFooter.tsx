import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Waveform } from "@/components/ui/Waveform";
import { footer, siteMeta, socialLinks } from "@/content";

export function SiteFooter() {
  return (
    <Section
      as="footer"
      tone="paper"
      size="sm"
      contained={false}
      label="Site footer"
      className="relative"
    >
      {/* Thin waveform strip along the very top edge, as the divider. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-12 -translate-y-1/2"
      >
        <Waveform
          amplitude={0.5}
          lineCount={2}
          frequency={1.9}
          speed={0.05}
          strokeWidth={1}
          baseOpacity={0.3}
          accentIndex={-1}
          interactive={false}
        />
      </div>

      <div className="shell">
        <div className="grid gap-12 pt-6 sm:gap-10 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            <p className="font-display text-[1.5rem] leading-none text-ink">
              {siteMeta.name}
            </p>
            <p className="mt-5 max-w-[42ch] text-[0.9375rem] leading-[1.6] text-ink/60">
              {footer.blurb}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[0.75rem] font-medium tracking-[0.18em] text-ink/45 uppercase">
              {footer.linksTitle}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9375rem] text-ink/70 transition-colors duration-200 hover:text-azure"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.75rem] font-medium tracking-[0.18em] text-ink/45 uppercase">
              {footer.contactTitle}
            </h2>
            <p className="mt-5 max-w-[30ch] text-[0.9375rem] leading-[1.6] text-ink/60">
              {footer.contactNote}
            </p>

            {footer.email ? (
              <a
                href={`mailto:${footer.email.address}`}
                data-placeholder={footer.email.placeholder || undefined}
                className="mt-4 inline-block text-[0.9375rem] text-azure transition-colors duration-200 hover:text-ink"
              >
                {footer.email.address}
              </a>
            ) : null}

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-ink/12 text-ink/65 transition-colors duration-200 hover:border-azure/45 hover:text-azure"
                >
                  <InstagramIcon className="size-[1.15rem]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-ink/8 pt-7 text-[0.8125rem] text-ink/45">
          {footer.copyright}
        </p>
      </div>
    </Section>
  );
}
