import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Typography } from "@/components/ui/typography";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default async function AiLearningSection() {
  const t = await getTranslations("features");

  return (
    <SectionWrapper
      className="relative z-10 mb-36"
      containerClassName="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="space-y-6 order-2 lg:order-1">
          <Typography variant="h3">
            {t("ai_learning.title_part1")} <br />
            <span className="text-[#0066FF]">{t("ai_learning.title_part2")}</span>
          </Typography>

          <Typography variant="p" className="text-gray-300 max-w-xl">
            {t("ai_learning.description")}
          </Typography>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image src="/feature_ai_learning.jpg" alt="" fill className="object-cover" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}