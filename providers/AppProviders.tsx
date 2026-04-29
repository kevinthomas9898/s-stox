import ReduxProvider from './ReduxProvider';
import QueryProvider from './QueryProvider';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import { SmoothScrollProvider } from '@/components/animations';
import { Toaster } from 'sonner';

/**
 * Composes all global providers in the correct order.
 * ReduxProvider -> QueryProvider
 * This ensures state management and data fetching are all available.
 */
export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <SmoothScrollProvider>
          {children}
          <ScrollToTopButton />
          <Toaster position="top-right" richColors closeButton />
        </SmoothScrollProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
