'use client';

import { useEffect, useState } from 'react';
import FAQSection from '@/components/sections/FAQSection';
import WealthStrategySection from '@/components/sections/WealthStrategySection';
import AiDrivenTrading from '@/components/sections/AiDrivenTrading';
import SmartStoxVirtualCard from '@/components/sections/SmartStoxVirtualCard';
import OurBrokers from '@/components/sections/OurBrokers';
import TransparentFeesSection from '@/components/sections/TransparentFeesSection';
import MonitoringSection from '@/components/sections/MonitoringSection';
import TreasuryManagementSection from '@/components/sections/TreasuryManagementSection';
import WealthFrameworkSection from '@/components/sections/WealthFrameworkSection';

export default function WealthCreationPage() {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = window.innerHeight * 4; // 400vh
      const opacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19] relative">
      <div 
        className="fixed inset-0 bg-linear-to-r from-blue-900/40 via-transparent to-transparent pointer-events-none"
        style={{ opacity: scrollOpacity }}
      />
      <WealthStrategySection />
      <WealthFrameworkSection />
      <AiDrivenTrading />
      <TreasuryManagementSection />
      <SmartStoxVirtualCard /> 
      <OurBrokers />
      <TransparentFeesSection />
      <MonitoringSection />
      <FAQSection />
    </div>
  );
}
