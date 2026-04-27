"use client";

import { Typography } from "@/components/ui/typography";

interface TermsSection {
  id: string;
  title: string;
  subsections?: {
    id?: string;
    title?: string;
    content?: string[];
  }[];
  content?: string[];
}

interface TermsDocumentProps {
  title: string;
  subtitle?: string;
  sections: TermsSection[];
}

export function TermsDocument({ title, subtitle, sections }: TermsDocumentProps) {
  return (
    <div className="mx-auto relative">
      {/* Header */}
      <div className="text-center mb-12">
        <Typography variant="h2" className="text-white font-bold mb-4">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="h4" className="text-white/80">
            {subtitle}
          </Typography>
        )}
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            {/* Section Title */}
            <Typography variant="h5" className="text-white font-semibold mb-4">
              {index + 1}. {section.title}
            </Typography>

            {/* Section Content */}
            {section.content && (
              <div className="space-y-2 ml-0 text-sm text-white/80">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Subsections */}
            {section.subsections && (
              <div className="space-y-3 ml-4">
                {section.subsections.map((sub, subIndex) => (
                  <div key={subIndex}>
                    {sub.id && (
                      <p className="text-white font-semibold text-sm mb-1">
                        {sub.id} {sub.title}
                      </p>
                    )}
                    {sub.content && (
                      <div className="space-y-1 text-sm text-white/80">
                        {sub.content.map((paragraph, pIndex) => (
                          <p key={pIndex} className="leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
