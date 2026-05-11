import { FurtherReadingContentSection } from '@/components/sections/FurtherReadingPage/FurtherReadingContentSection';
import { TheSmartStoxDifference } from '@/components/sections/FurtherReadingPage/TheSmartStoxDifference';
import { CanAutomationMakeYouRich } from '@/components/sections/FurtherReadingPage/CanAutomationMakeYouRich';
import { FadeIn } from "@/components/animations";
import { Knowledgebase } from '@/components/sections/FurtherReadingPage/Knowledgebase';

export default function FurtherReadingPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] relative">
      <div className="gradient-overlay" />
      <FadeIn direction="up" duration={0.6}>
        <FurtherReadingContentSection />
      </FadeIn>
      <FadeIn direction="left" delay={0.3}>
        <TheSmartStoxDifference />
      </FadeIn>
      <FadeIn direction="right" delay={0.3}>
        <CanAutomationMakeYouRich />
      </FadeIn>
      <Knowledgebase />
    </main>
  );
}
