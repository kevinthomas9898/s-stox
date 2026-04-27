import Image from "next/image";
import { Typography } from "@/components/ui/typography";
import { PrimaryBTN } from "@/components/ui/PrimaryBTN";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function FurtherReadingContentSection() {
  return (
    <SectionWrapper className="pt-36 pb-20 mx-auto">
      <Typography variant="h2" className="text-center mb-16">
        Further <span className="text-[#2A73EA]">Reading</span>
      </Typography>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-1 space-y-8">
          <Typography variant="h3" className="leading-tight">
            Could Automation Truly Make You Rich?
          </Typography>

          <div className="space-y-6">
            <Typography variant="p" className="text-gray-400">
              It&apos;s one of the most provocative questions in modern finance. We live in a world where algorithms trade billions in milliseconds, hedge funds rely on quantitative models, and artificial intelligence processes more data in a second than a human could in a lifetime. So naturally the question arises:
            </Typography>
            <Typography variant="p" className="text-gray-400">
              The honest answer is nuanced. Automation alone will not make you rich. But structured, supervised, risk-governed automation just might.
            </Typography>
          </div>

          <PrimaryBTN className="w-auto px-6 text-sm">
            Apply To Become A SmartStox Partner
          </PrimaryBTN>
        </div>

        <div className="lg:col-span-1">
          <div className="relative w-full aspect-16/10 rounded-lg overflow-hidden">
            <Image
              src="/Further_Reading.png"
              alt="Trading automation concept showing stock charts on phone and monitor"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-28 space-y-3">
        <Typography variant="h3" className="leading-tight">
          The Myth of <span className="text-[#10D078]">“Push-Button Wealth”</span>
        </Typography>
        <Typography variant="p" className="text-white/80">
          There is a dangerous narrative circulating in financial markets — that you can switch on a trading bot, sit back, and watch capital multiply effortlessly. That narrative collapses for one simple reason: Markets evolve.
        </Typography>

        <Typography variant="p" className="text-white/80">
          An automated strategy that works in trending markets may fail in range-bound conditions. A model optimized for low volatility may struggle when volatility expands. Liquidity events, macro shocks, and structural shifts continuously reshape the playing field.
        </Typography>

        <Typography variant="p" className="text-white/80">
          Unsupervised automation decays.
        </Typography>

        <Typography variant="p" className="text-white/80">
          It doesn&apos;t usually fail overnight. It underperforms gradually. Small inefficiencies compound. Risk exposure drifts. By the time investors react, damage is already embedded. Automation without governance is fragile. Wealth cannot be built on fragility.
        </Typography>
      </div>
    </SectionWrapper>
  );
}
