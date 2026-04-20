import { getTranslations } from "next-intl/server";
import Image from 'next/image';
import { Typography } from '@/components/ui/typography';

export default async function TransparentFeesSection() {
  const t = await getTranslations('transparentFees');

  return (
    <div className="w-full py-24 bg-[#0b0f19]">
      <div className="mx-4 lg:mx-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-y-12">

          <div>
            {/* Title */}
            <Typography variant="h3">
              <span className="text-[#0066FF]">{t('title_part1')}</span>
              {' - '}
              {t('title_part2')}
            </Typography>

            {/* Subtitle */}
            <Typography variant="p">
              {t('subtitle')}
            </Typography>
          </div>

          {/* Image */}
          <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden">
            <Image
              src="/transparent_Performance_Based_Fees.png"
              alt={t('image_alt')}
              fill
              className="object-cover"
            />
          </div>

          {/* Description Paragraphs */}
          <div>
            <Typography variant="p">
              {t('description1')}
            </Typography>
            <Typography variant="p">
              {t('description2')}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
