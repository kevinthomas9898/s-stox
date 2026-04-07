import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export default function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <div className="w-full relative bg-[#0b0f19]">
      {/* Background gradient edge on the left */}
      <div className="absolute top-0 left-0 w-[30%] lg:w-[40%] h-full bg-linear-to-r from-blue-900/30 to-transparent pointer-events-none" />

      {/* Feature 1 & 2 Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32 relative z-10">
        {/* Feature 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with Badge */}
          <div className="relative">
            {/* Glassmorphic Badge */}
            <div className="absolute -top-10 left-[-10px] sm:left-[-20px] lg:-left-12 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-48">
              <Typography variant="h5" className="text-white">
                {t("why_choose.badge_title")}
              </Typography>
              <Typography variant="p" className="text-xs! text-gray-300 mt-1">
                {t("why_choose.badge_subtitle")}
              </Typography>
            </div>

            <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/feature_why_choose.jpg"
                alt="AI Robot Trading"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <Typography variant="h3" className="text-white text-left">
              {t("why_choose.title_part1")}{" "}
              <span className="text-[#0066FF]">
                {t("why_choose.title_part2")}
              </span>
            </Typography>
            <Typography variant="h5" className="text-white text-left">
              {t("why_choose.subtitle")}
            </Typography>
            <Typography variant="p" className="text-gray-300 text-left">
              {t("why_choose.description")}
            </Typography>
            <div className="flex justify-start">
              <Button 
                className="mt-4 bg-[#00D094] hover:bg-[#00c985] text-gray-900 px-8 py-3 rounded-md font-semibold transition-colors cursor-pointer shadow-lg border-0"
              >
                {t("why_choose.cta")}
              </Button>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <Typography variant="h3" className="text-white text-left">
              {t("ai_learning.title_part1")} <br />{" "}
              <span className="text-[#0066FF]">
                {t("ai_learning.title_part2")}
              </span>
            </Typography>
            <Typography variant="p" className="text-gray-300 text-left">
              {t("ai_learning.description")}
            </Typography>
          </div>

          {/* Right: Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/feature_ai_learning.jpg"
                alt="AI Trading Analytics on Laptop"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Manual Trading Failures Section: EDGE TO EDGE BACKGROUND */}
      <div className="w-full bg-[#191F29] py-32 relative z-10 border-y border-white/5">
        <div className="mx-4 lg:mx-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Two Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="/stress.jpg"
                    alt="Before SmartStox"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-right font-bold text-xs uppercase tracking-wider bg-linear-to-r from-[#2A73EA] via-[#2A73EA] to-[#90D75B] bg-clip-text text-transparent italic">
                  {t("manual_trading.img_before")}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="/happy.jpg"
                    alt="After SmartStox"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-right font-bold text-xs uppercase tracking-wider bg-linear-to-r from-[#2A73EA] via-[#2A73EA] to-[#90D75B] bg-clip-text text-transparent italic">
                  {t("manual_trading.img_after")}
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-6">
              <Typography variant="h3" className="text-white text-left">
                {t("manual_trading.title_part1")}{" "}
                <span className="text-[#0066FF]">
                  {t("manual_trading.title_part2")}
                </span>{" "}
                <br /> {t("manual_trading.title_part3")}
              </Typography>
              <Typography variant="h5" className="text-gray-300 text-left">
                {t("manual_trading.subtitle")}
              </Typography>
              <Typography variant="p" className="text-gray-400 text-left">
                {t("manual_trading.description")}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Remaining Sections Container */}
      <div className="mx-auto py-24 space-y-32 relative z-10 bg-[#0F131C]">
        {/* Section: Time in vs Timing */}
        <div className="flex flex-col items-center text-center space-y-12 mx-4 lg:mx-16">
          <div className="space-y-4 max-w-3xl">
            <Typography variant="h3" className="text-white">
              <span className="text-[#0066FF]">
                {t("time_vs_timing.title_part1")}
              </span>{" "}
              {t("time_vs_timing.title_part2")}{" "}
              <span className="text-[#0066FF]">
                {t("time_vs_timing.title_part3")}
              </span>{" "}
              {t("time_vs_timing.title_part4")}
            </Typography>
            <Typography variant="h5" className="text-gray-300">
              {t("time_vs_timing.subtitle")}
            </Typography>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
            {/* Left Chart Image */}
            <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-[#0d1627]">
              <Image
                src="/time-in-market.png"
                alt="Time in the market"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            {/* Right Chart Image */}
            <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-[#0d1627]">
              <Image
                src="/time-the-market.png"
                alt="Timing the market"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed text-lg max-w-4xl">
            {t("time_vs_timing.description")}
          </p>
        </div>

        {/* Section: Set-and-Forget Myth */}
        <div className="bg-[#FFFFFF0A] py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mx-4 lg:mx-16">
            {/* Left: Content */}
            <div className="space-y-6">
              <Typography variant="h3" className="text-white text-start">
                {t("set_and_forget.title_part1")}{" "}
                <span className="text-[#0066FF]">
                  {t("set_and_forget.title_part2")}
                </span>{" "}
                {t("set_and_forget.title_part3")}
              </Typography>
              <Typography variant="h5" className="text-gray-300">
                {t("set_and_forget.subtitle")}
              </Typography>
              <Typography variant="p" className="text-gray-400">
                {t("set_and_forget.description1")}
              </Typography>
              <Typography variant="p" className="text-gray-400">
                {t("set_and_forget.description2")}
              </Typography>
            </div>

            {/* Right: Image */}
            <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/Set-and-Forget.jpg"
                alt="Set and forget myth"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Section: Tested Proven Winning */}
        <div className="flex flex-col items-center text-center space-y-12 mx-4 lg:mx-16">
          <Typography variant="h3" className="text-white">
            {t("tested_proven.title_part1")}{" "}
            <span className="text-[#0066FF]">
              {t("tested_proven.title_part2")}
            </span>
          </Typography>

          <div className="relative w-full max-w-5xl aspect-video md:aspect-21/9 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/Tested-Proven-Winning.jpg"
              alt="Tested proven winning"
              fill
              className="object-cover"
            />
          </div>

          <p className="text-gray-400 leading-relaxed text-lg max-w-4xl">
            {t("tested_proven.description")}
          </p>
        </div>
      </div>
    </div>
  );
}
