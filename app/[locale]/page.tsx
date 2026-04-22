import HeroSection from '@/components/sections/HomePage/HeroSection';
import TestimonialsSection from '@/components/sections/Common/TestimonialsSection';
import { WhyChooseSmartStoxSection } from '@/components/sections/HomePage/WhyChooseSmartStoxSection';
import AiLearningSection from '@/components/sections/HomePage/AiLearningSection';
import ManualVsAutomatedTradingSection from '@/components/sections/HomePage/ManualVsAutomatedTradingSection';
import TimeInMarketVsTimingSection from '@/components/sections/HomePage/TimeInMarketVsTimingSection';
import SetAndForgetMythSection from '@/components/sections/HomePage/SetAndForgetMythSection';
import ProvenPerformanceSection from '@/components/sections/HomePage/ProvenPerformanceSection';

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen bg-[#0b0f19] overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className='gradient-overlay' />

      <HeroSection />
      <WhyChooseSmartStoxSection />
      <AiLearningSection />
      <ManualVsAutomatedTradingSection />
      <TimeInMarketVsTimingSection />
      <SetAndForgetMythSection />
      <ProvenPerformanceSection />
      <TestimonialsSection />
    </div>
  );
}
