import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function SectionWrapper({
  children,
  className,
  containerClassName,
}: SectionWrapperProps) {
  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'px-4 sm:px-8 lg:px-16',
          containerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
