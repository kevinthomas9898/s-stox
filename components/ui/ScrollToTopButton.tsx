'use client';

import { useState, useEffect } from 'react';
import { FaChevronUp } from "react-icons/fa";
import { Button } from '@/components/ui/button';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 z-50 bg-[#00D094] hover:bg-[#00c985] text-gray-900 w-12 h-12 rounded-md transition-colors shadow-lg border-0"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <FaChevronUp className="w-5 h-5 shrink-0" />
    </Button>
  );
}
