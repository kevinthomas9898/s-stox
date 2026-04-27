"use client";

import Image from "next/image";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import { Typography } from "@/components/common/typography";
import { SectionWrapper } from "@/components/common/SectionWrapper";

interface MediaItem {
  src: string;
  alt: string;
  topText: string;
  bottomText: string;
  type: "image" | "video";
}

interface PlatformAdsProps {
  platform: string;
  items: MediaItem[];
}

function MediaCard({ item }: { item: MediaItem }) {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h5" className="text-white">
        {item.topText}
      </Typography>
      <div className="relative w-full bg-white/5 rounded-lg border border-white/10 overflow-hidden group">
        {item.type === "image" ? (
          <Image
            src={item.src}
            alt={item.alt}
            width={800}
            height={600}
            className="object-contain w-full h-auto"
          />
        ) : (
          <video
            src={item.src}
            className="w-full h-auto object-contain"
            controls
            preload="metadata"
          />
        )}
        <Link
          href={item.src}
          download
          className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
          aria-label={`Download ${item.alt}`}
        >
          <FiDownload className="w-4 h-4 text-black" />
        </Link>
      </div>
      <Typography variant="h5" className="text-gray-400">
        {item.bottomText}
      </Typography>
    </div>
  );
}

function PlatformAds({ platform, items }: PlatformAdsProps) {
  return (
    <div className="mb-16 last:mb-0 bg-[#181C25] rounded-lg p-4">
      <Typography variant="h3" className="text-center mb-8">
        {platform}
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {items.map((item, index) => (
          <MediaCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

interface MediaLibraryAdsSectionProps {
  platforms?: { name: string; items: MediaItem[] }[];
}

const defaultBottomTexts = [
  "Try the SmartStox system risk-free.",
  "100% Money-Back Trial Available",
  "Try the SmartStox system risk-free.",
  "100% Money-Back Trial Available",
];

const defaultPlatforms = [
  {
    name: "Facebook",
    items: [
      {
        src: "/Static_Ad_1.png",
        alt: "Facebook Static Ad 1",
        topText: "Static Ad 1",
        bottomText: defaultBottomTexts[0],
        type: "image" as const,
      },
      {
        src: "/Static_Ad_2.png",
        alt: "Facebook Static Ad 2",
        topText: "Static Ad 2",
        bottomText: defaultBottomTexts[1],
        type: "image" as const,
      },
      {
        src: "/Static_vd_1.mp4",
        alt: "Facebook Video Ad 1",
        topText: "Video Ad 1",
        bottomText: defaultBottomTexts[2],
        type: "video" as const,
      },
      {
        src: "/Static_vd_2.mp4",
        alt: "Facebook Video Ad 2",
        topText: "Video Ad 2",
        bottomText: defaultBottomTexts[3],
        type: "video" as const,
      },
    ],
  },
  {
    name: "Instagram",
    items: [
      {
        src: "/Static_Ad_1.png",
        alt: "Instagram Static Ad 1",
        topText: "Static Ad 1",
        bottomText: defaultBottomTexts[0],
        type: "image" as const,
      },
      {
        src: "/Static_Ad_2.png",
        alt: "Instagram Static Ad 2",
        topText: "Static Ad 2",
        bottomText: defaultBottomTexts[1],
        type: "image" as const,
      },
      {
        src: "/Static_vd_1.mp4",
        alt: "Instagram Video Ad 1",
        topText: "Video Ad 1",
        bottomText: defaultBottomTexts[2],
        type: "video" as const,
      },
      {
        src: "/Static_vd_2.mp4",
        alt: "Instagram Video Ad 2",
        topText: "Video Ad 2",
        bottomText: defaultBottomTexts[3],
        type: "video" as const,
      },
    ],
  },
  {
    name: "X",
    items: [
      {
        src: "/Static_Ad_1.png",
        alt: "X Static Ad 1",
        topText: "Static Ad 1",
        bottomText: defaultBottomTexts[0],
        type: "image" as const,
      },
      {
        src: "/Static_Ad_2.png",
        alt: "X Static Ad 2",
        topText: "Static Ad 2",
        bottomText: defaultBottomTexts[1],
        type: "image" as const,
      },
      {
        src: "/Static_vd_1.mp4",
        alt: "X Video Ad 1",
        topText: "Video Ad 1",
        bottomText: defaultBottomTexts[2],
        type: "video" as const,
      },
      {
        src: "/Static_vd_2.mp4",
        alt: "X Video Ad 2",
        topText: "Video Ad 2",
        bottomText: defaultBottomTexts[3],
        type: "video" as const,
      },
    ],
  },
  {
    name: "LinkedIn",
    items: [
      {
        src: "/Static_Ad_1.png",
        alt: "LinkedIn Static Ad 1",
        topText: "Static Ad 1",
        bottomText: defaultBottomTexts[0],
        type: "image" as const,
      },
      {
        src: "/Static_Ad_2.png",
        alt: "LinkedIn Static Ad 2",
        topText: "Static Ad 2",
        bottomText: defaultBottomTexts[1],
        type: "image" as const,
      },
      {
        src: "/Static_vd_1.mp4",
        alt: "LinkedIn Video Ad 1",
        topText: "Video Ad 1",
        bottomText: defaultBottomTexts[2],
        type: "video" as const,
      },
      {
        src: "/Static_vd_2.mp4",
        alt: "LinkedIn Video Ad 2",
        topText: "Video Ad 2",
        bottomText: defaultBottomTexts[3],
        type: "video" as const,
      },
    ],
  },
];

export function MediaLibraryAdsSection({
  platforms = defaultPlatforms,
}: MediaLibraryAdsSectionProps) {
  return (
    <SectionWrapper className="pt-20">
      <div className="relative rounded-xl py-12 px-6 sm:px-10">
        <Typography variant="h3" className="text-center mb-12">
          Corporate Branding: <span className="text-[#00D094]">Ads</span>
        </Typography>

        {platforms.map((platform) => (
          <PlatformAds
            key={platform.name}
            platform={platform.name}
            items={platform.items}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
