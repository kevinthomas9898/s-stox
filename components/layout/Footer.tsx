import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ComponentType } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaApple } from 'react-icons/fa6';
import { Typography } from '@/components/common/typography';
import { SectionWrapper } from '@/components/common/SectionWrapper';

interface SocialLink {
  name: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
}

export default async function Footer() {
  const t = await getTranslations('footer');

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand & Description Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-2">
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
              SmartStox is your next-generation global wealth platform where AI-driven trading and intelligent capital management enable anyone to grow and preserve wealth—efficiently, transparently, and at scale.
            </Typography>

            {/* App Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <a href="#" className="flex items-center gap-2 bg-[#00D094] hover:bg-[#00c985] text-gray-900 px-4 py-2 rounded-md transition-colors">
                <FaApple className='text-black text-3xl' />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] uppercase font-medium">Download on the</span>
                  <span className="text-sm font-bold">App Store</span>
                </div>
              </a>
              <a href="#" className="flex relative items-center gap-2 bg-[#1a365d] hover:bg-[#1e40af] text-white px-4 py-2 rounded-md transition-colors border border-[#2d4a77]">
                <Image
                  src="/google-play-store-icon.svg"
                  alt="Google Play Store"
                  width={24}
                  height={24}
                />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] uppercase font-medium">GET IT ON</span>
                  <span className="text-sm font-bold">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <Typography variant="h5" className="text-white font-semibold mb-6">Quick Links</Typography>
            <ul className="space-y-4">
              <li><Link href="/our-strategy" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">Our Strategy</Typography></Link></li>
              <li><Link href="/venture-capital" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">Venture Capital Investment</Typography></Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">Pricing</Typography></Link></li>
              <li><Link href="/ambassadors" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">Brand Ambassadors Program</Typography></Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="lg:col-span-2">
            <Typography variant="h5" className="text-white font-semibold mb-6">Support</Typography>
            <ul className="space-y-4">
              <li><Link href="/t&c" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">Terms of Services</Typography></Link></li>
              <li><Link href="" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">Privacy Policy</Typography></Link></li>
              <li><Link href="/faqs" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">FAQs</Typography></Link></li>
              <li><Link href="/media-library" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">Media Library</Typography></Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <Typography variant="h5" className="text-white font-semibold mb-6">Company</Typography>
            <ul className="space-y-4">
              <li><Link href="" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">About Us</Typography></Link></li>
              <li><Link href="/further-reading" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">Further Reading</Typography></Link></li>
              <li><Link href="" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">Knowledge Base</Typography></Link></li>
              <li><Link href="" className="hover:text-primary transition-colors"><Typography variant="p" className="!text-base">SmartStox in the News</Typography></Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Typography variant="p" className="!text-base text-center md:text-left">
            © {new Date().getFullYear()} All Rights Reserved By SmartStox
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

      </SectionWrapper>
    </footer>
  );
}
