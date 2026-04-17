import Image from 'next/image';
import { Typography } from '@/components/ui/typography';
import { getTranslations } from "next-intl/server";

export default async function WealthFrameworkSection() {
  const t = await getTranslations('wealthFramework');

  return (
    <div className="w-full py-24">
      <div className="mx-4 lg:mx-16">
        {/* Title */}
        <Typography variant="h3" className="text-white text-center mb-16">
          {t('title_part1')}{' '}
          <span className="text-[#0066FF]">{t('title_part2')}</span>
        </Typography>

        {/* Framework Grid */}
        <div className="w-full relative">
          <Image
            src="/Wealth_Creation_Framework.png"
            alt="Wealth Creation Framework"
            width={1600}
            height={900}
            className="w-full z-10 h-auto object-contain rounded-lg"
            priority
          />
        </div>

      </div>
    </div>
  );
}
