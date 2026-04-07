'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Typography } from '@/components/ui/typography';

const steps = [
  {
    image: '/Download_App_1.png',
    titleKey: 'step1_title',
    descKey: 'step1_desc',
  },
  {
    image: '/Complete_KYC_2.png',
    titleKey: 'step2_title',
    descKey: 'step2_desc',
  },
  {
    image: '/TopUp_Your_Tarding_account_3.png',
    titleKey: 'step3_title',
    descKey: 'step3_desc',
  },
  {
    image: '/Enjoy_Your_Returns_4.png',
    titleKey: 'step4_title',
    descKey: 'step4_desc',
  },
];

export default function RegistrationStepsSection() {
  const t = useTranslations('registration');

  return (
    <div className="w-full py-10 bg-[#0F131C]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <Typography variant="p" className="text-white mb-16 text-center">
          {t('title')}
        </Typography>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-16 relative">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center px-6 py-4 relative"
            >
              {/* Vertical Line - from top of image to step title */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-4 h-[305px] w-px bg-white" />
              )}
              
              {/* Step Image */}
              <div className="relative w-full aspect-square max-w-[250px] mb-6">
                <Image
                  src={step.image}
                  alt={t(step.titleKey)}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Step Number & Title */}
              <div className="space-y-2 max-w-[250px]">
                <Typography variant="h5" className="text-white">
                  {t('step')} {index + 1}: <span className="text-[#00D094]">{t(step.titleKey)}</span>
                </Typography>
                <Typography variant="p" className="text-xs! text-gray-400">
                  {t(step.descKey)}
                </Typography>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tagline */}
        <Typography variant="h5" className="text-white text-center tracking-wide mb-8">
          {t('tagline')}
        </Typography>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-full font-semibold transition-all cursor-pointer text-sm whitespace-nowrap w-full sm:w-auto">
            {t('cta_primary')}
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-full font-semibold transition-all cursor-pointer hover:bg-white/10 text-sm whitespace-nowrap w-full sm:w-auto">
            {t('cta_secondary')}
          </button>
        </div>
      </div>
    </div>
  );
}
