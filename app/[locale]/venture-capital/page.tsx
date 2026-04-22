import { VentureCapitalProjectsSection } from '@/components/sections/VentureCapital/VentureCapitalProjectsSection';
import { EcosystemGridSection } from '@/components/sections/VentureCapital/EcosystemGridSection';

export default function VentureCapitalClientPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] relative">
      <div className="gradient-overlay" />
      <VentureCapitalProjectsSection />
      <EcosystemGridSection />
    </div>
  );
}