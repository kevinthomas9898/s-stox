"use client";

import { useEffect } from "react";
import type { Control } from "react-hook-form";
import type { SignupFormData, SecurityQuestionsCache } from "./schema";
import { useSecurityQuestions } from "./hooks/useSecurityQuestions";
import { SelectDropdown } from "@/components/common/SelectDropdown";
import { TextInput } from "@/components/common/TextInput";

interface OtherInfoStepProps {
  control: Control<SignupFormData>;
  onCacheUpdate?: (cache: SecurityQuestionsCache) => void;
}

export function OtherInfoStep({ control, onCacheUpdate }: OtherInfoStepProps) {
  const { questions, isLoading, cache } = useSecurityQuestions();

  useEffect(() => {
    onCacheUpdate?.(cache);
  }, [cache, onCacheUpdate]);

  const kycOptions = [
    { value: "PASSPORT", label: "Passport" },
    { value: "DRIVING_LICENSE", label: "Driving License" },
    { value: "NATIONAL_ID", label: "National ID Card" },
    { value: "VOTER_ID", label: "Voter ID" },
    { value: "PAN_CARD", label: "PAN Card" },
  ];

  return (
    <div className="space-y-4">
      {/* Password Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          name="password"
          control={control}
          label="Create Password"
          placeholder="Create a strong password"
          type="password"
        />
        <TextInput
          name="confirmPassword"
          control={control}
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
        />
      </div>

      {/* Security Question 1 */}
      <SelectDropdown
        name="securityQuestion1"
        control={control}
        label="Security Question 1"
        placeholder="Select security question"
        options={questions.group100}
        disabled={isLoading}
      />
      <TextInput
        name="securityAnswer1"
        control={control}
        label="Answer"
        placeholder="Write your answer..."
      />

      {/* Security Question 2 */}
      <SelectDropdown
        name="securityQuestion2"
        control={control}
        label="Security Question 2"
        placeholder="Select security question"
        options={questions.group200}
        disabled={isLoading}
      />
      <TextInput
        name="securityAnswer2"
        control={control}
        label="Answer"
        placeholder="Write your answer..."
      />

      {/* KYC Document */}
      <SelectDropdown
        name="kycDocument"
        control={control}
        label="KYC Document"
        placeholder="Select document type"
        options={kycOptions}
      />
      <TextInput
        name="kycDocumentNumber"
        control={control}
        label="KYC Document Number"
        placeholder="AB12 459826"
      />

      {/* Referral Code */}
      <TextInput
        name="referralCode"
        control={control}
        label="Referral Ambassador Code"
        placeholder="KHUPSH12345"
      />
    </div>
  );
}

export default OtherInfoStep;
