import { setRequestLocale } from 'next-intl/server';
import { MediaLibraryHeroSection } from '@/components/sections/MediaLibrary/MediaLibraryHeroSection';
import { MediaLibraryColorsSection } from '@/components/sections/MediaLibrary/MediaLibraryColorsSection';

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
      
      <MediaLibraryHeroSection />
      <MediaLibraryColorsSection />
    </div>
  );
}
