import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ComponentType } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaXTwitter, FaApple } from 'react-icons/fa6';
import { Typography } from '../ui/typography';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

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
    { name: 'Twitter', icon: FaXTwitter, href: 'https://twitter.com' },
  ];

  return (
    <footer className="w-full bg-[#0d1117] pt-20 pb-8 text-white">
      <SectionWrapper>

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand & Description Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-icon.png"
                alt="AI Trading Analytics"
                width={50}
                height={50}
                className="object-cover relative"
                priority
              />
              <span className="text-2xl font-semibold text-white">
                SmartStox
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t('description')}
            </p>

            {/* App Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <a href="#" className="flex items-center gap-2 bg-[#00D094] hover:bg-[#00c985] text-gray-900 px-4 py-2 rounded-md transition-colors">
                <FaApple />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] uppercase font-medium">{t('appStore')}</span>
                  <span className="text-sm font-bold">{t('appStoreStrong')}</span>
                </div>
              </a>
              <a href="#" className="flex items-center gap-2 bg-[#1a365d] hover:bg-[#1e40af] text-white px-4 py-2 rounded-md transition-colors border border-[#2d4a77]">
                <Image
                  src="/google-play-store-icon.svg"
                  alt="Google Play Store"
                  width={24}
                  height={24}
                />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] uppercase font-medium">{t('googlePlay')}</span>
                  <span className="text-sm font-bold">{t('googlePlayStrong')}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <Typography variant="h3" className="text-lg font-bold mb-6">{t('quickLinks.title')}</Typography>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-primary transition-colors">{t('quickLinks.wealth')}</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">{t('quickLinks.fractional')}</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">{t('quickLinks.pricing')}</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">{t('quickLinks.ambassadors')}</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-2">
            <Typography variant="h3" className="text-lg font-bold mb-6">{t('support.title')}</Typography>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-primary transition-colors">{t('support.terms')}</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">{t('support.privacy')}</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">{t('support.faqs')}</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">{t('support.supportCenter')}</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <Typography variant="h3" className="text-lg font-bold mb-6">{t('company.title')}</Typography>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-primary transition-colors">{t('company.about')}</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">{t('company.updates')}</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 text-center md:text-left">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>

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
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
                >
                  <span className="sr-only">{social.name}</span>
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

      </SectionWrapper>
    </footer>
  );
}
