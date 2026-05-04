import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  const n = steps.length;
  const stepWidthPercent = 100 / n;
  const offset = `calc(${stepWidthPercent / 2}% - 12px)`;

  const k = Math.max(0, currentStep - 1);
  const greenW =
    k === 0
      ? "0px"
      : `calc(${k / (n - 1)} * (${((n - 1) / n) * 100}% + 24px))`;

  return (
    <div className={cn("w-full px-3", className)}>
      <div className="flex items-start relative">

        {/* White solid track */}
        <div
          className="absolute h-[2px]"
          style={{
            top: "11px",
            left: 0,
            right: 0,
            marginLeft: offset,
            marginRight: offset,
            background: "rgba(255,255,255,0.25)",
            zIndex: 0,
          }}
        />

        {/* Green dashed progress */}
        {currentStep > 1 && (
          <div
            className="absolute h-[2px] transition-all duration-300"
            style={{
              top: "11px",
              left: 0,
              marginLeft: offset,
              width: greenW,
              zIndex: 1,
              backgroundImage:
                "repeating-linear-gradient(to right, #00D094 0px, #00D094 5px, transparent 5px, transparent 10px)",
            }}
          />
        )}

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isPending = stepNumber > currentStep;

          return (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  "relative w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2",
                  isCompleted && "bg-black border-[#00D094] text-[#00D094]",
                  isActive && "bg-black text-white border-white",
                  isPending && "bg-black text-gray-500 border-gray-500"
                )}
                style={{ zIndex: 2 }}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-current" />
                )}
              </div>

              <div className="mt-2 text-center">
                <span
                  className={cn(
                    "block text-[10px] uppercase tracking-wider transition-colors",
                    isActive && "text-white",
                    isCompleted && "text-[#00D094]",
                    isPending && "text-gray-500"
                  )}
                >
                  Step {stepNumber}
                </span>
                <span
                  className={cn(
                    "hidden sm:block text-xs sm:text-sm font-medium transition-colors mt-1",
                    isActive && "text-white",
                    isCompleted && "text-[#00D094]",
                    isPending && "text-gray-500"
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