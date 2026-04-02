import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Typography } from '@/components/ui/typography';

export default async function MediaLibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('mediaLibrary');

  return (
    <div className="min-h-screen bg-[#0b0f19] pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Typography variant="h1" className="text-white mb-6">
          {t('title')}
        </Typography>
        <Typography variant="p" className="text-gray-400 text-lg leading-relaxed">
          {t('description')}
        </Typography>
      </div>
    </div>
  );
}
