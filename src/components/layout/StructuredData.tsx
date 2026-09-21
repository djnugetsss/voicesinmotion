import { footer, siteMeta, socialLinks } from "@/content";

/**
 * EducationalOrganization JSON-LD. Rendered once, in the root layout, so it
 * is present on every route.
 */
export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteMeta.name,
    alternateName: siteMeta.shortName,
    description: siteMeta.description,
    url: siteMeta.url,
    ...(footer.email ? { email: footer.email.address } : {}),
    sameAs: socialLinks.map((social) => social.href),
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: [
        "Elementary School students",
        "Middle School students",
        "High School students",
      ],
    },
    teaches: ["Public speaking", "Competitive debate", "Persuasive communication"],
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from our own typed content, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
