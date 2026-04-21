"use client";

import { Typography } from "@/components/ui/typography";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function MediaLibraryHeroSection() {
  return (
    <SectionWrapper className="text-center">
      {/* Title: MEDIA LIBRARY */}
      <Typography variant="h2" className="mb-4">
        MEDIA <span className="text-[#2A73EA]">LIBRARY</span>
      </Typography>

      {/* Subtitle */}
      <Typography variant="h4" className="mb-8 font-normal italic text-white/80">
        One Brand. One Voice. One Standard of Excellence.
      </Typography>

      {/* Description */}
      <Typography variant="p" className="mb-8 max-w-7xl mx-auto text-white/80">
        SmartStox represents precision, discipline, and trust - and every public message must reflect that standard. Our Media Library exists to protect the integrity of our brand and the confidence of our community. Only officially approved marketing materials may be used in any communication, promotion, or publication.
      </Typography>

      {/* Green Quote */}
      <Typography variant="p" className="text-[#00D094] max-w-7xl mx-auto">
        Consistency builds credibility. Credibility builds trust. And trust is the foundation of lasting growth.
      </Typography>
    </SectionWrapper>
  );
}
