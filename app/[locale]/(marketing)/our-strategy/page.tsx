import FAQSection from '@/components/sections/OurStrategy/FAQSection';
import WealthStrategySection from '@/components/sections/OurStrategy/WealthStrategySection';
import AiDrivenTrading from '@/components/sections/OurStrategy/AiDrivenTrading';
import SmartStoxVirtualCard from '@/components/sections/OurStrategy/SmartStoxVirtualCard';
import OurBrokers from '@/components/sections/OurStrategy/OurBrokers';
import TransparentFeesSection from '@/components/sections/OurStrategy/TransparentFeesSection';
import MonitoringSection from '@/components/sections/OurStrategy/MonitoringSection';
import TreasuryManagementSection from '@/components/sections/OurStrategy/TreasuryManagementSection';
import WealthFrameworkSection from '@/components/sections/OurStrategy/WealthFrameworkSection';
import { FadeIn } from '@/components/animations';

export default function OurStrategyPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] relative">
      <div className="gradient-overlay" />
      
      <FadeIn direction="up" duration={0.6}>
        <WealthStrategySection />
      </FadeIn>
      <FadeIn direction="left" delay={0.3}>
        <WealthFrameworkSection />
      </FadeIn>
      <FadeIn direction="right" delay={0.3}>
        <AiDrivenTrading />
      </FadeIn>
      <FadeIn direction="left" delay={0.3}>
        <TreasuryManagementSection />
      </FadeIn>
      <FadeIn direction="right" delay={0.3}>
        <SmartStoxVirtualCard /> 
      </FadeIn>
      <FadeIn direction="left" delay={0.3}>
        <OurBrokers />
      </FadeIn>
      <FadeIn direction="right" delay={0.3}>
        <TransparentFeesSection />
      </FadeIn>
      <FadeIn direction="left" delay={0.3}>
        <MonitoringSection />
      </FadeIn>
      <FadeIn direction="up" delay={0.3}>
        <FAQSection />
      </FadeIn>
    </div>
  );
}
