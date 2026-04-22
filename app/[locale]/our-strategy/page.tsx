import FAQSection from '@/components/sections/OurStrategy/FAQSection';
import WealthStrategySection from '@/components/sections/OurStrategy/WealthStrategySection';
import AiDrivenTrading from '@/components/sections/OurStrategy/AiDrivenTrading';
import SmartStoxVirtualCard from '@/components/sections/OurStrategy/SmartStoxVirtualCard';
import OurBrokers from '@/components/sections/OurStrategy/OurBrokers';
import TransparentFeesSection from '@/components/sections/OurStrategy/TransparentFeesSection';
import MonitoringSection from '@/components/sections/OurStrategy/MonitoringSection';
import TreasuryManagementSection from '@/components/sections/OurStrategy/TreasuryManagementSection';
import WealthFrameworkSection from '@/components/sections/OurStrategy/WealthFrameworkSection';

export default function OurStrategyPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] relative">
      <div className="gradient-overlay" />
      
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
