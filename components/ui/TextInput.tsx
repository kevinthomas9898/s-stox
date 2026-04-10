"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const TextInputBase = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, type, error, label, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm text-gray-300">{label}</label>
        )}
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
          <p className="text-xs text-red-500">{error}</p>
        )}
      </div>
    )
  }
)
TextInputBase.displayName = "TextInputBase"

// Controlled version for react-hook-form
interface ControlledTextInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

function TextInput<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  disabled,
}: ControlledTextInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextInputBase
          {...field}
          type={type}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          error={fieldState.error?.message}
        />
      )}
    />
  )
}

export { TextInput, TextInputBase }
