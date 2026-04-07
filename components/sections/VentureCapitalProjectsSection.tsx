import Image from 'next/image';
import { Typography } from '@/components/ui/typography';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export function VentureCapitalProjectsSection() {
  return (
    <SectionWrapper className="py-20 bg-[#0b0f19] pt-28">
      <div className="flex flex-col items-center mb-16 text-center">
        <Typography variant="h2" className="text-white">
          <span className="text-blue-500">VENTURE CAPITAL</span> PROJECTS
        </Typography>
        
        <Typography variant="h5" className="text-gray-300 italic font-light">
          Re-Investments in Digitised Venture Capital - The Future of Smart Wealth
        </Typography>
        
        <Typography variant="h5" className="text-green-500 mt-7">
          Build Tomorrow's Innovation. Protect Today's Capital.
        </Typography>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/Venture_Capital_Projects.png"
            alt="Venture Capital Projects"
            width={800}
            height={600}
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>
        
        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          <Typography variant="p" className="text-gray-300">
            SmartStox brings venture investing into the age of intelligence. Digitised venture capital allows capital to participate in high-growth innovation while maintaining structured, emotionally reassuring return models.
          </Typography>
          
          <Typography variant="p" className="text-gray-300">
            Instead of relying on speculation, investments are selected and monitored through data-driven automation, filtering risk while supporting real economic progress.
          </Typography>
          
          <Typography variant="p" className="text-gray-300">
            This is where bold entrepreneurship meets financial serenity - where technology works quietly to protect your wealth while it grows.
          </Typography>
        </div>
      </div>
    </SectionWrapper>
  );
}
