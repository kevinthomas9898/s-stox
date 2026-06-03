"use client";

import * as React from "react";
import { format, subYears, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

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
  ageLimitMessage?: string;
}

// Helper functions for date parsing and formatting
const formatDateString = (value: string) => {
  const clean = value.replace(/\D/g, "");
  if (clean.length === 0) return "";

  let dayPart = clean.slice(0, 2);
  let monthPart = clean.slice(2, 4);
  let yearPart = clean.slice(4, 8);

  if (dayPart.length === 2) {
    const d = parseInt(dayPart, 10);
    if (d > 31) dayPart = "31";
    if (d === 0) dayPart = "01";
  }

  if (monthPart.length === 2) {
    const m = parseInt(monthPart, 10);
    if (m > 12) monthPart = "12";
    if (m === 0) monthPart = "01";
  }

  let formatted = dayPart;
  if (clean.length > 2) {
    formatted += " / " + monthPart;
  }
  if (clean.length > 4) {
    formatted += " / " + yearPart;
  }
  return formatted;
};

const parseDate = (val: string): Date | null => {
  const clean = val.replace(/\D/g, "");
  if (clean.length !== 8) return null;

  const day = parseInt(clean.slice(0, 2), 10);
  const month = parseInt(clean.slice(2, 4), 10) - 1; // 0-indexed month
  const year = parseInt(clean.slice(4, 8), 10);

  const parsedDate = new Date(year, month, day);
  if (
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month &&
    parsedDate.getDate() === day
  ) {
    return parsedDate;
  }
  return null;
};

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
  ageLimitMessage,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [isAgeInvalid, setIsAgeInvalid] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

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

  // Sync date prop to inputValue
  React.useEffect(() => {
    if (!date) {
      if (document.activeElement !== inputRef.current) {
        setInputValue("");
      }
      return;
    }

    const dateObj = typeof date === "string" ? parseISO(date) : date;
    let formattedDate = "";
    try {
      formattedDate = format(dateObj, "dd / MM / yyyy");
    } catch (e) {
      // ignore
    }

    if (inputValue !== formattedDate) {
      const currentParsed = parseDate(inputValue);
      if (!currentParsed || currentParsed.getTime() !== dateObj.getTime()) {
        setInputValue(formattedDate);
      }
    }
  }, [date]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const formatted = formatDateString(rawVal);
    setInputValue(formatted);

    const clean = formatted.replace(/\D/g, "");
    if (clean.length === 8) {
      const parsed = parseDate(formatted);
      if (parsed) {
        if (minDate && parsed < minDate) {
          onSelect?.("");
          setIsAgeInvalid(true);
        } else if (effectiveMaxDate && parsed > effectiveMaxDate) {
          onSelect?.("");
          setIsAgeInvalid(true);
        } else {
          onSelect?.(format(parsed, "yyyy-MM-dd"));
          setIsAgeInvalid(false);
        }
      } else {
        onSelect?.("");
        setIsAgeInvalid(false);
      }
    } else {
      onSelect?.("");
      setIsAgeInvalid(false);
    }
  };

  const handleSelect = (selectedDate: Date | null) => {
    if (selectedDate) {
      if (minDate && selectedDate < minDate) {
        onSelect?.("");
        setIsAgeInvalid(true);
      } else if (effectiveMaxDate && selectedDate > effectiveMaxDate) {
        onSelect?.("");
        setIsAgeInvalid(true);
      } else {
        onSelect?.(format(selectedDate, "yyyy-MM-dd"));
        setIsAgeInvalid(false);
      }
    } else {
      onSelect?.("");
      setIsAgeInvalid(false);
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
          <div className="relative flex items-center w-full">
            <input
              ref={inputRef}
              type="text"
              disabled={disabled}
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => setOpen(true)}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
              className={cn(
                "w-full justify-between text-left font-normal h-12 bg-transparent border border-white/60 rounded-md px-3 py-2 text-sm text-white placeholder:text-gray-500 hover:bg-white/5 hover:text-white transition-colors",
                !date && "text-gray-500",
                date && "text-white",
                error && "border-red-500 ring-1 ring-red-500 focus:ring-red-500",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            />
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                setOpen((prev) => !prev);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              <CalendarIcon className="h-4 w-4" />
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-[#1a1b1e] border-white/20"
          align="start"
          side="top"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Calendar
            value={dateValue}
            onChange={handleSelect}
            minDate={minDate}
            maxDate={effectiveMaxDate}
            defaultDate={defaultDate}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-xs text-red-500 mt-1">
          {isAgeInvalid ? (ageLimitMessage || "You must be 18 years or older to use this platform") : error}
        </p>
      )}
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
  ageLimitMessage?: string;
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
  ageLimitMessage,
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
          ageLimitMessage={ageLimitMessage}
        />
      )}
    />
  );
}
