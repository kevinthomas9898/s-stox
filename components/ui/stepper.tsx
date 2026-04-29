import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full px-3", className)}>
      <div className="flex items-start relative">
        {/* Connector line - full width with circles overlaying */}
        <div
          className="absolute top-[11px] left-0 right-0 h-[2px] -z-10"
          style={{
            marginLeft: "calc(12px + 0.75rem)", // half circle + px-3
            marginRight: "calc(12px + 0.75rem)",
            backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 4px, transparent 4px, transparent 8px)",
          }}
        />
        <div
          className="absolute top-[11px] left-0 h-[2px] -z-10 transition-all duration-300"
          style={{
            marginLeft: "calc(12px + 0.75rem)",
            width: currentStep <= 1
              ? "0%"
              : `calc((100% - 1.5rem) * ${Math.min(currentStep - 1, steps.length - 1) / (steps.length - 1)} + 20px)`,
            backgroundImage: "repeating-linear-gradient(to right, #00D094 0px, #00D094 4px, transparent 4px, transparent 8px)",
          }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isPending = stepNumber > currentStep;

          return (
            <div key={step} className="flex flex-col items-center flex-1">
              {/* Step circle */}
              <div
                className={cn(
                  "relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2",
                  isCompleted && "bg-black border-[#00D094] text-[#00D094]",
                  isActive && "bg-transparent text-white border-2 border-white",
                  isPending && "bg-transparent text-gray-500 border-2 border-gray-500"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-current" />
                )}
              </div>

              {/* Step labels */}
              <div className="mt-2 text-center">
                <span
                  className={cn(
                    "block text-[10px] uppercase tracking-wider transition-colors",
                    isActive && "text-[#00D094]",
                    isCompleted && "text-[#00D094]",
                    isPending && "text-white/50"
                  )}
                >
                  Step {stepNumber}
                </span>
                <span
                  className={cn(
                    "block text-sm font-medium transition-colors whitespace-nowrap",
                    isActive && "text-[#00D094]",
                    isCompleted && "text-[#00D094]",
                    isPending && "text-white/50"
                  )}
                >
                  {step}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
