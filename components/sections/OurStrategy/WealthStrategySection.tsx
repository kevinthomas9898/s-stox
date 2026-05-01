import Image from 'next/image';
import { Typography } from '@/components/common/typography';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { getTranslations } from "next-intl/server";

export default async function WealthStrategySection() {
  const t = await getTranslations('wealthStrategy');

  return (
    <SectionWrapper className="py-24 pt-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full mx-auto">
        {/* Left Content */}
        <div className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          <Typography variant="h2">
            {t('title_part1')}{' '} <br className="hidden lg:block" />
            <span className="text-[#0066FF]">{t('title_part2')}</span>
          </Typography>

          <Typography variant="h5" className="font-light italic max-w-xl">
            {t('subtitle')}
          </Typography>

          <div className="space-y-4 pt-4">
            <Typography variant="p" className="text-white/80">
              {t('description1')}
            </Typography>
            <Typography variant="p" className="text-white/80">
              {t('description2')}
            </Typography>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full aspect-4/3  rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-w-md mx-auto lg:max-w-xl lg:ml-auto lg:mr-0">
          <Image
            src="/hand-adding-coins-stack-covered-dirt-plants.png"
            alt={t('image_alt')}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
