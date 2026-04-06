'use client';

import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TrialSection from '@/components/sections/TrialSection';
import RegistrationStepsSection from '@/components/sections/RegistrationStepsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen bg-[#0b0f19] overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[20%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[20%] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      <HeroSection />

      <FeaturesSection />
      <TestimonialsSection />
      <TrialSection />
      <RegistrationStepsSection />
      {/* <BottomCTASection /> */}
    </div>
  );
}
