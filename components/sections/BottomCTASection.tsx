import { useTranslations } from 'next-intl';
import Image from 'next/image';

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
        <div className="bg-[#00D094] rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-[0_20px_80px_rgba(0,208,148,0.25)]">
          <div className="space-y-8">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2">
              <span className="text-gray-900 font-semibold text-sm md:text-base">
                {t('eyebrow')}
              </span>
              <span className="bg-[#374151] text-white px-3 py-1 rounded-md font-bold text-sm italic">
                {t('badge')}
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-tight">
                {t('title')}
              </h2>
              <p className="text-gray-800 font-medium text-base md:text-lg leading-relaxed max-w-xl">
                {t('description')}
              </p>
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
              <p className="text-white font-bold text-xs tracking-[0.15em] uppercase border-t border-white/30 pt-6">
                {t('tagline')}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-full font-semibold transition-all cursor-pointer text-sm whitespace-nowrap">
                  {t('primaryButton')}
                </button>
                <button className="border border-white text-white px-6 py-3 rounded-full font-semibold transition-all cursor-pointer hover:bg-white/10 text-sm whitespace-nowrap">
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
          <p className="text-white font-sans font-medium italic text-lg leading-[16px] tracking-[0.02em] uppercase">
            {t('bannerText')}
          </p>
        </div>
      </div>
    </div>
  );
}
