import { VentureCapitalProjectsSection } from '@/components/sections/VentureCapitalProjectsSection';
import { EcosystemGridSection } from '@/components/sections/EcosystemGridSection';

export default function VentureCapitalClientPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] relative">
      <div className="gradient-overlay" />
      <VentureCapitalProjectsSection />
      <EcosystemGridSection />
    </div>
  );
}