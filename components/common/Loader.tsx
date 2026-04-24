'use client';

import { BiLoaderCircle } from 'react-icons/bi';

interface LoaderProps {
  text?: string;
  className?: string;
  size?: number;
}

export function Loader({ text = 'Loading...', className = '', size = 24 }: LoaderProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <BiLoaderCircle className="animate-spin" size={size} />
      {text && <span>{text}</span>}
    </div>
  );
}

export function LoaderFullScreen({ text, className = '', size }: LoaderProps) {
  return (
    <div className={`flex items-center justify-center h-full w-full ${className}`}>
      <Loader text={text} size={size} />
    </div>
  );
}
