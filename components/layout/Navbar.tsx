'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa6';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

export default function Navbar() {
  const t = useTranslations('nav');
  const common = useTranslations('common');
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/pricing', label: t('pricing') },
    { href: '/', label: t('ambassadors') },
    { href: '/', label: t('faqs') },
  ];

  const moreMenuItems = [
    { href: '/wealth-creation', label: t('wealthCreation') },
    { href: '/fractional-capital', label: t('fractionalCapital') },
    { href: '/media-library', label: t('mediaLibrary') },
    { href: '/further-reading', label: t('furtherReading') },
  ];

  return (
    <header className="absolute top-0 w-full z-50 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 relative z-50">
          <Image
            src="/logo-icon.png"
            alt="AI Trading Analytics"
            width={60}
            height={60}
            className="object-cover relative"
            priority
          />
          <span className="text-xl font-semibold text-white">
            {common('appName')}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-10 text-lg font-medium items-center">
          {navLinks.map((link, i) => (
            <Link key={i} href={link.href} className="text-white hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-white hover:text-primary transition-colors cursor-pointer group outline-none">
              <span>{t('more')}</span>
              <svg
                className="w-4 h-4 text-white group-hover:text-primary transition-colors transform group-data-[state=open]:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-[#FFFFFF0F] backdrop-blur-md border-white/10">
              {moreMenuItems.map((item, i) => (
                <DropdownMenuItem key={i} className="p-0">
                  <Link
                    href={item.href}
                    className="block w-full px-3 py-2 text-sm text-gray-300 hover:text-primary hover:bg-white/[0.08] focus:bg-white/[0.08] focus:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-4">
          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/"
              className="text-sm font-medium px-6 py-2 rounded-full bg-[#FFFFFF1A] text-white hover:bg-[#FFFFFF2A] transition-colors"
            >
              {t('login')}
            </Link>
            <Link
              href="/"
              className="text-sm font-medium px-6 py-2 rounded-full bg-[#2A73EA] text-white hover:bg-[#1a5fc7] transition-colors"
            >
              {t('signup')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              className="lg:hidden p-2 text-white hover:text-primary transition-colors relative z-50 cursor-pointer"
              aria-label="Toggle menu"
            >
              <FaBars className="w-7 h-7" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-96 bg-[#0b0f19] border-white/10 p-0" showCloseButton={false}>
              <SheetHeader className="pt-24 px-6">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-6 px-6">
                {navLinks.map((link, i) => (
                  <Link 
                    key={i} 
                    href={link.href} 
                    className="text-2xl font-semibold text-white hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="text-2xl font-semibold text-white hover:text-primary transition-colors cursor-pointer">
                  {t('more')}
                </div>
              </nav>
              
              <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/10 px-6">
                <Link
                  href="/"
                  className="w-full text-center text-lg font-medium px-6 py-3 rounded-xl bg-[#FFFFFF1A] text-white hover:bg-[#FFFFFF2A] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t('login')}
                </Link>
                <Link
                  href="/"
                  className="w-full text-center text-lg font-medium px-6 py-3 rounded-xl bg-[#2A73EA] text-white hover:bg-[#1a5fc7] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {t('signup')}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
