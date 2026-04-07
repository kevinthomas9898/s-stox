import Image from 'next/image';
import { Typography } from '@/components/ui/typography';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const ecosystemItems = [
  {
    title: "BrightByte",
    image: "/BrightByte.png",
    paragraphs: [
      "BrightByte CyberFarming transforms renewable energy into high-performance digital production. By operating advanced computing infrastructure powered by sustainable energy, BrightByte generates digital assets while optimising profitability through sophisticated treasury management strategies.",
      "This “cyber-agriculture” model treats computing power as a productive digital crop — cultivated using efficient energy systems and managed with institutional-grade financial discipline. The result is a resilient, scalable platform that converts renewable power into long-term digital value."
    ],
  },
  {
    title: "DigiProp Digitised Property Participation",
    image: "/digiprop.png",
    paragraphs: [
      "DigiProp is a blockchain-powered investment platform that enables affordable access to global real estate through the digitization of property assets. Specializing in storage unit investments across multiple jurisdictions, DigiProp allows investors to enter the market with low capital while benefiting from geographically diversified portfolios that reduce regional risk.",
      "Through secure, transparent, and seamless blockchain technology, DigiProp simplifies property investment - making it accessible, efficient, and globally connected."
    ],
  },
  {
    title: "eServe Global Subscriptions",
    image: "/serve.png",
    paragraphs: [
      "eServe is a Global Provider of LifeStyle-Enhancing eServices on Subscription.",
      "Our Product Licensee Network connects consumers with Innovative Solutions in CoverTech, FinEd & HealthTech that Empowers Individuals through Access, Convenience & Value for a Better Quality of Life."
    ],
  },
  {
    title: "OryXFund Digitised Equities",
    image: "/oryxfund.png",
    paragraphs: [
      "OryXFund is a next-generation investment platform that opens the door to blue-chip equity ownership through secure blockchain tokenisation. By converting shares in some of the world's most established companies into digital tokens, OryXFund enables investors to gain seamless, on-chain exposure to premium equities - fully backed 1:1 by the underlying securities.",
      "This innovative approach combines the stability of traditional markets with the accessibility, transparency, and efficiency of blockchain technology, making global wealth creation more inclusive than ever."
    ],
  },
  {
    title: "PayPayYa Digital Payments Platform",
    image: "/PayPayYa.png",
    paragraphs: [
      "PayPayYa is a next-generation digital payments platform designed for a truly global economy. It offers secure, user-friendly eWallets that enable individuals and businesses to send, receive, and store funds seamlessly across borders. With integrated crypto on-ramping and off-ramping, users can effortlessly move between traditional currencies and digital assets.",
      "Combined with instant global fund transfers, PayPayYa delivers fast, flexible, and borderless financial access - empowering users to transact anywhere, anytime."
    ],
  },
  {
    title: "Prosperian Ambassador Card",
    image: "/Prosperian_Ambassador_Card.png",
    paragraphs: [
      "The Prosperian Ambassador Card empowers you to earn, spend, and access credit with ease. Ambassadors can generate income by introducing the services of the Prosperian Capital Group to new clients, spend crypto seamlessly at participating merchants, and enjoy a flexible revolving credit facility available in most jurisdictions.",
      "It's your gateway to earning, spending, and growing with Prosperian."
    ],
  },
  {
    title: "SmartStox Trading Software",
    image: "/SmartStox_icon_big.png",
    paragraphs: [
      "SmartStox isn't just another trading tool - it's a system built on real-world experience. Every algorithm, every trade, every reinvestment strategy has been tested in live markets and refined for maximum performance.",
      "Our AI doesn't sleep, second-guess, or let emotions interfere - it executes disciplined trades with precision, compounding your wealth over time while you live your life."
    ],
  },
  {
    title: "Solidi Digitised Gold Coins",
    image: "/Solidi_Digitised_Gold_Coins.png",
    paragraphs: [
      "Solidi Digitised Gold Coins offer a secure, fully auditable way to own gold in the digital era. Each coin is a blockchain-backed security token, 100% backed by physical gold held in reserve by a regulated digital custodian. Investors enjoy the transparency, liquidity, and convenience of digital ownership, while maintaining the safety and trust of traditional gold holdings."
    ],
  }
];

export function EcosystemGridSection() {
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
