import { cn } from "@/lib/utils";

type Variant = "h1" | "h2" | "h3" | "h4" | "p";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  h1: "font-roboto font-bold text-[56px] leading-[1.2] tracking-[0.02em]",

  h2: "font-roboto font-bold text-[48px] leading-[1.2] tracking-[0.02em] uppercase",

  h3: "font-roboto font-semibold text-[38px] leading-[1.6] tracking-[0.02em]",

  h4: "font-roboto font-medium text-[20px] leading-[1.6] tracking-normal",

  p: "font-roboto font-normal text-[18px] leading-[1.6] tracking-normal",
};

export function Typography({
  variant = "p",
  className,
  ...props
}: TypographyProps) {
  const Component = variant;

  return (
    <Component
      className={cn(styles[variant], className)}
      {...props}
    />
  );
}
