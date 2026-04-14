import { BrandAmbassadorProgram } from "@/components/sections/BrandAmbassadorProgram";
import { CommissionProgramSection } from "@/components/sections/CommissionProgramSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { WhoThisIsForSection } from "@/components/sections/WhoThisIsForSection";

export default function AmbassadorsPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] relative">
      <div className="gradient-overlay" />
      <BrandAmbassadorProgram />
      <CommissionProgramSection />
      <WhoThisIsForSection />
      <HowItWorksSection />
    </main>
  );
}
