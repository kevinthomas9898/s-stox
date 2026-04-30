"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LuChevronDown, LuSearch } from "react-icons/lu";

import { cn } from "@/lib/utils"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"

export interface SelectOption {
  value: string;
  label: string | React.ReactNode;
  shortLabel?: string | React.ReactNode;
  flagUrl?: string;
}

export interface SelectDropdownProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  subLabel?: React.ReactNode;
  criteria?: string;
  error?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  disabled?: boolean;
  searchable?: boolean;
  searchThreshold?: number;
}

export function SelectDropdownBase({
  options,
  value,
  onChange,
  placeholder = "--",
  label,
  subLabel,
  criteria,
  error,
  className,
  triggerClassName,
  contentClassName,
  disabled,
  searchable,
  searchThreshold = 10
}: SelectDropdownProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  
  const selectedOption = options.find((opt) => opt.value === value);
  const shouldShowSearch = searchable !== false && options.length >= searchThreshold;
  
  const filteredOptions = shouldShowSearch && searchQuery
    ? options.filter((opt) => {
        const labelText = typeof opt.label === "string" ? opt.label : "";
        return labelText.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : options;

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {label && (
        <label className="text-sm font-bold text-white mb-1">{label}</label>
      )}
      {subLabel && (
        <p className="text-xs text-gray-400 leading-snug mb-1">{subLabel}</p>
      )}
      {criteria && (
        <p className="text-xs text-gray-400 mb-2">{criteria}</p>
      )}
      <div className="relative w-full">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger 
            disabled={disabled}
            className={cn(
              "flex h-12 w-full items-center justify-between rounded-md border border-white/60 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 outline-none",
              error && "border-red-500 ring-1 ring-red-500 focus:ring-red-500",
              triggerClassName
            )}
          >
            <span className={cn("flex items-center gap-2 truncate", !selectedOption && "text-gray-500")}>
              {selectedOption ? (
                <>
                  {selectedOption.flagUrl && (
                    <img src={selectedOption.flagUrl} alt="" className="w-5 h-3.5 object-cover" />
                  )}
                  <span>{selectedOption.shortLabel || selectedOption.label}</span>
                </>
              ) : placeholder}
            </span>
            <LuChevronDown className="text-base opacity-50 shrink-0" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={cn("w-(--anchor-width) bg-[#1a1b1e] border-[#2C2E33] text-white p-0", contentClassName)}
            align="start"
          >
            {shouldShowSearch && (
              <div className="sticky top-0 bg-[#1a1b1e] border-b border-[#2C2E33] p-2 z-10">
                <div className="relative">
                  <LuSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-base text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full h-8 pl-8 pr-2 rounded bg-[#2C2E33] text-sm text-white placeholder:text-gray-500 outline-none"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}
            <div data-lenis-prevent className="max-h-[280px] overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500">No results found</div>
              ) : (
                filteredOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => {
                      onChange?.(option.value);
                      setSearchQuery("");
                      setOpen(false);
                    }}
                    className="cursor-pointer hover:bg-[#2C2E33] focus:bg-[#2C2E33] !text-white hover:!text-white focus:!text-white flex items-center gap-2 outline-none"
                  >
                    {option.flagUrl && (
                      <img src={option.flagUrl} alt="" className="w-5 h-3.5 object-cover shrink-0" />
                    )}
                    <span className="truncate !text-white hover:!text-white">{option.label}</span>
                  </DropdownMenuItem>
                ))
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
    </div>
  )
}

interface ControlledSelectDropdownProps<T extends FieldValues> extends Omit<SelectDropdownProps, 'value' | 'onChange'> {
  name: Path<T>;
  control: Control<T>;
}

export function SelectDropdown<T extends FieldValues>({
  name,
  control,
  ...props
}: ControlledSelectDropdownProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <SelectDropdownBase
          {...props}
          value={field.value}
          onChange={field.onChange}
          error={fieldState.error?.message}
        />
      )}
    />
  )
}
