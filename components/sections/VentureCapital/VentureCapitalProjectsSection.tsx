import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Typography } from '@/components/common/typography';
import { SectionWrapper } from '@/components/common/SectionWrapper';

export async function VentureCapitalProjectsSection() {
  const t = await getTranslations('ventureCapital');

  return (
    <SectionWrapper className="py-20 bg-[#0b0f19] pt-28">
      <div className="flex flex-col items-center mb-16 text-center">
        <Typography variant="h2">
          {t('titleBefore')}
          <span className="text-blue-500">{t('titleHighlight')}</span>
          {t('titleAfter')}
        </Typography>

        <Typography variant="h5" className="italic font-light">
          {t('subtitle')}
        </Typography>

        <Typography variant="h5" className="text-green-500 mt-7">
          {t('cta')}
        </Typography>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="w-full lg:w-2/3 relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
          <Image
            src="/Venture_Capital_Projects.png"
            alt={`${t('titleBefore')}${t('titleHighlight')}${t('titleAfter')}`}
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        <div className="w-full lg:w-1/3 flex flex-col space-y-6 max-w-sm">
          <Typography variant="p" className="text-white/80">
            {t('paragraph1')}
          </Typography>

          <Typography variant="p" className="text-white/80">
            {t('paragraph2')}
          </Typography>

          <Typography variant="p" className="text-white/80">
            {t('paragraph3')}
          </Typography>
        </div>
      </div>
    </SectionWrapper>
  );
}
