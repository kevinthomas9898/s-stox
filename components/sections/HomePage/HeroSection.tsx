'use client';

import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa6';
import { AiOutlinePlayCircle } from "react-icons/ai";
import { Typography } from '@/components/common/typography';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations();
  return (
    <SectionWrapper className="relative z-10">
      <div className="relative z-10 pt-20 md:pt-32 pb-16 md:pb-24">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-8 items-center mb-16">
          {/* Left Content */}
          <section className="space-y-8 max-w-2xl">
            <Typography variant="h1" className="text-white text-center lg:text-left">
              {t('hero.title_part1')}
              <br />
              {t('hero.title_part2')}
              <br />
              <span className="text-[#0066FF]">{t('hero.title_part3')}</span>
            </Typography>

            <Typography variant="p" className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              {t('hero.subtitle')}
            </Typography>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 pt-2 w-full">
              <button aria-label={t('hero.cta_primary')} className="flex items-center justify-center gap-2 bg-[#00D094] hover:bg-[#00c985] text-gray-900 px-6 sm:px-8 py-3.5 rounded-md font-semibold transition-colors cursor-pointer w-full sm:w-auto">
                {t('hero.cta_primary')}
                <FaArrowRight className="w-4 h-4 font-bold" aria-hidden="true" />
              </button>

              <button aria-label={t('hero.cta_secondary')} className="flex items-center justify-center gap-2 text-[#5B8FFF] bg-transparent border border-[#5B8FFF] hover:border-[#8AB4FF] px-6 sm:px-8 py-3.5 rounded-md font-semibold transition-colors cursor-pointer w-full sm:w-auto">
                <AiOutlinePlayCircle className="w-5 h-5 text-[#5B8FFF]" aria-hidden="true" />
                {t('hero.cta_secondary')}
              </button>
            </div>
          </section>

          {/* Right Image */}
          <div className="relative w-full aspect-4/3 lg:aspect-auto lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="/hero_image.jpg"
              alt="AI Trading Analytics"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Bottom Banner Section */}
        <div className="w-full pt-12 text-left">
          <Typography variant="h5" className="text-[#00D094] uppercase tracking-wider mb-4">
            {t('banner.title')}
          </Typography>
          <Typography variant="p" className="pr-0 md:pr-24">
            {t('banner.description')}
          </Typography>
        </div>
      </div>
    </SectionWrapper>
  );
}
