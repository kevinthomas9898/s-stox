import { useTranslations } from 'next-intl';
import { FaCircleCheck, FaArrowRight } from 'react-icons/fa6';

export default function BottomCTASection() {
  const t = useTranslations('cta');

  const features = [
    { text: "No Simulations" },
    { text: "Watch Real Performance Logic Trade & Grow" },
    { text: "Experience Disciplined Automation" }
  ];

  return (
    <div className="w-full py-24 bg-[#0b0f19] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#00D094] rounded-[2rem] p-8 md:p-14 lg:p-20 shadow-[0_20px_80px_rgba(0,208,148,0.25)]">
          <div className="max-w-5xl space-y-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full border border-black/5 whitespace-nowrap">
              <span className="text-gray-900 font-bold text-sm md:text-base">
                Experience SmartStox Risk-Free for
              </span>
              <span className="bg-[#3b82f6] text-white px-3 py-0.5 rounded-md font-bold text-sm italic">
                3 Months
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl lg:text-[64px] font-bold text-white tracking-tight leading-tight">
                See. Believe. Decide.
              </h2>
              <p className="text-gray-900 font-medium text-lg md:text-xl leading-relaxed max-w-2xl opacity-80">
                For just $250 per month, step into a 3-month SmartStox experience where our AI trades a personalised demo portfolio exactly as it would a live account.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-white rounded-lg p-2 shrink-0">
                    <FaCircleCheck className="w-5 h-5 text-[#00D094]" />
                  </div>
                  <p className="text-gray-900 font-bold text-sm md:text-base leading-snug">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Full-width Divider & Text */}
            <div className="pt-8 space-y-10">
              <p className="text-white font-bold text-xs md:text-sm tracking-[0.15em] uppercase border-t border-white/20 pt-8">
                INVEST WITH CONFIDENCE. LIVE WITH FREEDOM. CHOOSE SMARTSTOX FOR PROVEN PERFORMANCE.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-8 md:px-10 py-4 rounded-xl font-bold transition-all cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-base whitespace-nowrap">
                  Start My Risk-Free Trial Now
                </button>
                <button className="border-2 border-white/40 hover:border-white text-white px-8 md:px-10 py-4 rounded-xl font-bold transition-all cursor-pointer hover:bg-white/5 text-base whitespace-nowrap">
                  Referral Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
