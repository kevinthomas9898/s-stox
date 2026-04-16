import { PricingTermsSection } from "@/components/sections/PricingTermsSection";
import { PricingDetailsSection } from "@/components/sections/PricingDetailsSection";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19]">
      <PricingTermsSection />
      <PricingDetailsSection />
    </main>
  );
}
