import { Typography } from "@/components/common/typography";
import { SectionWrapper } from "@/components/common/SectionWrapper";

const points = [
  "Maintain disciplined risk control",
  "Avoid catastrophic drawdowns",
  "Adapt to evolving market conditions",
  "Participate consistently in market cycles",
];

export function CanAutomationMakeYouRich() {
  return (
    <SectionWrapper className="py-20">
      <div className="mx-auto space-y-8">
        <Typography variant="h3" className="text-center">
          Can <span className="text-[#10D078]">Automation</span> Make You Rich?
        </Typography>

        <Typography variant="p" className="text-white/80">
          The better question is: Can structured, supervised automation compound capital consistently enough over time to create meaningful wealth? If a system can:
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {points.map((point, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-white/80 font-medium">{index + 1}.</span>
              <Typography variant="p" className="text-white/80">
                {point}
              </Typography>
            </div>
          ))}
        </div>

        <Typography variant="p" className="text-white/80">
          Then over time, compounding becomes powerful. Wealth rarely comes from explosive, short-lived performance. It comes from sustained, controlled growth. Small edges, applied consistently and protected rigorously, scale. SmartStox is engineered around that philosophy. Not hype. Not speculation. Not aggressive leverage. But structured participation governed by risk discipline.
        </Typography>

        <Typography variant="h3" className="text-center pt-8">
          The Real Lever: <span className="text-[#10D078]">Structure</span>
        </Typography>

        <Typography variant="p" className="text-white/80">
          Automation is a tool. Structure is the advantage. When automation operates within a governed framework - supervised by professionals and refined by data science - it becomes more than a trading bot. It becomes a capital system.
        </Typography>

        <Typography variant="p" className="text-white/80">
          The future of wealth creation will not belong to those chasing signals or predicting headlines. It will belong to those who build resilient systems and allow time and discipline to compound. So could automation truly make you rich?
        </Typography>

        <Typography variant="p" className="text-white/80">
          Unsupervised - unlikely. Structured, supervised, and governed - potentially transformative. In markets, the difference between speculation and wealth creation is architecture. And architecture determines outcomes.
        </Typography>
      </div>
    </SectionWrapper>
  );
}
