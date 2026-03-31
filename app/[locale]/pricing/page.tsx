import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function PricingPage() {
  const t = useTranslations("pricing");
  const nav = useTranslations("nav");

  return (
    <div className="min-h-screen bg-[#0F131C] text-white pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-400">
            {t("subtitle")}
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="max-w-2xl mx-auto">
          <div className="relative p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden group text-center">
            {/* Gradient Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#0066FF]/20 blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#00D094]/10 blur-[80px]" />
            
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#0066FF]/10 border border-[#0066FF]/20 mb-4">
                <span className="text-[#0066FF] font-semibold tracking-wider uppercase text-sm">
                  {t("comingSoon")}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Something Big is Brewing
              </h2>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                We're fine-tuning our pricing plans to ensure you get the best value for your wealth growth journey.
              </p>
              <div className="pt-8">
                <Link
                  href="/"
                  className="inline-block py-4 px-10 rounded-xl bg-[#00D094] hover:bg-[#00c985] text-gray-900 font-bold transition-all shadow-[0_8px_32px_rgba(0,229,153,0.3)] hover:shadow-[0_8px_32px_rgba(0,229,153,0.5)] transform hover:-translate-y-1"
                >
                  {nav("home")}
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
