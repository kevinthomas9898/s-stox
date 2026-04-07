import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "p";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant;
  as?: React.ElementType;
}

const styles: Record<Variant, string> = {
  h1: "font-roboto font-bold text-[40px] md:text-[48px] lg:text-[56px] leading-[1.2] tracking-[0.02em]",

  h2: "font-roboto font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[0.02em] uppercase",

  h3: "font-roboto font-semibold text-[28px] md:text-[32px] lg:text-[38px] leading-[1.6] tracking-[0.02em]",

  h4: "font-open-sans font-bold text-[20px] md:text-[22px] lg:text-[24px] leading-[1.3] tracking-normal",

  h5: "font-roboto font-medium text-[18px] lg:text-[20px] leading-[1.6] tracking-normal",

  p: "font-roboto font-normal text-[16px] lg:text-[18px] leading-[1.6] tracking-normal",
};

export function Typography({
  variant = "p",
  as,
  className,
  ...props
}: TypographyProps) {
  const Component = as || variant;

  return (
    <Component
      className={cn(styles[variant], className)}
      {...props}
    />
  );
}
