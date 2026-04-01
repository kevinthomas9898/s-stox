'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
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

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  image: string;
}

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const [currentPage, setCurrentPage] = useState(0);

  // Data array - easy to replace with API response
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
                      <h4 className="text-gray-900 font-bold text-base">{item.name}</h4>
                      <p className="text-gray-500 text-xs">{item.role}</p>
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
          >
            <MdNavigateNext className="rotate-180 text-black text-xl" />
          </Button>
          <Button
            size="icon"
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
            className="w-10 h-10 rounded-full bg-[#00D094] hover:bg-[#00c985] border-0 shadow-lg disabled:opacity-50"
          >
            <MdNavigateNext className="text-black text-xl" />
          </Button>
        </div>

      </div>
    </div>
  );
}
