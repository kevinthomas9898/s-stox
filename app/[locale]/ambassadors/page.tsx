import { BrandAmbassadorProgram } from "@/components/sections/AmbassadorsPage/BrandAmbassadorProgram";
import { CommissionProgramSection } from "@/components/sections/AmbassadorsPage/CommissionProgramSection";
import { HowItWorksSection } from "@/components/sections/AmbassadorsPage/HowItWorksSection";
import { WhoThisIsForSection } from "@/components/sections/AmbassadorsPage/WhoThisIsForSection";
import { AmbassadorApplicationSection } from "@/components/sections/AmbassadorsPage/AmbassadorApplicationSection";
import { AmbassadorEarningsSection } from "@/components/sections/AmbassadorsPage/AmbassadorEarningsSection";
import { WhyPaySection } from "@/components/sections/AmbassadorsPage/WhyPaySection";

export default function AmbassadorsPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] relative">
      <div className="gradient-overlay" />
      <BrandAmbassadorProgram />
      <CommissionProgramSection />
      <WhoThisIsForSection />
      <HowItWorksSection />
      <AmbassadorApplicationSection />
      <AmbassadorEarningsSection />
      <WhyPaySection />
    </main>
  );
}
