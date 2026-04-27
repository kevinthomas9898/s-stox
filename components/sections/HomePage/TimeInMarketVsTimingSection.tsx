import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Typography } from "@/components/common/typography";
import { SectionWrapper } from "@/components/common/SectionWrapper";

export default async function TimeInMarketVsTimingSection() {
  const t = await getTranslations("features");

  return (
    <SectionWrapper className="py-24 bg-[#0F131C]">
      <div className="flex flex-col items-center text-center space-y-12 mx-4 lg:mx-16">

        <div className="max-w-3xl">
          <Typography variant="h3">
            <span className="text-[#0066FF]">{t("time_vs_timing.title_part1")}</span>{" "}
            {t("time_vs_timing.title_part2")}{" "}
            <span className="text-[#0066FF]">{t("time_vs_timing.title_part3")}</span>{" "}
            {t("time_vs_timing.title_part4")}
          </Typography>

          <Typography variant="h5" className="text-gray-300 font-normal">
            {t("time_vs_timing.subtitle")}
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
          <Image src="/time-in-market.png" alt="" width={800} height={600} className="rounded-xl border border-white/10" />
          <Image src="/time-the-market.png" alt="" width={800} height={600} className="rounded-xl border border-white/10" />
        </div>

        <Typography variant="p" className="text-lg max-w-5xl">
          {t("time_vs_timing.description")}
        </Typography>
      </div>
    </SectionWrapper>
  );
}