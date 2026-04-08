"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Typography } from "@/components/ui/typography";

interface ComingSoonProps {
  name: string;
  descriptionKey?: "defaultDescription" | "pricingDescription";
  showHomeButton?: boolean;
}

export function ComingSoon({
  name,
  descriptionKey = "defaultDescription",
  showHomeButton = true,
}: ComingSoonProps) {
  const t = useTranslations("common");
  const csp = useTranslations("comingSoonPage");
  const nav = useTranslations("nav");

  return (
    <div className="min-h-screen bg-[#0F131C] text-white pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <Typography variant="h1" className="text-4xl md:text-6xl font-bold tracking-tight">
            {name}
          </Typography>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden group text-center">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#0066FF]/20 blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#00D094]/10 blur-[80px]" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#0066FF]/10 border border-[#0066FF]/20 mb-4">
                <span className="text-[#0066FF] font-semibold tracking-wider uppercase text-sm">
                  {t("comingSoon")}
                </span>
              </div>
              <Typography variant="h3" className="text-white">
                {csp("heading")}
              </Typography>
              <Typography variant="p" className="text-gray-400 text-lg max-w-md mx-auto">
                {csp(descriptionKey)}
              </Typography>
              {showHomeButton && (
                <div className="pt-8">
                  <Link
                    href="/"
                    className="inline-block py-4 px-10 rounded-xl bg-[#00D094] hover:bg-[#00c985] text-gray-900 font-bold transition-all shadow-[0_8px_32px_rgba(0,229,153,0.3)] hover:shadow-[0_8px_32px_rgba(0,229,153,0.5)] transform hover:-translate-y-1"
                  >
                    {nav("home")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
