'use client';

import { useEffect, useState } from 'react';
import { VentureCapitalProjectsSection } from '@/components/sections/VentureCapitalProjectsSection';
import { EcosystemGridSection } from '@/components/sections/EcosystemGridSection';
import TrialSection from '@/components/sections/TrialSection';
import RegistrationStepsSection from '@/components/sections/RegistrationStepsSection';

export default function FractionalCapitalClient() {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = window.innerHeight * 4;

      const opacity = Math.max(
        0,
        1 - (scrollY - fadeStart) / (fadeEnd - fadeStart)
      );

      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19]">
      <div
        className="fixed inset-0 bg-linear-to-r from-blue-900/40 via-transparent to-transparent pointer-events-none"
        style={{ opacity: scrollOpacity }}
      />
      <VentureCapitalProjectsSection />
      <EcosystemGridSection />
      <TrialSection />
      <RegistrationStepsSection />
    </div>
  );
}