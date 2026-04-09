import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full relative">
        <div className="relative">
          <input
            type={inputType}
            className={cn(
              "flex h-12 w-full rounded-md bg-[#1a1b1e] px-3 py-2 text-sm text-white placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 outline-none focus:ring-1 focus:ring-[#00D094]",
              error && "ring-1 ring-red-500 focus:ring-red-500",
              isPassword && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
