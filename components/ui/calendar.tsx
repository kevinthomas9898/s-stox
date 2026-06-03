import { useState, useEffect } from "react";
import { Box } from "@mantine/core";
import {
  DatePicker as MantineDatePicker,
  type DatePickerProps as MantineDatePickerProps,
} from "@mantine/dates";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalendarProps = Omit<MantineDatePickerProps, "value" | "onChange"> & {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  defaultDate?: Date;
};

function Calendar({ className, value, onChange, defaultDate, ...props }: CalendarProps) {
  const [viewDate, setViewDate] = useState<Date>(value || defaultDate || new Date());

  useEffect(() => {
    if (value) {
      setViewDate(value);
    } else if (defaultDate) {
      setViewDate(defaultDate);
    }
  }, [value, defaultDate]);

  const handleChange = (date: unknown) => {
    if (date instanceof Date || date === null) {
      onChange?.(date);
    } else if (typeof date === "string") {
      onChange?.(new Date(date));
    }
  };

  return (
    <Box
      className={cn("p-3 bg-[#1a1b1e] rounded-md", className)}
      style={{
        '--mantine-color-blue-filled': '#00D094',
        '--mantine-color-blue-filled-hover': '#059669',
        '--mantine-primary-color-filled': '#00D094',
        '--mantine-primary-color-filled-hover': '#059669',
      } as React.CSSProperties}
    >
      <MantineDatePicker
        type="default"
        value={value ?? null}
        onChange={handleChange as (value: unknown) => void}
        date={viewDate}
        onDateChange={(d: any) => setViewDate(new Date(d))}
        firstDayOfWeek={0}
        weekendDays={[]}
        previousIcon={<ChevronLeft className="h-4 w-4" />}
        nextIcon={<ChevronRight className="h-4 w-4" />}
        {...props}
      />
    </Box>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
