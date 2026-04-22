import { PricingTermsSection } from "@/components/sections/PricingPage/PricingTermsSection";
import { PricingDetailsSection } from "@/components/sections/PricingPage/PricingDetailsSection";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19]">
      <div className='gradient-overlay' />
      
      <PricingTermsSection />
      <PricingDetailsSection />
    </main>
  );
}
