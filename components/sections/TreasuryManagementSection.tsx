'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Typography } from '@/components/ui/typography';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export default function TreasuryManagementSection() {
  const t = useTranslations('treasuryManagement');

  const cards = [
    {
      number: '01',
      icon: '/primary_trading.svg',
      titleKey: 'card1_title',
      descriptionKey: 'card1_description',
    },
    {
      number: '02',
      icon: '/fractional_digitised.svg',
      titleKey: 'card2_title',
      descriptionKey: 'card2_description',
    },
    {
      number: '03',
      icon: '/transactional_profit.svg',
      titleKey: 'card3_title',
      descriptionKey: 'card3_description',
    },
  ];

  return (
    <SectionWrapper className="bg-[#0b0f19] py-16 md:py-24" containerClassName="mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
        <Typography variant="h3" className="text-white mb-3 md:mb-4">
          {t('title_part1')}{' '}
          <span className="text-[#0066FF]">{t('title_part2')}</span>
        </Typography>

        <Typography variant="h5" className="text-white mb-4 md:mb-6 text-lg md:text-xl">
          {t('subtitle')}
        </Typography>

        <Typography variant="p" className="text-gray-400 text-sm md:text-base">
          {t('description')}
        </Typography>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 md:p-6 relative overflow-hidden flex flex-col h-full"
          >
            {/* Number */}
            <span className="absolute top-3 right-3 md:top-4 md:right-4 text-4xl md:text-6xl font-extrabold text-gray-100">
              {card.number}
            </span>

            <div className="relative z-10 flex flex-col flex-grow">

              {/* Icon */}
              <div className="w-12 h-12 md:w-14 md:h-14 mb-4">
                <Image
                  src={card.icon}
                  alt={t(card.titleKey)}
                  width={56}
                  height={56}
                  className="object-contain w-full h-auto"
                />
              </div>

              {/* Title */}
              <div className="mb-3 md:mb-4">
                <Typography
                  variant="h5"
                  className="text-gray-900 text-sm md:text-base font-semibold mb-2"
                >
                  {t(card.titleKey)}
                </Typography>
                <div className="w-8 h-0.5 bg-[#00D094]" />
              </div>

              {/* Description */}
              <Typography
                variant="p"
                className="text-gray-600 text-xs md:text-sm leading-relaxed"
              >
                {t(card.descriptionKey)}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}