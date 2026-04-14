import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Typography } from '@/components/ui/typography';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const ecosystemImages = [
  "/BrightByte.png",
  "/digiprop.png",
  "/serve.png",
  "/oryxfund.png",
  "/PayPayYa.png",
  "/Prosperian_Ambassador_Card.png",
  "/SmartStox_icon_big.png",
  "/Solidi_Digitised_Gold_Coins.png"
];

export async function EcosystemGridSection() {
  const t = await getTranslations('ecosystemGrid');

  const ecosystemItems = [0, 1, 2, 3, 4, 5, 6, 7].map(i => ({
    title: t(`items.${i}.title`),
    image: ecosystemImages[i],
    paragraphs: t.raw(`items.${i}.paragraphs`) as string[]
  }));
  return (
    <SectionWrapper className="py-20 bg-[#0b0f19]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 lg:gap-x-20">
        {ecosystemItems.map((item, index) => (
          <div key={index} className="flex flex-col space-y-5">
            <div className="flex justify-start h-[120px]">
              <Image
                src={item.image}
                alt={item.title}
                width={320}
                height={120}
                className="w-auto h-full object-contain rounded-2xl"
              />
            </div>
            
            <Typography variant="h4" className="text-white mt-3 font-semibold">
              {item.title}
            </Typography>
            
            <div className="space-y-4">
              {item.paragraphs.map((p, i) => (
                <Typography key={i} variant="p" className="text-gray-400">
                  {p}
                </Typography>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
