import { useTranslations } from 'next-intl';
import Image from 'next/image';

function QuoteIcon() {
  return (
    <svg className="w-8 h-8 text-[#00D094]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
    </svg>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');

  return (
    <div className="w-full py-24 bg-[#0b0f19]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        <div className="text-center space-y-4 mb-16 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-medium tracking-[0.02em] text-white leading-[1.6] text-center">
            {t('title_part1')} <span className="text-[#0066FF]">{t('title_part2')}</span>
          </h2>
          <h3 className="text-gray-400 text-sm md:text-lg leading-relaxed">
            {t('subtitle')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 flex flex-col justify-between shadow-xl relative min-h-[250px]">
            <p className="text-gray-600 text-[13px] md:text-base leading-relaxed mb-8">
              {t('quote1')}
            </p>
            <div className="flex items-center justify-between w-full mt-auto">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image src="/user-1.png" alt={t('name1')} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-base">{t('name1')}</h4>
                  <p className="text-gray-500 text-xs">{t('role1')}</p>
                </div>
              </div>
              <QuoteIcon />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 flex flex-col justify-between shadow-xl relative min-h-[250px]">
            <p className="text-gray-600 text-[13px] md:text-sm leading-relaxed mb-8">
              {t('quote2')}
            </p>
            <div className="flex items-center justify-between w-full mt-auto">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image src="/user-2.png" alt={t('name2')} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-sm">{t('name2')}</h4>
                  <p className="text-gray-500 text-xs">{t('role2')}</p>
                </div>
              </div>
              <QuoteIcon />
            </div>
          </div>
        </div>

        {/* Pagination Arrows */}
        <div className="flex items-center gap-4 mt-12">
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#00D094] hover:bg-gray-100 transition-colors cursor-pointer shadow-lg disabled:opacity-50" disabled>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-[#00D094] flex items-center justify-center text-white hover:bg-[#00c985] transition-colors cursor-pointer shadow-lg">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

      </div>
    </div>
  );
}
