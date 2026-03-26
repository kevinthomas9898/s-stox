'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

export default function FAQSection() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [1, 2, 3, 4, 5].map(i => ({
    q: t(`q${i}` as any),
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }));

  return (
    <div className="w-full py-24 bg-[#0b0f19]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-semibold tracking-[0.02em] text-white leading-[1.6] mb-12 text-center">
          {t('title_part1')} <span className="text-[#0066FF]">{t('title_part2')}</span>
        </h2>

        <div className="w-full max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-white/10 rounded-lg bg-[#0d1627] overflow-hidden transition-all"
            >
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-gray-300 font-normal text-xl">{faq.q}</span>
                {openIndex === index ? (
                  <FaChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
                ) : (
                  <FaChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
