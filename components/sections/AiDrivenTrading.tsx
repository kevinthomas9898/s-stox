import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Typography } from '@/components/ui/typography';

export default function AiDrivenTrading() {
  const t = useTranslations('aiDrivenTrading');

  return (
    <div className="w-full py-16 md:py-24 bg-[#0b0f19]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <Typography variant="h2" className="text-white normal-case">
              {t('title_part1')}{' '}
              <span className="text-[#0066FF]">{t('title_part2')}</span>
            </Typography>

            <Typography variant="h4" className="text-gray-300">
              {t('subtitle')}
            </Typography>

            <div className="space-y-4 pt-4">
              <Typography variant="p" className="text-gray-400">
                {t('description1')}
              </Typography>
              <Typography variant="p" className="text-gray-400">
                {t('description2')}
              </Typography>
              <Typography variant="p" className="text-gray-400">
                {t('description3')}
              </Typography>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full aspect-square max-w-xl mx-auto lg:ml-auto">
            <Image
              src="/aiDrivenTrading.png"
              alt={t('image_alt')}
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
