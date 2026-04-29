"use client";

import { Typography } from "@/components/common/typography";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";

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
      <FadeIn direction="up" duration={0.5}>
        <div className="text-center mb-12">
          <Typography variant="h2" className="text-white font-bold mb-4">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="h4" className="text-white/70">
              {subtitle}
            </Typography>
          )}
        </div>
      </FadeIn>

      {/* Sections */}
      <StaggerContainer staggerDelay={0.08} className="space-y-8">
        {sections.map((section, index) => (
          <StaggerItem key={section.id}>
            <section id={section.id} className="scroll-mt-24">
              {/* Section Title */}
              <Typography variant="h5" className="text-white font-semibold mb-4">
                {index + 1}. {section.title}
              </Typography>

              {/* Section Content */}
              {section.content && (
                <div className="space-y-2 ml-0 text-sm text-white/70">
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
                        <div className="space-y-1 text-sm text-white/70">
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
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Footer */}
      <FadeIn direction="up" delay={0.2}>
        <div className="mt-16 pt-8 border-t border-white">
          <Typography variant="p" className="text-sm">
            Effective From 1 April 2026
          </Typography>
        </div>
      </FadeIn>
    </div>
  );
}
