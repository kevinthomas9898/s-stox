import { FurtherReadingContentSection } from '@/components/sections/FurtherReadingPage/FurtherReadingContentSection';
import { TheSmartStoxDifference } from '@/components/sections/FurtherReadingPage/TheSmartStoxDifference';

export default function FurtherReadingPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] relative">
      <div className="gradient-overlay" />
      <FurtherReadingContentSection />
      <TheSmartStoxDifference />
    </main>
  );
}
