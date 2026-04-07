import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Typography } from '@/components/ui/typography';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export default function WealthStrategySection() {
  const t = useTranslations('wealthStrategy');

  return (
    <SectionWrapper className="bg-[#0b0f19] py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full mx-auto">
        {/* Left Content */}
        <div className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          <Typography variant="h2" className="text-white">
            {t('title_part1')}{' '} <br className="hidden lg:block" />
            <span className="text-[#0066FF]">{t('title_part2')}</span>
          </Typography>

          <Typography variant="h5" className="text-gray-300 font-light italic max-w-xl">
            {t('subtitle')}
          </Typography>

          <div className="space-y-4 pt-4">
            <Typography variant="p" className="text-gray-400">
              {t('description1')}
            </Typography>
            <Typography variant="p" className="text-gray-400">
              {t('description2')}
            </Typography>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full aspect-square max-w-md mx-auto lg:max-w-xl lg:ml-auto mr-0">
          <Image
            src="/hand-adding-coins-stack-covered-dirt-plants.png"
            alt={t('image_alt')}
            fill
            className="object-contain rounded-lg"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
