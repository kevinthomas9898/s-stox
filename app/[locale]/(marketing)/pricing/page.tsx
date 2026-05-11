import { PricingTermsSection } from "@/components/sections/PricingPage/PricingTermsSection";
import { PricingDetailsSection } from "@/components/sections/PricingPage/PricingDetailsSection";
import { FadeIn } from "@/components/animations";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19]">
      <div className='gradient-overlay' />
      {/* animate fade */}
      <FadeIn direction="down" duration={0.6}>
        <PricingTermsSection />
      </FadeIn>
      <FadeIn direction="up" delay={0.3}>
        <PricingDetailsSection />
      </FadeIn>
    </main>
  );
}
