'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Script from 'next/script';
import { MdNavigateNext } from "react-icons/md";
import { FaQuoteRight } from "react-icons/fa";
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/common/typography';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  image: string;
}

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');

  // ==========================================
  // ⚙️ TOGGLE SETTING: 
  // Set to 'true' once you have actual Trustpilot reviews.
  // When 'false', it shows the manual/static testimonials.
  // ==========================================
  const SHOW_TRUSTPILOT = false;

  const [currentPage, setCurrentPage] = useState(0);
  const trustBoxRef = useRef<HTMLDivElement>(null);

  // Data array for manual fallback testimonials
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: t('quote1'),
      name: t('name1'),
      role: t('role1'),
      image: '/user-1.png',
    },
    {
      id: 2,
      quote: t('quote2'),
      name: t('name2'),
      role: t('role2'),
      image: '/user-2.png',
    },
    {
      id: 3,
      quote: t('quote2'),
      name: t('name2'),
      role: t('role2'),
      image: '/user-2.png',
    },
    {
      id: 4,
      quote: t('quote1'),
      name: t('name1'),
      role: t('role1'),
      image: '/user-1.png',
    },
  ];

  const itemsPerPage = 2;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const paginatedItems = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(0, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1));

  useEffect(() => {
    if (SHOW_TRUSTPILOT && typeof window !== 'undefined' && (window as any).Trustpilot) {
      try {
        (window as any).Trustpilot.loadFromElement(trustBoxRef.current, true);
      } catch (error) {
        console.error('Error loading Trustpilot widget:', error);
      }
    }
  }, [SHOW_TRUSTPILOT]);

  return (
    <div className="w-full py-24 bg-[#0F131C]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        <div className="text-center space-y-4 mb-16 max-w-2xl">
          <Typography variant="h3">
            {t('title_part1')} <span className="text-[#0066FF]">{t('title_part2')}</span>
          </Typography>
          <Typography variant="p" className="!text-sm md:!text-lg text-gray-400">
            {t('subtitle')}
          </Typography>
        </div>

        {SHOW_TRUSTPILOT ? (
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-4 md:p-8 min-h-[250px] flex justify-center items-center relative border-0">
            {/* TrustBox widget - Review Carousel */}
            <div
              ref={trustBoxRef}
              className="trustpilot-widget w-full"
              data-locale="en-US"
              data-template-id="53aa8912dec7e10d38f59f36"
              data-businessunit-id={process.env.NEXT_PUBLIC_TRUSTPILOT_ID}
              data-style-height="140px"
              data-style-width="100%"
              data-theme="light"
              data-stars="4,5"
              data-review-languages="en"
            >
              <a
                href="https://www.trustpilot.com/review/www.smartstoxglobal.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trustpilot
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
              {paginatedItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-white rounded-2xl p-0 shadow-xl relative min-h-[250px] border-0"
                >
                  <CardContent className="p-8 lg:p-10 flex flex-col justify-between h-full">
                    <p className="text-gray-600 text-[13px] md:text-base leading-relaxed mb-8">
                      {item.quote}
                    </p>
                    <div className="flex items-center justify-between w-full mt-auto">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={item.image} alt={item.name} />
                          <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <Typography variant="h5" className="text-gray-900 !text-base !font-bold">{item.name}</Typography>
                          <Typography variant="p" className="!text-xs !text-gray-500">{item.role}</Typography>
                        </div>
                      </div>
                      <FaQuoteRight className="text-[#00D094] text-4xl" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination Arrows */}
            <div className="flex items-center gap-4 mt-12">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                disabled={currentPage === 0}
                className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 border-0 shadow-lg disabled:opacity-50"
                aria-label="Previous testimonials"
              >
                <MdNavigateNext className="rotate-180 text-black text-xl" aria-hidden="true" />
              </Button>
              <Button
                size="icon"
                onClick={handleNext}
                disabled={currentPage >= totalPages - 1}
                className="w-10 h-10 rounded-full bg-[#00D094] hover:bg-[#00c985] border-0 shadow-lg disabled:opacity-50"
                aria-label="Next testimonials"
              >
                <MdNavigateNext className="text-black text-xl" aria-hidden="true" />
              </Button>
            </div>
          </>
        )}

      </div>

      {/* Load Trustpilot Bootstrap Script statically for the widget */}
      <Script
        type="text/javascript"
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
