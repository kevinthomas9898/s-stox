"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "@/hooks/useAuth";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default function Navbar() {
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const { logout: handleLogout, isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const isActive = (href: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(en|fr)/, "");
    const normalizedPath = pathWithoutLocale || "/";

    if (href === "/") {
      return normalizedPath === "/";
    }
    return normalizedPath === href || normalizedPath.startsWith(`${href}/`);
  };

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/our-strategy", label: t("ourStrategy") },
    { href: "/pricing", label: t("pricing") },
    { href: "/ambassadors", label: t("ambassadors") },
    { href: "/faqs", label: t("faqs") },
  ];

  const moreMenuItems = [
    { href: "/venture-capital", label: t("ventureCapital") },
    { href: "/media-library", label: t("mediaLibrary") },
    { href: "/further-reading", label: t("furtherReading") },
  ];

  return (
    <header className="absolute top-0 w-full z-50 bg-transparent">
      <SectionWrapper containerClassName="h-20 flex items-center justify-between">
        {/* Logo */}
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
            {common("appName")}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex gap-10 text-lg font-medium items-center">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={`transition-colors ${
                isActive(link.href)
                  ? "text-[#00D094] font-semibold"
                  : "text-white hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Desktop More Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-white hover:text-primary transition-colors cursor-pointer group outline-none">
              <span>{t("more")}</span>
              <IoIosArrowDown className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="w-56 bg-[#FFFFFF0F] backdrop-blur-md border-white/10"
            >
              {moreMenuItems.map((item, i) => (
                <DropdownMenuItem key={i} className="p-0">
                  <Link
                    href={item.href}
                    className={`block w-full px-3 py-2 text-sm transition-colors ${
                      isActive(item.href)
                        ? "text-[#00D094] font-semibold bg-white/10"
                        : "text-gray-300 hover:text-primary hover:bg-white/8"
                    }`}
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-4">
          {/* Desktop Auth */}
          <div className="hidden xl:flex items-center gap-3">
            {isLoading ? null : isAuthenticated ? (
              <button
                onClick={() => handleLogout()}
                className="text-sm font-medium px-6 py-2 rounded-full bg-[#2A73EA] text-white hover:bg-[#1a5fc7] transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium px-6 py-2 rounded-full bg-[#FFFFFF1A] text-white hover:bg-[#FFFFFF2A] transition-colors"
                >
                  {t("login")}
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium px-6 py-2 rounded-full bg-[#2A73EA] text-white hover:bg-[#1a5fc7] transition-colors"
                >
                  {t("signup")}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              className="xl:hidden p-2 text-white hover:text-primary transition-colors relative z-50 cursor-pointer"
              aria-label="Toggle menu"
            >
              <FaBars className="w-7 h-7" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full sm:w-96 bg-[#0b0f19] border-white/10 p-0"
              showCloseButton={false}
            >
              <SheetHeader className="pt-24 px-6">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col space-y-6 px-6">
                {/* Main Links */}
                {navLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className={`text-2xl font-semibold transition-colors ${
                      isActive(link.href)
                        ? "text-[#00D094]"
                        : "text-white hover:text-primary"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile More Section */}
                <div>
                  <div
                    onClick={() => setShowMore((prev) => !prev)}
                    className="text-2xl font-semibold text-white hover:text-primary transition-colors cursor-pointer flex items-center justify-between"
                  >
                    {t("more")}
                    <IoIosArrowDown
                      className={`w-5 h-5 transition-transform ${showMore ? "rotate-180" : ""}`}
                    />
                  </div>

                  {showMore && (
                    <div className="flex flex-col ml-4 mt-4 space-y-4">
                      {moreMenuItems.map((item, i) => (
                        <Link
                          key={i}
                          href={item.href}
                          className={`text-lg transition-colors ${
                            isActive(item.href)
                              ? "text-[#00D094] font-semibold"
                              : "text-gray-300 hover:text-primary"
                          }`}
                          onClick={() => {
                            setIsOpen(false);
                            setShowMore(false);
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </nav>

              {/* Auth Buttons */}
              <div className="flex flex-col gap-4 pt-8 mt-8 border-t border-white/10 px-6">
                {isLoading ? null : isAuthenticated ? (
                  <button
                    onClick={async () => {
                      await handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-center text-lg font-medium px-6 py-3 rounded-xl bg-[#2A73EA] text-white hover:bg-[#1a5fc7] transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="w-full text-center text-lg font-medium px-6 py-3 rounded-xl bg-[#FFFFFF1A] text-white hover:bg-[#FFFFFF2A] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("login")}
                    </Link>
                    <Link
                      href="/register"
                      className="w-full text-center text-lg font-medium px-6 py-3 rounded-xl bg-[#2A73EA] text-white hover:bg-[#1a5fc7] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {t("signup")}
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </SectionWrapper>
    </header>
  );
}

