import Image from 'next/image';
import { Typography } from '@/components/ui/typography';
import { getTranslations } from "next-intl/server";

export default async function WealthFrameworkSection() {
  const t = await getTranslations('wealthFramework');

  const items = [
    {
      icon: '/Trading.svg',
      title: t('trading_title'),
      description: t('trading_description'),
      position: 'top-left',
    },
    {
      icon: '/reinvestment.svg',
      title: t('reinvestment_title'),
      description: t('reinvestment_description'),
      position: 'top-center',
    },
    {
      icon: '/cash_balance.svg',
      title: t('cash_balance_title'),
      description: t('cash_balance_description'),
      position: 'top-right',
    },
    {
      icon: '/profit_allocation.svg',
      title: t('profit_allocation_title'),
      description: t('profit_allocation_description'),
      position: 'bottom-left',
    },
    {
      icon: '/fees.svg',
      title: t('fees_title'),
      description: t('fees_description'),
      position: 'bottom-right',
    },
  ];

  return (
    <div className="w-full py-24 bg-[#FFFFFF0A]">
      <div className="mx-4 lg:mx-16">
        {/* Title */}
        <Typography variant="h3" className="text-white text-center mb-16">
          {t('title_part1')}{' '}
          <span className="text-[#0066FF]">{t('title_part2')}</span>
        </Typography>

        {/* Framework Grid */}
        <div className="relative max-w-7xl mx-auto">
          {/* SVG Connecting Lines */}
          <svg 
            className="absolute top-[170px] left-0 w-full h-[160px] pointer-events-none hidden md:block z-0" 
            viewBox="0 0 1000 160" 
            preserveAspectRatio="xMidYMid meet"
          >
            <line x1="70" y1="0" x2="290" y2="210" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="250" y1="210" x2="480" y2="0" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="530" y1="0" x2="740" y2="210" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="700" y1="210" x2="930" y2="0" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 relative z-10">
            {/* Trading */}
            <div className="flex flex-col items-center text-center">
              <Typography variant="h5" className="text-[#00D094] mb-2">
                {t('trading_title')}
              </Typography>
              <Typography variant="p" className="text-gray-400 text-sm mb-6 max-w-[280px]">
                {t('trading_description')}
              </Typography>
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg relative z-10">
                <div className="relative w-12 h-12">
                  <Image
                    src="/Trading.svg"
                    alt={t('trading_title')}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Reinvestment */}
            <div className="flex flex-col items-center text-center">
              <Typography variant="h5" className="text-[#00D094] mb-2">
                {t('reinvestment_title')}
              </Typography>
              <Typography variant="p" className="text-gray-400 text-sm mb-6 max-w-[280px]">
                {t('reinvestment_description')}
              </Typography>
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg relative z-10">
                <div className="relative w-12 h-12">
                  <Image
                    src="/reinvestment.svg"
                    alt={t('reinvestment_title')}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Cash Balance */}
            <div className="flex flex-col items-center text-center">
              <Typography variant="h5" className="text-[#00D094] mb-2">
                {t('cash_balance_title')}
              </Typography>
              <Typography variant="p" className="text-gray-400 text-sm mb-6 max-w-[280px]">
                {t('cash_balance_description')}
              </Typography>
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg relative z-10">
                <div className="relative w-12 h-12">
                  <Image
                    src="/cash_balance.svg"
                    alt={t('cash_balance_title')}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Full width to match top */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10 px-4 sm:px-[10%] md:px-0">
            {/* Profit Allocation */}
            <div className="flex flex-col items-center text-center md:ml-[15%]">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg mb-4 relative z-10">
                <div className="relative w-12 h-12">
                  <Image
                    src="/profit_allocation.svg"
                    alt={t('profit_allocation_title')}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <Typography variant="h5" className="text-[#00D094] mb-2">
                {t('profit_allocation_title')}
              </Typography>
              <Typography variant="p" className="text-gray-400 text-sm max-w-[280px]">
                {t('profit_allocation_description')}
              </Typography>
            </div>

            {/* Fees */}
            <div className="flex flex-col items-center text-center md:mr-[15%]">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg mb-4 relative z-10">
                <div className="relative w-12 h-12">
                  <Image
                    src="/fees.svg"
                    alt={t('fees_title')}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <Typography variant="h5" className="text-[#00D094] mb-2">
                {t('fees_title')}
              </Typography>
              <Typography variant="p" className="text-gray-400 text-sm max-w-[280px]">
                {t('fees_description')}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
