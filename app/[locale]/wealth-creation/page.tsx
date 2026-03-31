import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default async function WealthCreationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = useTranslations('wealthCreation');

  return (
    <div className="min-h-screen bg-[#0b0f19] pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {t('title')}
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          {t('description')}
        </p>
      </div>
    </div>
  );
}
