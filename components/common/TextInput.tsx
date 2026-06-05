"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  SelectDropdownBase,
  SelectOption,
} from "./SelectDropdown";

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftElement?: React.ReactNode;
}

const TextInputBase = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    { className, type, error, label, rightIcon, leftElement, ...props },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="flex relative w-full items-center">
          {leftElement && <div className="mr-2 shrink-0">{leftElement}</div>}
          <div className="relative w-full">
            <input
              type={inputType}
              className={cn(
                "flex h-12 w-full rounded-md border border-white/60 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 outline-none",
                error &&
                "border-red-500 ring-1 ring-red-500 focus:ring-red-500",
                (isPassword || rightIcon) && "pr-10",
                className,
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
            {!isPassword && rightIcon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                {rightIcon}
              </div>
            )}
          </div>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);
TextInputBase.displayName = "TextInputBase";

// Controlled version for react-hook-form
interface ControlledTextInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: React.ReactNode;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  rightIcon?: React.ReactNode;
  leftElement?: React.ReactNode;
}

function TextInput<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  disabled,
  rightIcon,
  leftElement,
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
          rightIcon={rightIcon}
          leftElement={leftElement}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

// Optionally, export a specific PhoneInput component to match the SS exactly.
export interface PhoneInputBaseProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: React.ReactNode;
  countryCodeOptions?: SelectOption[];
  countryCodeValue?: string;
  onCountryCodeChange?: (value: string) => void;
}

export function useCountryCodes() {
  const [options, setOptions] = React.useState<SelectOption[]>([
    { label: "🇺🇸 +1 (United States)", shortLabel: "🇺🇸 +1", value: "+1", cca2: "US", flagUrl: "https://flagcdn.com/w40/us.png" },
  ]);

  React.useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flag,idd,cca2,flags");
        const data = await res.json();

        const formattedOptions = data
          .filter((country: { idd?: { root?: string; suffixes?: string[] } }) => country.idd && country.idd.root)
          .map((country: { flag?: string; idd?: { root?: string; suffixes?: string[] }; name?: { common?: string }; flags?: { png?: string; svg?: string }; cca2?: string }) => {
            const root = country.idd?.root || "";
            const suffix = country.idd?.suffixes && country.idd.suffixes.length === 1 ? country.idd.suffixes[0] : "";
            const dialCode = `${root}${suffix}`;
            const flag = country.flag || "";
            const name = country.name?.common || "";
            const flagUrl = country.flags?.png || country.flags?.svg || "";

            return {
              label: `${flag} ${dialCode} (${name})`,
              shortLabel: `${flag} ${dialCode}`,
              value: dialCode,
              cca2: country.cca2,
              _sortName: name,
              flagUrl,
            };
          })
          .sort((a: { _sortName: string }, b: { _sortName: string }) => a._sortName.localeCompare(b._sortName))
          .map((opt: { _sortName?: string; [key: string]: unknown }) => {
            const rest = { ...opt };
            delete rest._sortName;
            return rest as unknown as SelectOption & { cca2?: string };
          });

        setOptions(formattedOptions);
      } catch (e) {
        console.error("Failed to fetch country codes", e);
      }
    }
    fetchCountries();
  }, []);

  return options;
}

const PhoneInputBase = React.forwardRef<HTMLInputElement, PhoneInputBaseProps>(
  (
    {
      className,
      error,
      label,
      countryCodeOptions,
      countryCodeValue,
      onCountryCodeChange,
      ...props
    },
    ref,
  ) => {
    const fetchedOptions = useCountryCodes();
    const finalOptions = countryCodeOptions && countryCodeOptions.length > 0 ? countryCodeOptions : fetchedOptions;

    React.useEffect(() => {
      if (countryCodeValue && countryCodeValue.length === 2 && fetchedOptions.length > 1) {
        const matchingOption = fetchedOptions.find(opt => opt.cca2 === countryCodeValue.toUpperCase());
        if (matchingOption && matchingOption.value !== countryCodeValue) {
          onCountryCodeChange?.(matchingOption.value);
        }
      }
    }, [countryCodeValue, fetchedOptions, onCountryCodeChange]);

    return (
      <TextInputBase
        label={label}
        error={error}
        type="tel"
        ref={ref}
        leftElement={
          <div className="w-[135px]">
            <SelectDropdownBase
              options={finalOptions}
              value={countryCodeValue}
              onChange={onCountryCodeChange}
              placeholder="+1"
            />
          </div>
        }
        className={className}
        {...props}
        onChange={(e) => {
          let value = e.target.value;

          // allow only digits
          value = value.replace(/\D/g, "");

          // enforce maxLength manually
          if (props.maxLength) {
            value = value.slice(0, props.maxLength);
          }

          // update value
          e.target.value = value;
          props.onChange?.(e);
        }}
      />
    );
  },
);
PhoneInputBase.displayName = "PhoneInputBase";

interface ControlledPhoneInputProps<T extends FieldValues> extends Omit<
  PhoneInputBaseProps,
  "value" | "onChange" | "countryCodeValue" | "onCountryCodeChange"
> {
  name: Path<T>;
  control: Control<T>;
  countryCodeName: Path<T>;
}

function PhoneInput<T extends FieldValues>({
  name,
  control,
  countryCodeName,
  ...props
}: ControlledPhoneInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: mobileField, fieldState }) => (
        <Controller
          name={countryCodeName}
          control={control}
          render={({ field: codeField }) => (
            <PhoneInputBase
              {...props}
              value={mobileField.value}
              onChange={mobileField.onChange}
              error={fieldState.error?.message}
              countryCodeValue={codeField.value}
              onCountryCodeChange={codeField.onChange}
            />
          )}
        />
      )}
    />
  );
}

export { TextInput, TextInputBase, PhoneInputBase, PhoneInput };
