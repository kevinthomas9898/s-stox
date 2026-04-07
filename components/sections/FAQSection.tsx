'use client';

import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Typography } from '@/components/ui/typography';

export default function FAQSection() {
  const t = useTranslations('faq');

  const faqs = [1, 2, 3, 4, 5].map(i => ({
    q: t(`q${i}` as any),
    a: "TEST Lorem ipsum dolor sit amet, TEST consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }));

  return (
    <div className="w-full py-24 bg-[#0b0f19]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <Typography variant="h3" className="text-white mb-12">
          {t('title_part1')} <span className="text-[#0066FF]">{t('title_part2')}</span>
        </Typography>

        <Accordion className="w-full max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-white/10 rounded-lg bg-[#0d1627] overflow-hidden"
            >
              <AccordionTrigger className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer hover:bg-white/5 transition-colors hover:no-underline [&>svg]:text-gray-500 [&>svg]:w-4 [&>svg]:h-4 [&>svg]:shrink-0">
                <Typography variant="h5" className="text-gray-300 !text-xl !font-normal">{faq.q}</Typography>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                <Typography variant="p" className="!text-sm">{faq.a}</Typography>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
