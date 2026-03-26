'use client';

/**
 * Composes all global providers in the correct order.
 */
export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
