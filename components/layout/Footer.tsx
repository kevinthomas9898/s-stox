import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaXTwitter } from 'react-icons/fa6';

function AppleIcon() {
  return (
    <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.24-.86 3.44-.86 1.81.08 3.15.7 3.84 1.76-3.23 1.96-2.6 6.13.71 7.42-.71 1.71-1.66 3.09-3.07 3.85zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.36 2.39-1.92 4.25-3.74 4.25z" />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.5 3.5v17a.5.5 0 00.75.43l16.14-9a.5.5 0 000-.86L3.25 3.07A.5.5 0 002.5 3.5z" fill="#00D094" />
      <path d="M4 5.5l9.5 5.5-9.5 5.5z" fill="rgba(255,255,255,0.8)" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="w-full bg-[#0d1117] pt-20 pb-8 text-white">
      <div className="px-4 sm:px-6 lg:px-16">

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
                <AppleIcon />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] uppercase font-medium">{t('appStore')}</span>
                  <span className="text-sm font-bold">{t('appStoreStrong')}</span>
                </div>
              </a>
              <a href="#" className="flex items-center gap-2 bg-[#1a365d] hover:bg-[#1e40af] text-white px-4 py-2 rounded-md transition-colors border border-[#2d4a77]">
                <PlayStoreIcon />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] uppercase font-medium">{t('googlePlay')}</span>
                  <span className="text-sm font-bold">{t('googlePlayStrong')}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold mb-6">{t('quickLinks.title')}</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-primary transition-colors">{t('quickLinks.wealth')}</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">{t('quickLinks.fractional')}</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">{t('quickLinks.pricing')}</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">{t('quickLinks.ambassadors')}</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6">{t('support.title')}</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-primary transition-colors">{t('support.terms')}</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">{t('support.privacy')}</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">{t('support.faqs')}</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">{t('support.supportCenter')}</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6">{t('company.title')}</h3>
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
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors">
              <span className="sr-only">Facebook</span>
              <FaFacebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors">
              <span className="sr-only">Instagram</span>
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors">
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors">
              <span className="sr-only">YouTube</span>
              <FaYoutube className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors">
              <span className="sr-only">Twitter</span>
              <FaXTwitter className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
