import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Typography } from "@/components/ui/typography";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const benefits = [
  {
    icon: "/high_upfront.svg",
    title: "High Upfront",
    subtitle: "Commission per Sale",
  },
  {
    icon: "/trade_profit_share.svg",
    title: "Ongoing Monthly Recurring",
    subtitle: "Trade Profit Share",
  },
  {
    icon: "/performance.svg",
    title: "Performance Bonus",
    subtitle: "Tiers",
  },
  {
    icon: "/earnings.svg",
    title: "No Cap on",
    subtitle: "Earnings",
  },
];

export async function CommissionProgramSection() {
  const t = await getTranslations("commissionProgram");

  return (
    <SectionWrapper
      className="py-16 md:py-24 bg-[#0b0f19] min-h-dvh"
      containerClassName="max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <Typography variant="h3" className="text-white">
          {t("title")}
        </Typography>
        <Typography variant="p" className="text-gray-400 mt-2">
          {t("subtitle")}
        </Typography>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-[#1a1d26] rounded-xl p-6 md:p-8 flex flex-col items-center text-center hover:bg-[#22262f] transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-[#2a2e3a] flex items-center justify-center mb-4">
              <Image
                src={benefit.icon}
                alt={benefit.title}
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <Typography variant="h5" className="text-white">
              {benefit.title}
            </Typography>
            <Typography variant="h4" className="text-gray-400 mt-1">
              {benefit.subtitle}
            </Typography>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
