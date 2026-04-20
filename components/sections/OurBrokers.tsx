import { getTranslations } from "next-intl/server";
import Image from 'next/image';
import { Typography } from '@/components/ui/typography';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export default async function OurBrokers() {
  const t = await getTranslations('ourBrokers');

  return (
    <SectionWrapper className="bg-[#0b0f19] py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full mx-auto">
        {/* Left Content */}
        <div className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          <Typography variant="h3" className="text-white">
            {t('title_part1')}{' '}
            <span className="text-[#0066FF]">{t('title_part2')}</span>
          </Typography>

          <Typography variant="h5" className="max-w-xl">
            {t('subtitle')}
          </Typography>

          <div className="space-y-4 pt-4">
            <Typography variant="p">
              {t('description')}
            </Typography>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full aspect-square max-w-md mx-auto lg:max-w-xl lg:ml-auto lg:mr-0">
          <Image
            src="/STOCK_MARKET.png"
            alt={t('image_alt')}
            fill
            className="object-contain rounded-lg shrink-0"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
