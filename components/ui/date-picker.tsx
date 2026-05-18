"use client";

import * as React from "react";
import { format, subYears, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

export interface DatePickerProps {
  date?: Date | string;
  onSelect?: (date: string | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  error?: string;
  label?: string;
  maxDate?: Date;
  minDate?: Date;
}

export function DatePickerBase({
  date,
  onSelect,
  disabled,
  placeholder = "DD / MM / YYYY",
  className,
  error,
  label,
  maxDate,
  minDate,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Convert date string to Date object
  const dateValue = React.useMemo(() => {
    if (!date) return undefined;
    return typeof date === "string" ? parseISO(date) : date;
  }, [date]);

  // Default max date is 18 years ago (must be 18+)
  const defaultMaxDate = subYears(new Date(), 18);
  const effectiveMaxDate = maxDate || defaultMaxDate;

  // Default displayed date: use selected date if exists, otherwise 18 years ago
  const defaultDate = dateValue || subYears(new Date(), 18);

  // Display formatted date
  const displayValue = React.useMemo(() => {
    if (!date) return placeholder;
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return format(dateObj, "dd / MM / yyyy");
  }, [date, placeholder]);

  const handleSelect = (selectedDate: Date | null) => {
    if (selectedDate) {
      onSelect?.(format(selectedDate, "yyyy-MM-dd"));
    } else {
      onSelect?.(undefined);
    }
    setOpen(false);
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-between text-left font-normal h-12 bg-transparent border-white/60 hover:bg-white/5 hover:text-white",
              !date && "text-gray-500",
              date && "text-white",
              error && "border-red-500 ring-1 ring-red-500",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <span>{displayValue}</span>
            <CalendarIcon className="h-4 w-4 text-gray-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-[#1a1b1e] border-white/20" align="start" side="top">
          <Calendar
            value={dateValue}
            onChange={handleSelect}
            minDate={minDate}
            maxDate={effectiveMaxDate}
            defaultDate={defaultDate}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

interface ControlledDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
}

export function DatePicker<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  className,
  disabled,
  maxDate,
  minDate,
}: ControlledDatePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <DatePickerBase
          date={field.value}
          onSelect={(date) => field.onChange(date)}
          label={label}
          placeholder={placeholder}
          className={className}
          disabled={disabled}
          error={fieldState.error?.message}
          maxDate={maxDate}
          minDate={minDate}
        />
      )}
    />
  );
}
