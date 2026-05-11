import HeroSection from '@/components/sections/HomePage/HeroSection';
import TestimonialsSection from '@/components/sections/Common/TestimonialsSection';
import { WhyChooseSmartStoxSection } from '@/components/sections/HomePage/WhyChooseSmartStoxSection';
import AiLearningSection from '@/components/sections/HomePage/AiLearningSection';
import ManualVsAutomatedTradingSection from '@/components/sections/HomePage/ManualVsAutomatedTradingSection';
import TimeInMarketVsTimingSection from '@/components/sections/HomePage/TimeInMarketVsTimingSection';
import SetAndForgetMythSection from '@/components/sections/HomePage/SetAndForgetMythSection';
import ProvenPerformanceSection from '@/components/sections/HomePage/ProvenPerformanceSection';
import { FadeIn } from '@/components/animations';

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen bg-[#0b0f19] overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className='gradient-overlay' />

      <FadeIn direction="up" duration={0.6}>
        <HeroSection />
      </FadeIn>

      <FadeIn direction="left" delay={0.2}>
        <WhyChooseSmartStoxSection />
      </FadeIn>

      <FadeIn direction="right" delay={0.2}>
        <AiLearningSection />
      </FadeIn>

      <FadeIn direction="left" delay={0.2}>
        <ManualVsAutomatedTradingSection />
      </FadeIn>

      <FadeIn direction="right" delay={0.2}>
        <TimeInMarketVsTimingSection />
      </FadeIn>

      <FadeIn direction="left" delay={0.2}>
        <SetAndForgetMythSection />
      </FadeIn>

      <FadeIn direction="right" delay={0.2}>
        <ProvenPerformanceSection />
      </FadeIn>

      <FadeIn direction="up" delay={0.2}>
        <TestimonialsSection />
      </FadeIn>
    </div>
  );
}
