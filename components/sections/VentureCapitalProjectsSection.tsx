import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Typography } from '@/components/ui/typography';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export async function VentureCapitalProjectsSection() {
  const t = await getTranslations('ventureCapital');

  return (
    <SectionWrapper className="py-20 bg-[#0b0f19] pt-28">
      <div className="flex flex-col items-center mb-16 text-center">
        <Typography variant="h2" className="text-white">
          {t('titleBefore')}
          <span className="text-blue-500">{t('titleHighlight')}</span>
          {t('titleAfter')}
        </Typography>

        <Typography variant="h5" className="text-gray-300 italic font-light">
          {t('subtitle')}
        </Typography>

        <Typography variant="h5" className="text-green-500 mt-7">
          {t('cta')}
        </Typography>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/Venture_Capital_Projects.png"
            alt={`${t('titleBefore')}${t('titleHighlight')}${t('titleAfter')}`}
            width={800}
            height={600}
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          <Typography variant="p" className="text-gray-300">
            {t('paragraph1')}
          </Typography>

          <Typography variant="p" className="text-gray-300">
            {t('paragraph2')}
          </Typography>

          <Typography variant="p" className="text-gray-300">
            {t('paragraph3')}
          </Typography>
        </div>
      </div>
    </SectionWrapper>
  );
}
