'use client';

import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen bg-[#0b0f19] overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className='gradient-overlay' />

      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
}
