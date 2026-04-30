'use client';

import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { FiX, FiChevronLeft } from 'react-icons/fi';

type DialogBoxProps = {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
  children: React.ReactNode;
  className?: string;
  heading?: string;
  description?: string;
  isHeaderVisible?: boolean;
  allowClose?: boolean;
  isCloseButtonVisible?: boolean;
  resizeable?: boolean;
  escapeClose?: boolean;
  isNotScrollable?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  overlayClassName?: string;
};

export function DialogBox({
  isModalOpen,
  setIsModalOpen,
  children,
  className,
  heading,
  description,
  isHeaderVisible = true,
  allowClose = true,
  isCloseButtonVisible = true,
  resizeable = false,
  escapeClose = true,
  isNotScrollable = false,
  showBackButton = false,
  onBack,
  overlayClassName,
}: DialogBoxProps) {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen && escapeClose && allowClose) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, escapeClose, allowClose, setIsModalOpen]);

  const handleOpenChange = (open: boolean) => {
    if (allowClose) {
      setIsModalOpen(open);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
      {/* Dark backdrop overlay */}
      <DialogOverlay 
        className={cn(
          "fixed inset-0 z-50 gradient-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          overlayClassName
        )} 
      />
      
      <DialogContent
        className={cn(
          "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#1a1b1e] p-4 sm:p-6 text-white shadow-2xl ring-1 ring-white/10",
          resizeable ? "w-[95vw] sm:w-auto sm:min-w-[600px] sm:max-w-[90vw]" : "w-[95vw] sm:w-full sm:max-w-lg",
          isNotScrollable ? "overflow-visible" : "max-h-[90vh] overflow-hidden",
          className
        )}
        showCloseButton={false}
      >
        {/* Custom Close button */}
        {isCloseButtonVisible && allowClose && (
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10 text-white/70 hover:text-white"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        {isHeaderVisible && (
          <DialogHeader className={cn("pr-8", !heading && !description && "sr-only")}>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-white">
              {showBackButton && onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors text-white"
                  aria-label="Back"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>
              )}
              {heading}
            </DialogTitle>
            
            {description ? (
              <DialogDescription className="text-gray-400">
                {description}
              </DialogDescription>
            ) : (
              <DialogDescription className="sr-only">
                Dialog content
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        {/* Content body */}
        {isNotScrollable ? (
          <div className="overflow-visible">{children}</div>
        ) : (
          <div data-lenis-prevent className="overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-hide">
            {children}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DialogBox;
