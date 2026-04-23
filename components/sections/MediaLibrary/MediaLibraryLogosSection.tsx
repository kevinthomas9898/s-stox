import Image from "next/image";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import { Typography } from "@/components/ui/typography";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

interface LogoCardProps {
  src: string;
  alt: string;
  label: string;
  imgWidth?: string;
  imgHeight?: string;
}

function LogoCard({ src, alt, label, imgWidth = "80%", imgHeight = "80%" }: LogoCardProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-full aspect-4/3 bg-[#181C25] rounded-lg border border-white/20 overflow-hidden group">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div style={{ width: imgWidth, height: imgHeight }} className="relative">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <Link
          href={src}
          download
          className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
          aria-label={`Download ${label}`}
        >
          <FiDownload className="w-4 h-4 text-black" />
        </Link>
      </div>
      <Typography variant="h5" className="text-center text-gray-400">
        {label}
      </Typography>
    </div>
  );
}

export function MediaLibraryLogosSection() {
  return (
    <SectionWrapper
      className="pt-20"
      containerClassName="bg-[#181C25] relative py-12 px-6 sm:px-10"
    >
      <Typography variant="h3" className="text-center mb-12">
        Corporate Branding: <span className="text-[#00D094]">Logos</span>
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <LogoCard
          src="/square_logo.svg"
          alt="SmartStox Square Logo"
          label="Square Logo"
          imgWidth="50%"
          imgHeight="50%"
        />
        <LogoCard
          src="/rectangle_logo.svg"
          alt="SmartStox Rectangular Logo"
          label="Rectangular Logo"
          imgWidth="80%"
          imgHeight="80%"
        />
      </div>
    </SectionWrapper>
  );
}
