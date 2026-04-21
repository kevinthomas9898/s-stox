import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Optimize heavy package imports
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@base-ui/react',
      'react-icons',
    ],
  },
};

export default withNextIntl(nextConfig);
