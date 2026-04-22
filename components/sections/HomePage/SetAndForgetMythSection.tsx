import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Typography } from "@/components/ui/typography";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default async function SetAndForgetMythSection() {
  const t = await getTranslations("features");

  return (
    <SectionWrapper className="bg-[#FFFFFF0A] py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mx-4 lg:mx-16">

        <div className="space-y-20">
          <div className="space-y-5">
            <Typography variant="h3">
              {t("set_and_forget.title_part1")}{" "}
              <span className="text-[#0066FF]">{t("set_and_forget.title_part2")}</span>{" "}
              {t("set_and_forget.title_part3")}
            </Typography>

            <Typography variant="h5">
              {t("set_and_forget.subtitle")}
            </Typography>
          </div>

          <Typography variant="p">{t("set_and_forget.description1")}</Typography>
          <Typography variant="p">{t("set_and_forget.description2")}</Typography>
        </div>

        <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <Image src="/Set-and-Forget.jpg" alt="" fill className="object-cover" />
        </div>
      </div>
    </SectionWrapper>
  );
}