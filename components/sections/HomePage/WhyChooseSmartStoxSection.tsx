import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function WhyChooseSmartStoxSection() {
  const t = useTranslations("features");

  return (
    <SectionWrapper
      className="relative z-10"
      containerClassName="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">

        <div className="relative">
          <div className="absolute -top-10 left-[-10px] sm:left-[-20px] lg:-left-12 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-48">
            <Typography variant="h4">{t("why_choose.badge_title")}</Typography>
            <Typography variant="p" className="text-xs! text-gray-300 mt-1">
              {t("why_choose.badge_subtitle")}
            </Typography>
          </div>

          <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image src="/feature_why_choose.jpg" alt="" fill className="object-cover" />
          </div>
        </div>

        <div className="space-y-6">
          <Typography variant="h3">
            {t("why_choose.title_part1")}{" "}
            <span className="text-[#0066FF]">{t("why_choose.title_part2")}</span>
          </Typography>

          <Typography variant="h4">{t("why_choose.subtitle")}</Typography>

          <Typography variant="p" className="text-gray-300 max-w-xl">
            {t("why_choose.description")}
          </Typography>

          <Button className="mt-4 bg-[#00D094] hover:bg-[#00c985] text-gray-900 px-8 py-3 rounded-md font-semibold shadow-lg">
            {t("why_choose.cta")}
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}