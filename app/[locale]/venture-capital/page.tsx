import { VentureCapitalProjectsSection } from '@/components/sections/VentureCapital/VentureCapitalProjectsSection';
import { EcosystemGridSection } from '@/components/sections/VentureCapital/EcosystemGridSection';
import { FadeIn } from '@/components/animations';

export default function VentureCapitalClientPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] relative">
      <div className="gradient-overlay" />
      <FadeIn direction="up" duration={0.6}>
        <VentureCapitalProjectsSection />
      </FadeIn>
      <FadeIn direction="left" delay={0.3}>
        <EcosystemGridSection />
      </FadeIn>
    </div>
  );
}