'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function TrialSection() {
  const t = useTranslations('trial');

  return (
    <div className="w-full py-16 bg-[#0b0f19] relative overflow-hidden">
      <div className="absolute top-[0%] left-[0%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 justify-center">
          {/* Logo */}
          <div className="shrink-0">
            <Image
              src="/logo-icon.png"
              alt="SmartStox"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          {/* Content */}
          <div className="text-center lg:text-left space-y-4">
            <h3 className="text-white text-2xl font-bold">
              {t('subtitle')}
            </h3>
            <h2 className="text-[#00D094] text-3xl sm:text-4xl lg:text-5xl font-bold">
              {t('title')}
            </h2>
            <p className="text-gray-300 text-base max-w-2xl">
              {t('description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
