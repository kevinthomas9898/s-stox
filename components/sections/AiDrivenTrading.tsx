'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AiDrivenTrading() {
  const t = useTranslations('aiDrivenTrading');

  return (
    <div className="w-full py-24 bg-[#0b0f19]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-medium text-white leading-tight">
              {t('title_part1')}{' '}
              <span className="text-[#0066FF]">{t('title_part2')}</span>
            </h2>

            <h3 className="text-xl font-normal text-gray-300 leading-relaxed">
              {t('subtitle')}
            </h3>

            <div className="space-y-4 pt-4">
              <p className="text-lg font-normal text-gray-400 leading-relaxed">
                {t('description1')}
              </p>
              <p className="text-lg font-normal text-gray-400 leading-relaxed">
                {t('description2')}
              </p>
              <p className="text-lg font-normal text-gray-400 leading-relaxed">
                {t('description3')}
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full aspect-square max-w-xl ml-auto">
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
