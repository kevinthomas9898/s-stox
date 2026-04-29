"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Check } from "lucide-react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: React.ReactNode;
  description?: string;
}

const CheckboxBase = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, label, description, id, ...props }, ref) => {
    const [checked, setChecked] = React.useState(props.checked || false);
    const checkboxId = id || React.useId();

    React.useEffect(() => {
      setChecked(props.checked || false);
    }, [props.checked]);

    return (
      <div className={cn("flex items-start gap-3", className)}>
        <label htmlFor={checkboxId} className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            className="sr-only"
            {...props}
            onChange={(e) => {
              setChecked(e.target.checked);
              props.onChange?.(e);
            }}
          />
          <div
            className={cn(
              "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
              checked
                ? "bg-[#00D094] border-[#00D094]"
                : "bg-transparent border-white/60 hover:border-white/80",
              error && "border-red-500"
            )}
          >
            {checked && <Check className="w-3.5 h-3.5 text-[#0b0f19]" />}
          </div>
        </label>
        <div className="flex flex-col">
          {label && (
            <label htmlFor={checkboxId} className={cn("text-sm text-gray-300 cursor-pointer", error && "text-red-400")}>
              {label}
            </label>
          )}
          {description && (
            <span className="text-xs text-gray-500">{description}</span>
          )}
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      </div>
    );
  }
);
CheckboxBase.displayName = "CheckboxBase";

interface ControlledCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: React.ReactNode;
  description?: string;
  className?: string;
}

export function Checkbox<T extends FieldValues>({
  name,
  control,
  label,
  description,
  className,
}: ControlledCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <CheckboxBase
          {...field}
          checked={field.value}
          onChange={(e) => field.onChange(e.target.checked)}
          label={label}
          description={description}
          className={className}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

export { CheckboxBase };
