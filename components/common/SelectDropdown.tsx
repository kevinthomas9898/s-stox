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
  cca2?: string;
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
  const [displayLimit, setDisplayLimit] = React.useState(30);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const optionsContainerRef = React.useRef<HTMLDivElement>(null);

  const [prevQuery, setPrevQuery] = React.useState(searchQuery);
  const [prevOpen, setPrevOpen] = React.useState(open);

  if (searchQuery !== prevQuery || open !== prevOpen) {
    setPrevQuery(searchQuery);
    setPrevOpen(open);
    setDisplayLimit(30);
  }

  const selectedOption = options.find((opt) => opt.value === value);
  const shouldShowSearch = searchable !== false && options.length >= searchThreshold;

  const filteredOptions = shouldShowSearch && searchQuery
    ? options.filter((opt) => {
      const labelText = typeof opt.label === "string" ? opt.label : "";
      return labelText.toLowerCase().includes(searchQuery.toLowerCase());
    })
    : options;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 50) {
      setDisplayLimit((prev) => Math.min(prev + 35, filteredOptions.length));
    }
  };

  const visibleOptions = filteredOptions.slice(0, displayLimit);

  React.useEffect(() => {
    if (open && shouldShowSearch) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open, shouldShowSearch]);

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
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
              "flex h-12 w-full items-center justify-between rounded-md border border-white/60 bg-transparent px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50 outline-none hover:bg-white/5 hover:text-white transition-colors",
              error && "border-red-500 ring-1 ring-red-500 focus:ring-red-500",
              triggerClassName
            )}
          >
            <span className={cn("flex items-center gap-2 truncate", !selectedOption && "text-gray-500")}>
              {selectedOption ? (
                <>
                  {selectedOption.flagUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={selectedOption.flagUrl} alt="" className="w-5 h-3.5 object-cover" />
                  )}
                  <span>{selectedOption.shortLabel || selectedOption.label}</span>
                </>
              ) : placeholder}
            </span>
            <LuChevronDown className="text-base opacity-50 shrink-0" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className={cn(
              "w-[var(--radix-dropdown-menu-trigger-width)] bg-[#1a1b1e] border border-white/20 text-white p-0 overflow-hidden",
              contentClassName
            )}
            align="start"
          >
            {shouldShowSearch && (
              <div className="sticky top-0 bg-[#1a1b1e] border-b border-white/20 p-2 z-10">
                <div className="relative">
                  <LuSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-base text-gray-500" />

                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    autoFocus={open}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full h-8 pl-8 pr-2 rounded bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 outline-none focus:border-white/30 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (e.key === "Tab" || e.key === "ArrowDown") {
                        e.preventDefault();
                        const first = optionsContainerRef.current?.querySelector('[role="menuitem"]') as HTMLElement | null;
                        first?.focus();
                      }
                    }}
                  />
                </div>
              </div>
            )}

            <div
              ref={optionsContainerRef}
              data-lenis-prevent
              className="max-h-[280px] w-full overflow-y-auto"
              onScroll={handleScroll}
            >
              {visibleOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No results found
                </div>
              ) : (
                visibleOptions.map((option, index) => (
                  <DropdownMenuItem
                    key={`${option.value}-${index}`}
                    onClick={() => {
                      onChange?.(option.value);
                      setSearchQuery("");
                      setOpen(false);
                    }}
                    className="cursor-pointer hover:bg-white/10 focus:bg-white/10 !text-white flex items-center gap-2 outline-none py-2 px-3 text-sm transition-colors"
                  >
                    {option.flagUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={option.flagUrl}
                        alt=""
                        className="w-5 h-3.5 object-cover shrink-0"
                      />
                    )}

                    <span className="truncate !text-white">
                      {option.label}
                    </span>
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

interface ControlledSelectDropdownProps<T extends FieldValues>
  extends Omit<SelectDropdownProps, 'value' | 'onChange'> {
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