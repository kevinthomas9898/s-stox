import { BrandAmbassadorProgram } from "@/components/sections/AmbassadorsPage/BrandAmbassadorProgram";
import { CommissionProgramSection } from "@/components/sections/AmbassadorsPage/CommissionProgramSection";
import { HowItWorksSection } from "@/components/sections/AmbassadorsPage/HowItWorksSection";
import { WhoThisIsForSection } from "@/components/sections/AmbassadorsPage/WhoThisIsForSection";
import { AmbassadorApplicationSection } from "@/components/sections/AmbassadorsPage/AmbassadorApplicationSection";
import { AmbassadorEarningsSection } from "@/components/sections/AmbassadorsPage/AmbassadorEarningsSection";
import { WhyPaySection } from "@/components/sections/AmbassadorsPage/WhyPaySection";
import { FadeIn } from "@/components/animations";

export default function AmbassadorsPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] relative">
      <div className="gradient-overlay" />

      <FadeIn direction="up" duration={0.6}>
        <BrandAmbassadorProgram />
      </FadeIn>

      <FadeIn direction="left" delay={0.3}>
        <CommissionProgramSection />
      </FadeIn>

      <FadeIn direction="right" delay={0.3}>
        <WhoThisIsForSection />
      </FadeIn>

      <FadeIn direction="left" delay={0.3}>
        <HowItWorksSection />
      </FadeIn>

      <FadeIn direction="right" delay={0.3}>
        <AmbassadorApplicationSection />
      </FadeIn>

      <FadeIn direction="left" delay={0.3}>
        <AmbassadorEarningsSection />
      </FadeIn>

      <FadeIn direction="up" delay={0.3}>
        <WhyPaySection />
      </FadeIn>
    </main>
  );
}
