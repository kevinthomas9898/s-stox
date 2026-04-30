import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Enable Turbopack for faster HMR
  turbopack: {
    resolveAlias: {
      // Resolve any alias issues if needed
    },
  },
  // Optimize heavy package imports
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@base-ui/react',
      'react-icons',
    ],
    // Inline critical CSS to reduce render-blocking
    optimizeCss: true,
  },
};

export default withNextIntl(nextConfig);
