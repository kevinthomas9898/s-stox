import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa6';
import { AiOutlinePlayCircle } from "react-icons/ai";
import FeaturesSection from '@/components/sections/FeaturesSection';
import TrialSection from '@/components/sections/TrialSection';
import RegistrationStepsSection from '@/components/sections/RegistrationStepsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
// import BottomCTASection from '@/components/sections/BottomCTASection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  const t = await import(`@/messages/${locale}.json`).then(
    (module) => module.default,
  );

  return (
    <div className="relative w-full min-h-screen bg-[#0b0f19] overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[20%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[20%] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 md:pt-32 pb-16 md:pb-24">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-8 items-center mb-16 md:mb-32">
          {/* Left Content */}
          <section className="space-y-8 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-[0.02em] text-white leading-[1.2] text-center lg:text-left">
              {t.hero.title_part1}
              <br />
              {t.hero.title_part2}
              <br />
              <span className="text-[#0066FF]">{t.hero.title_part3}</span>
            </h1>
            
            <p className="text-xl md:text-xl text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 pt-2">
              <button className="flex items-center gap-2 bg-[#00D094] hover:bg-[#00c985] text-gray-900 px-8 py-3.5 rounded-md font-semibold transition-colors cursor-pointer shadow-[0_0_20px_rgba(0,229,153,0.3)]">
                {t.hero.cta_primary}
                <FaArrowRight className="w-4 h-4 font-bold" />
              </button>
              
              <button className="flex items-center gap-2 text-[#2A73EA] bg-transparent border border-[#2A73EA] hover:border-gray-400 px-8 py-3.5 rounded-md font-semibold transition-colors cursor-pointer">
                <AiOutlinePlayCircle className="w-5 h-5 text-[#2A73EA]" />
                {t.hero.cta_secondary}
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
            />
          </div>
        </div>

        {/* Bottom Banner Section */}
        <div className="w-full border-t border-white/5 pt-12 text-left">
          <h3 className="text-[#00D094] text-xl font-semibold uppercase tracking-wider mb-4">
            {t.banner.title}
          </h3>
          <p className="text-gray-300 text-sm md:text-lg leading-relaxed pr-16 md:pr-24">
            {t.banner.description}
          </p>

        </div>

      </div>

      <FeaturesSection />
      <TestimonialsSection />
      <TrialSection />
      <RegistrationStepsSection />
      {/* <BottomCTASection /> */}
    </div>
  );
}
