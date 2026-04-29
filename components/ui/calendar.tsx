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
};

function Calendar({ className, value, onChange, ...props }: CalendarProps) {
  const handleChange = (date: Date | null) => {
    onChange?.(date);
  };

  return (
    <Box className={cn("p-3 bg-[#1a1b1e] rounded-md", className)}>
      <MantineDatePicker
        type="default"
        value={value ?? null}
        onChange={handleChange as any}
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
