import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Typography } from "@/components/common/typography";
import { SectionWrapper } from "@/components/common/SectionWrapper";

export default async function ProvenPerformanceSection() {
  const t = await getTranslations("features");

  return (
    <SectionWrapper className="py-24 bg-[#0F131C]">
      <div className="flex flex-col items-center text-center space-y-12 mx-4 lg:mx-16">

        <Typography variant="h3">
          {t("tested_proven.title_part1")}{" "}
          <span className="text-[#0066FF]">{t("tested_proven.title_part2")}</span>
        </Typography>

        <div className="relative w-full max-w-5xl aspect-video md:aspect-21/9 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <Image src="/Tested-Proven-Winning.png" alt="" fill className="object-cover" />
        </div>

        <Typography variant="p" className="text-gray-300 text-lg max-w-5xl">
          {t("tested_proven.description")}
        </Typography>
      </div>
    </SectionWrapper>
  );
}