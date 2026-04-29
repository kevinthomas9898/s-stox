"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Typography } from '@/components/common/typography';
import { useTranslations } from "next-intl";
import { useState } from 'react';

export default function FAQSection() {
  const t = useTranslations('faq');
  const [showAll, setShowAll] = useState(false);

  const faqs = [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
    q: t(`q${i}` as `q${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`),
    a: t(`a${i}` as `a${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`)
  }));

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <div className="w-full py-24 bg-[#0b0f19]" id='faq-section-block'>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <Typography variant="h3" className="text-white mb-12">
          {t('title_part1')} <span className="text-[#0066FF]">{t('title_part2')}</span>
        </Typography>

        <Accordion className="w-full max-w-3xl space-y-4">
          {visibleFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-white/10 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer hover:bg-white/5 transition-colors hover:no-underline **:data-[slot=accordion-trigger-icon]:text-white **:data-[slot=accordion-trigger-icon]:size-6">
                <Typography variant="h5" className="text-xl font-normal">{faq.q}</Typography>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                <Typography variant="p" className="text-sm text-gray-400">{faq.a}</Typography>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {!showAll && faqs.length > 5 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-6 text-[#00D094] hover:text-[#00D094]/80 underline underline-offset-4 text-sm font-medium transition-colors"
          >
            {t('show_more') || 'Show more'}
          </button>
        )}
      </div>
    </div>
  );
}
