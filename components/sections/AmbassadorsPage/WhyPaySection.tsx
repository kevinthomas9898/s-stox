import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Typography } from '@/components/common/typography';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { PrimaryBTN } from '@/components/common/PrimaryBTN';

export async function WhyPaySection() {
  const t = await getTranslations('whyPay');

  const benefits = [0, 1, 2, 3].map(i => t(`benefits.${i}`));

  return (
    <SectionWrapper className="py-20 bg-[#0b0f19]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Side - Text Content */}
        <div className="space-y-6">
          {/* Title */}
          <Typography variant="h3">
            {t('title').split('$50')[0]}
            <span className="text-[#2A73EA]">$50</span>
            {t('title').split('$50')[1]}
          </Typography>

          {/* Paragraphs */}
          <Typography variant="p" className="leading-relaxed">
            {t('paragraph1')}
          </Typography>

          <Typography variant="p" className="leading-relaxed">
            {t('paragraph2')}
          </Typography>

          <Typography variant="p" className="leading-relaxed">
            {t('paragraph3')}
          </Typography>

          <Typography variant="p" className="leading-relaxed">
            {t('paragraph4')}
          </Typography>

          {/* Benefits Grid */}
          <Typography variant="p" className="leading-relaxed">
            {t('paragraph5')}
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-white mt-1">•</span>
                <Typography variant="p">
                  {benefit}
                </Typography>
              </div>
            ))}
          </div>

          <Typography variant="p" className="leading-relaxed">
            {t('paragraph6')}
          </Typography>

          <Typography variant="p" className="leading-relaxed">
            {t('paragraph7')}
          </Typography>

          {/* Green Note */}
          <Typography variant="p" className="text-green-500 italic">
            {t('greenNote')}
          </Typography>

          {/* Bottom Text */}
          <Typography variant="h5" className="text-white font-semibold pt-4">
            {t('bottomText')}
          </Typography>

          {/* CTA Button */}
          <div className="pt-4">
            <Link href="/ambassadors/apply">
              <PrimaryBTN className="w-auto px-8">
                {t('cta')}
              </PrimaryBTN>
            </Link>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative w-full aspect-4/5 lg:aspect-auto lg:h-full min-h-[400px] rounded-2xl overflow-hidden">
          <Image
            src="/why_pay.png"
            alt={t('imageAlt')}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
