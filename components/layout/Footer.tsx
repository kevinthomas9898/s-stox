'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ComponentType } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa6';
import { Typography } from '@/components/common/typography';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

interface SocialLink {
  name: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
}

export default function Footer() {
  const t = useTranslations('footer');

  const socialLinks: SocialLink[] = [
    { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com' },
    { name: 'YouTube', icon: FaYoutube, href: 'https://youtube.com' },
  ];

  return (
    <footer className="w-full bg-[#0d1117] pt-20 pb-8 text-white relative overflow-hidden">
      <SectionWrapper>
        <Image
          src="/span.footer__shape-item.svg"
          alt="Footer shape"
          width={1250}
          height={1250}
          className="absolute -top-30 -left-130 pointer-events-none select-none"
        />
        {/* Top Grid */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand & Description Column */}
          <StaggerItem className="lg:col-span-5">
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-2 w-fit">
                <div className="relative w-[50px] h-[50px]">
                  <Image
                    src="/logo-icon.png"
                    alt="AI Trading Analytics"
                    fill
                    sizes="50px"
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-2xl font-semibold text-white">
                  SmartStox
                </span>
              </Link>
              <Typography variant="h5" className="!text-[13px] uppercase tracking-wider text-white font-bold">
                AI TRADED. BROKER MANAGED. <span className="text-[#2A73EA]">FREE TO LIVE</span>
              </Typography>
              <Typography variant="p" className="text-[#FFFFFF] !text-[16px] text-sm leading-relaxed max-w-sm">
                {t('description')}
              </Typography>

              {/* App Buttons */}
              <div className="flex items-center gap-8 max-h-[50px] w-fit">
                <a href="https://apps.apple.com/in/iphone/search?term=smartstoxglobal" target='_blank' className="block hover:opacity-90 transition-opacity">
                  <Image
                    src="/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    width={150}
                    height={30}
                  />
                </a>
                <a href="https://play.google.com/store/search?q=smartstoxglobal&c=apps&hl=en_IN" target='_blank' className="block hover:opacity-90 transition-opacity">
                  <Image
                    src="/download-on-the-google-play-store.png"
                    alt="Get it on Google Play"
                    width={150}
                    height={30}
                  />
                </a>
              </div>
            </div>
          </StaggerItem>

          {/* Quick Links Column */}
          <StaggerItem className="lg:col-span-3">
            <Typography variant="h5" className="text-white font-semibold mb-6">{t('quickLinks.title')}</Typography>
            <ul className="space-y-4">
              <li><Link href="/our-strategy" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">{t('quickLinks.ourStrategy')}</Typography></Link></li>
              <li><Link href="/venture-capital" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">{t('quickLinks.ventureCapital')}</Typography></Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">{t('quickLinks.pricing')}</Typography></Link></li>
              <li><Link href="/ambassadors" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">{t('quickLinks.ambassadors')}</Typography></Link></li>
            </ul>
          </StaggerItem>

          {/* Support Column */}
          <StaggerItem className="lg:col-span-2">
            <Typography variant="h5" className="text-white font-semibold mb-6">{t('support.title')}</Typography>
            <ul className="space-y-4">
              <li><Link href="/t&c" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">{t('support.terms')}</Typography></Link></li>
              <li><Link href="" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">{t('support.privacy')}</Typography></Link></li>
              <li><Link href="/our-strategy#faq-section-block" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">{t('support.faqs')}</Typography></Link></li>
              <li><Link href="/media-library" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">{t('support.mediaLibrary')}</Typography></Link></li>
            </ul>
          </StaggerItem>

          {/* Company Column */}
          <StaggerItem className="lg:col-span-2">
            <Typography variant="h5" className="text-white font-semibold mb-6">{t('company.title')}</Typography>
            <ul className="space-y-4">
              <li><Link href="" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">{t('company.about')}</Typography></Link></li>
              <li><Link href="/further-reading" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">{t('company.furtherReading')}</Typography></Link></li>
              <li><Link scroll={true} href="/further-reading#knowledgebase-all-images" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">{t('company.knowledgeBase')}</Typography></Link></li>
              <li><Link href="" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">{t('company.news')}</Typography></Link></li>
            </ul>
          </StaggerItem>

        </StaggerContainer>

        {/* Bottom Bar */}
        <FadeIn direction="up" delay={0.3}>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <Typography variant="p" className="!text-base text-center md:text-left">
              {t('copyright', { year: new Date().getFullYear() })}
            </Typography>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:text-white hover:border-white transition-colors"
                  >
                    <span className="sr-only">{social.name}</span>
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </SectionWrapper>
    </footer>
  );
}
