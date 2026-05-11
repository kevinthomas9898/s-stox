import { setRequestLocale } from 'next-intl/server';
import { MediaLibraryHeroSection } from '@/components/sections/MediaLibrary/MediaLibraryHeroSection';
import { MediaLibraryColorsSection } from '@/components/sections/MediaLibrary/MediaLibraryColorsSection';
import { MediaLibraryLogosSection } from '@/components/sections/MediaLibrary/MediaLibraryLogosSection';
import { MediaLibraryAdsSection } from '@/components/sections/MediaLibrary/MediaLibraryAdsSection';
import { FadeIn } from '@/components/animations';

export default async function MediaLibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-[#0b0f19] pt-32 pb-20">
      <div className="gradient-overlay" />
      <FadeIn direction="up" duration={0.6}>
        <MediaLibraryHeroSection />
      </FadeIn>
      <FadeIn direction="left" delay={0.3}>
        <MediaLibraryLogosSection />
      </FadeIn>
      <FadeIn direction="right" delay={0.3}>
        <MediaLibraryColorsSection />
      </FadeIn>
      <FadeIn direction="left" delay={0.3}>
        <MediaLibraryAdsSection />
      </FadeIn>
    </div>
  );
}
