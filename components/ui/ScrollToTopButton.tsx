'use client';

import { FaChevronUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  return (
    <button 
      className="absolute top-1/12 right-0 bg-[#00D094] hover:bg-[#00c985] text-gray-900 w-10 h-10 flex items-center justify-center rounded-md transition-colors shadow-lg cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <FaChevronUp className="w-3 h-3 shrink-0" />
    </button>
  );
}
