import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Typography } from '@/components/ui/typography';

export default function TransparentFeesSection() {
  const t = useTranslations('transparentFees');

  return (
    <div className="w-full py-24 bg-[#0b0f19]">
      <div className="mx-4 lg:mx-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          {/* Title */}
          <Typography variant="h3" className="text-white">
            <span className="text-[#0066FF]">{t('title_part1')}</span>
            {' - '}
            {t('title_part2')}
          </Typography>

          {/* Subtitle */}
          <Typography variant="p" className="text-gray-300">
            {t('subtitle')}
          </Typography>

          {/* Image */}
          <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/transparent_Performance_Based_Fees.png"
              alt={t('image_alt')}
              fill
              className="object-cover"
            />
          </div>

          {/* Description Paragraphs */}
          <div className="space-y-4 max-w-3xl">
            <Typography variant="p" className="text-gray-400">
              {t('description1')}
            </Typography>
            <Typography variant="p" className="text-gray-400">
              {t('description2')}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
