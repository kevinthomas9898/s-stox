'use client';

import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

/**
 * Composes all global providers in the correct order.
 */
export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ScrollToTopButton />
    </>
  );
}
