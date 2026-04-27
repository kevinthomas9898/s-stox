import { getTranslations } from "next-intl/server";
import Image from 'next/image';
import { Typography } from '@/components/common/typography';
import { SectionWrapper } from '@/components/common/SectionWrapper';

export default async function MonitoringSection() {
  const t = await getTranslations('monitoring');

  return (
    <SectionWrapper className="bg-[#181C25] py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full mx-auto">
        {/* Left Content */}
        <div className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          <Typography variant="h3">
            {t('title_part1')}{' '}
            <br className="hidden lg:block" />
            <span className="text-[#0066FF]">{t('title_part2')}</span>
          </Typography>

          <Typography variant="h4" className="max-w-xl font-medium">
            {t('subtitle')}
          </Typography>

          <Typography variant="p" className="max-w-3xl">
            {t('description')}
          </Typography>
        </div>

        {/* Right Image */}
        <div className="relative w-full aspect-square max-w-xl mx-auto lg:max-w-5xl lg:ml-auto lg:mr-0">
          <Image
            src="/Beige_Minimalist.png"
            alt={t('image_alt')}
            fill
            className="object-contain rounded-lg shrink-0"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
