import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Typography } from "@/components/common/typography";
import { SectionWrapper } from "@/components/common/SectionWrapper";

export default async function ManualVsAutomatedTradingSection() {
  const t = await getTranslations("features");

  return (
    <SectionWrapper className="bg-[#191F29] py-32 border-y border-white/5">
      <div className="mx-4 lg:mx-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="grid grid-cols-2 gap-4">
          {[["/stress.jpg", t("manual_trading.img_before")], ["/happy.jpg", t("manual_trading.img_after")]].map(([src, label], i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <Image src={src} alt="" fill className="object-cover" />
              </div>
              <div className="text-right text-xs font-bold uppercase italic bg-linear-to-r from-[#2A73EA] via-[#2A73EA] to-[#90D75B] bg-clip-text text-transparent">
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <Typography variant="h3">
            {t("manual_trading.title_part1")}{" "}
            <span className="text-[#0066FF]">{t("manual_trading.title_part2")}</span>
            <br />
            {t("manual_trading.title_part3")}
          </Typography>

          <Typography variant="h5" className="text-gray-300 font-normal">
            {t("manual_trading.subtitle")}
          </Typography>

          <Typography variant="p" className="text-gray-200">
            {t("manual_trading.description")}
          </Typography>
        </div>
      </div>
    </SectionWrapper>
  );
}