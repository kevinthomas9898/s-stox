import Image from "next/image";
import { Check } from "lucide-react";
import { Typography } from "@/components/common/typography";
import { PrimaryBTN } from "@/components/common/PrimaryBTN";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { getTranslations } from "next-intl/server";

export async function BrandAmbassadorProgram() {
  const t = await getTranslations("brandAmbassador");

  const benefits = [
    t("benefits.0"),
    t("benefits.1"),
    t("benefits.2"),
  ];

  return (
    <SectionWrapper
      className="py-24 pt-32"
      containerClassName="mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <Typography variant="h2">
          {t("title").split("BRAND AMBASSADOR")[0]}
          <span className="text-[#2A73EA]">BRAND AMBASSADOR</span>
          {t("title").split("BRAND AMBASSADOR")[1]}
        </Typography>
        <Typography variant="p" className="text-white/80 mt-4 italic">
          {t("subtitle")}
        </Typography>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-16">
          <div>
            <Typography variant="h3">
              {t("heading")}
            </Typography>

            <Typography variant="p">
              {t("description")}
            </Typography>
          </div>

          {/* Benefits List */}
          <div className="space-y-4 pt-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="shrink-0 w-5 h-5 z-10 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
                <Typography variant="p">
                  {benefit}
                </Typography>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <PrimaryBTN className="w-fit px-10">{t("ctaButton")}</PrimaryBTN>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/brand_ambassadors_program.png"
              alt={t("title")}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
