"use client";

import { Typography } from "@/components/ui/typography";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

interface ColorCardProps {
  number: string;
  title: string;
  hex: string;
  rgb: string;
  cmyk: string;
  usage: string;
}

function ColorCard({ number, title, hex, rgb, cmyk, usage }: ColorCardProps) {
  return (
    <div className="border border-white/10 rounded-lg p-6">
      <Typography variant="h5" className="mb-4">
        {number}. {title}
      </Typography>

      <div className="space-y-2">
        <Typography variant="p" className="text-gray-400 text-sm">
          HEX: <span>{hex}</span>
        </Typography>
        <Typography variant="p" className="text-gray-400 text-sm">
          RGB: <span>{rgb}</span>
        </Typography>
        <Typography variant="p" className="text-gray-400 text-sm">
          CMYK: <span>{cmyk}</span>
        </Typography>
      </div>

      <Typography variant="p" className="text-gray-400 text-sm mt-4">
        <span className="text-white font-medium">Usage</span> : {usage}
      </Typography>
    </div>
  );
}

export function MediaLibraryColorsSection() {
  return (
    <SectionWrapper className="pt-36">
      {/* Title */}
      <Typography variant="h3" className="text-center mb-12">
        Corporate Branding: <span className="text-[#00D094]">Colours</span>
      </Typography>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <ColorCard
          number="1"
          title="Dark Navy (Primary Background)"
          hex="#0C1B2E"
          rgb="12, 27, 46"
          cmyk="74, 41, 0, 82"
          usage="Website background, dashboards, pitch decks, premium materials."
        />

        <ColorCard
          number="2"
          title="Electric Blue (Primary Accent)"
          hex="#0C7BFF"
          rgb="12, 123, 255"
          cmyk="95, 52, 0, 0"
          usage="Buttons, highlights, links, AI circuitry elements."
        />

        <ColorCard
          number="3"
          title="Vibrant Green (Growth Accent)"
          hex="#10D078"
          rgb="16, 208, 120"
          cmyk="70, 0, 60, 0"
          usage="Performance indicators, positive returns, arrow tips, highlights."
        />

        <ColorCard
          number="4"
          title="White (Typography & Contrast)"
          hex="#FFFFFF"
          rgb="255, 255, 255"
          cmyk="0, 0, 0, 0"
          usage="Logo wordmark, clean layouts, high contrast areas."
        />

        {/* Gradient Card - Separate because different fields */}
        <div className="mx-auto w-full border border-white/10 rounded-lg p-6">
          <Typography variant="h5" className="mb-2">
            5. Gradient (Primary Logo Gradient)
          </Typography>

          <Typography variant="p" className="text-gray-400 text-sm mb-4">
            For the AI Bull Circuit Mark
          </Typography>

          <div className="space-y-2">
            <Typography variant="p" className="text-gray-400 text-sm">
              Start: <span>#0C7BFF (Electric Blue)</span>
            </Typography>
            <Typography variant="p" className="text-gray-400 text-sm">
              End: <span>#10D078 (Vibrant Green)</span>
            </Typography>
            <Typography variant="p" className="text-gray-400 text-sm">
              Angle: <span>45° diagonal (top-left to bottom-right)</span>
            </Typography>
          </div>

          <Typography variant="p" className="text-gray-400 text-sm mt-4">
            <span className="text-white font-medium">Usage</span> : Performance indicators, positive returns, arrow tips, highlights.
          </Typography>
        </div>
      </div>
    </SectionWrapper>
  );
}
