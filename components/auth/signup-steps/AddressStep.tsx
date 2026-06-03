"use client";

import type { Control } from "react-hook-form";
import type { SignupFormData } from "./schema";
import { useCountries } from "./hooks/useCountries";
import { SelectDropdown } from "@/components/common/SelectDropdown";
import { TextInput } from "@/components/common/TextInput";

interface AddressStepProps {
  control: Control<SignupFormData>;
}

export function AddressStep({ control }: AddressStepProps) {
  const countries = useCountries();

  return (
    <div className="space-y-4">
      {/* Country */}
      <SelectDropdown
        name="country"
        control={control}
        label="Country"
        placeholder="Select country"
        options={countries}
        searchable
      />

      {/* Street Address */}
      <TextInput
        name="addressLine1"
        control={control}
        label="Street Address"
        placeholder="Street address"
      />

      {/* Apt, Suite or Unit */}
      <TextInput
        name="addressLine2"
        control={control}
        label="Apt, Suite or Unit"
        placeholder="Apt, Suite or Unit"
      />

      {/* City */}
      <TextInput name="city" control={control} label="City" placeholder="City" />

      {/* State and Zip Code */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          name="state"
          control={control}
          label="State"
          placeholder="State"
        />
        <TextInput
          name="postalCode"
          control={control}
          label="Zip Code"
          placeholder="Zip Code"
        />
      </div>
    </div>
  );
}

export default AddressStep;
