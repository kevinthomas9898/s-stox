'use client';

import { usePathname } from 'next/navigation';
import TrialSection from '@/components/sections/Common/TrialSection';
import RegistrationStepsSection from '@/components/sections/Common/RegistrationStepsSection';
import Footer from '@/components/layout/Footer';

export default function AnimatedLayoutSections() {
  const pathname = usePathname();

  return (
    <>
      <div key={`trial-${pathname}`}>
        <TrialSection />
      </div>
      <div key={`steps-${pathname}`}>
        <RegistrationStepsSection />
      </div>
      <div key={`footer-${pathname}`}>
        <Footer />
      </div>
    </>
  );
}
