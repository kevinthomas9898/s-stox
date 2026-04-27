import Image from 'next/image';
import { Typography } from '@/components/common/typography';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { getTranslations } from "next-intl/server";

export default async function TreasuryManagementSection() {
  const t = await getTranslations('treasuryManagement');

  const cards = [
    {
      number: '01',
      icon: '/primary_trading.svg',
      titleKey: 'card1_title',
      descriptionKeys: ['card1_description1', 'card1_description2'],
    },
    {
      number: '02',
      icon: '/fractional_digitised.svg',
      titleKey: 'card2_title',
      descriptionKeys: ['card2_description1', 'card2_description2'],
    },
    {
      number: '03',
      icon: '/transactional_profit.svg',
      titleKey: 'card3_title',
      descriptionKeys: ['card3_description1', 'card3_description2', 'card3_description3'],
    },
  ];

  return (
    <SectionWrapper className="bg-[#0b0f19] py-16 md:py-24" containerClassName="mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <Typography variant="h3" className="mb-3 md:mb-4">
          <span className="text-[#0066FF]">{t('title_part1')}</span>{' '}
          {t('title_part2')}
        </Typography>

        <Typography variant="h5" className="font-medium mb-4 md:mb-6 text-lg md:text-xl">
          {t('subtitle')}
        </Typography>

        <Typography variant="p" className="text-sm md:text-base">
          {t('description')}
        </Typography>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 md:p-10 md:px-12 relative overflow-hidden flex flex-col h-full"
          >
            <div className="relative z-10 flex flex-col grow">

              <div className="flex items-center justify-between mb-10">
                {/* Icon */}
                <div className='relative w-12 h-12 md:w-20 md:h-20 mb-4'>
                  <Image
                    src={card.icon}
                    alt={t(card.titleKey)}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Number */}
                <span className="top-3 right-3 md:top-4 md:right-4 text-4xl md:text-8xl font-extrabold text-gray-100">
                  {card.number}
                </span>
              </div>

              {/* Title */}
              <div className="mb-3 md:mb-4">
                <Typography
                  variant="h5"
                  className="text-gray-900 text-sm md:text-base font-semibold mb-2"
                >
                  {t(card.titleKey)}
                </Typography>
                <div className="w-12 h-1 bg-[#00D094]" />
              </div>

              {/* Description */}
              <div className="space-y-7">
                {card.descriptionKeys.map((key, idx) => (
                  <Typography
                    key={idx}
                    variant="p"
                    className="text-[#99A0AE] !text-base md:text-sm leading-relaxed"
                  >
                    {t(key)}
                  </Typography>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}