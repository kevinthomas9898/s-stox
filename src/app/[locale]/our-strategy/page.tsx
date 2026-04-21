import FAQSection from '@/components/sections/FAQSection';
import WealthStrategySection from '@/components/sections/WealthStrategySection';
import AiDrivenTrading from '@/components/sections/AiDrivenTrading';
import SmartStoxVirtualCard from '@/components/sections/SmartStoxVirtualCard';
import OurBrokers from '@/components/sections/OurBrokers';
import TransparentFeesSection from '@/components/sections/TransparentFeesSection';
import MonitoringSection from '@/components/sections/MonitoringSection';
import TreasuryManagementSection from '@/components/sections/TreasuryManagementSection';
import WealthFrameworkSection from '@/components/sections/WealthFrameworkSection';

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
