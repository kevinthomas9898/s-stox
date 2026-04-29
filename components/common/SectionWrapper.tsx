import { cn } from '@/lib/utils';

interface SectionWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  containerClassName?: string;
}

export function SectionWrapper({
  children,
  className,
  containerClassName,
  ...props
}: SectionWrapperProps) {
  return (
    <div className={cn('w-full', className)} {...props}>
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