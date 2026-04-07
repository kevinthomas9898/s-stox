import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Typography } from '@/components/ui/typography';

export default function BottomCTASection() {
  const t = useTranslations('cta');

  const features = [
    { text: t('feature1'), iconSrc: '/no_simulations.svg' },
    { text: t('feature2'), iconSrc: '/performance_logic_logo.svg' },
    { text: t('feature3'), iconSrc: '/Experience_Disciplined_Automation.svg' }
  ];

  return (
    <div className="w-full py-16 bg-[#0b0f19] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#00D094] rounded-[2rem] p-6 sm:p-8 md:p-12 lg:p-16 shadow-[0_20px_80px_rgba(0,208,148,0.25)]">
          <div className="space-y-8">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2">
              <Typography variant="h5" className="text-gray-900">
                {t('eyebrow')}
              </Typography>
              <span className="bg-[#374151] text-white px-3 py-1 rounded-md font-bold text-sm italic">
                {t('badge')}
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-4">
              <Typography variant="h1" className="text-white">
                {t('title')}
              </Typography>
              <Typography variant="p" className="text-gray-800 max-w-xl">
                {t('description')}
              </Typography>
            </div>

            {/* Features Row */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 pt-2">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Image
                    src={feature.iconSrc}
                    alt="Icon"
                    width={40}
                    height={40}
                  />
                  <p className="text-gray-800 font-semibold text-sm leading-snug whitespace-pre-line">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Full-width Divider & Text */}
            <div className="pt-6 space-y-6">
              <Typography variant="p" className="text-white text-xs! font-bold! tracking-[0.15em]! uppercase border-t border-white/30 pt-6">
                {t('tagline')}
              </Typography>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-full font-semibold transition-all cursor-pointer text-sm whitespace-nowrap w-full sm:w-auto">
                  {t('primaryButton')}
                </button>
                <button className="border border-white text-white px-6 py-3 rounded-full font-semibold transition-all cursor-pointer hover:bg-white/10 text-sm whitespace-nowrap w-full sm:w-auto">
                  {t('secondaryButton')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blue Banner - Full Width */}
      <div className="w-full bg-[#2A73EA] py-4 mt-16 px-6 text-center">
        <div className="mx-auto">
          <Typography variant="p" className="text-white italic text-lg! tracking-[0.02em]! uppercase">
            {t('bannerText')}
          </Typography>
        </div>
      </div>
    </div>
  );
}
