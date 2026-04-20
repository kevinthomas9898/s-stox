import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Typography } from '@/components/ui/typography';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const profileImages = [
  "/sales_professionals.png",
  "/trading_educators.png",
  "/finance_influencers.png",
  "/community_leaders.png",
  "/high_performance_marketers.png"
];

export async function WhoThisIsForSection() {
  const t = await getTranslations('whoThisIsFor');

  const profiles = [0, 1, 2, 3, 4].map(i => ({
    image: profileImages[i],
    label: t(`profiles.${i}.label`)
  }));

  return (
    <>
      {/* Blue Banner */}
      <div className="bg-blue-600 py-3 px-4 mb-16">
        <Typography variant="h5" className="text-white text-center font-medium italic">
          {t('banner')}
        </Typography>
      </div>
      <SectionWrapper className="py-20 bg-[#0b0f19]">

        {/* Header */}
        <div className="text-center mb-12">
          <Typography variant="h3">
            {t('title').split('Who')[0]}
            <span className="text-blue-500">Who</span>
            {t('title').split('Who')[1]}
          </Typography>
          <Typography variant="h5" className="mt-2">
            {t('subtitle')}
          </Typography>
        </div>

        {/* Profile Images Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 mb-12">
          {profiles.map((profile, index) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              <div className="relative w-full aspect-square max-w-full rounded-xl overflow-hidden">
                <Image
                  src={profile.image}
                  alt={profile.label}
                  fill
                  className="object-cover"
                />
              </div>
              <Typography variant="p" className="text-center">
                {profile.label}
              </Typography>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center">
          <Typography variant="h5" className="max-w-3xl mx-auto">
            {t('bottomText1')}
          </Typography>
          <Typography variant="h5" className="max-w-3xl mx-auto mt-2">
            {t('bottomText2')}
          </Typography>
        </div>
      </SectionWrapper>
    </>
  );
}
