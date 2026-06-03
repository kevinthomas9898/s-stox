"use client";

import { useFormState, type Control, type UseFormWatch } from "react-hook-form";
import type { SignupFormData } from "./schema";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectDropdown } from "@/components/common/SelectDropdown";
import { TextInput, PhoneInput } from "@/components/common/TextInput";
import { DatePicker } from "@/components/ui/date-picker";
import { PrimaryBTN } from "@/components/common/PrimaryBTN";
import { FaCheck } from "react-icons/fa";
import { titleOptions } from "./schema";
import { cn } from "@/lib/utils";

interface PersonalDetailsStepProps {
  control: Control<SignupFormData>;
  preverifiedEmail?: string;
  isMobileOtpSent: boolean;
  isMobileVerified: boolean;
  isSendingOtp: boolean;
  isVerifyingOtp: boolean;
  otpCountdown: number;
  handleSendOtp: () => void;
  handleResendOtp: () => void;
  handleVerifyOtp: () => void;
  watch: UseFormWatch<SignupFormData>;
}

export function PersonalDetailsStep({
  control,
  preverifiedEmail,
  isMobileOtpSent,
  isMobileVerified,
  isSendingOtp,
  isVerifyingOtp,
  otpCountdown,
  handleSendOtp,
  handleResendOtp,
  handleVerifyOtp,
  watch,
}: PersonalDetailsStepProps) {
  const { errors } = useFormState({ control });
  const otpValue = watch("mobileNumberOTP") || "";

  return (
    <div className="space-y-6">
      <div className="bg-[#1a1b1e] rounded-lg p-4 border border-white/10">
        <p className="text-sm text-gray-400 mb-4">
          SmartStox respects your privacy and requires your consent before collecting
          any personal information.
        </p>
        <Checkbox
          name="consent"
          control={control}
          label="I agree to providing SmartStox with my personal information."
        />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
          <SelectDropdown
            name="title"
            control={control}
            label="Title"
            placeholder="Select"
            options={titleOptions}
            className="sm:col-span-1"
          />
          <div className="sm:col-span-3">
            <TextInput name="firstName" control={control} label="First Name" placeholder="Enter first name" />
          </div>
        </div>

        <TextInput name="middleNames" control={control} label="Middle Names" placeholder="Enter middle names (optional)" />
        <TextInput name="surname" control={control} label="Surname" placeholder="Enter surname" />

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <div className="flex-grow">
              <PhoneInput
                name="mobileNumber"
                control={control}
                countryCodeName="countryCode"
                label={
                  <span className="flex items-center gap-1.5 font-medium text-gray-300">
                    Mobile Number
                    {isMobileVerified && (
                      <span className="bg-[#4CAF50] rounded-full p-0.5 inline-flex items-center justify-center shrink-0">
                        <FaCheck className="text-white w-2 h-2 text-[8px]" />
                      </span>
                    )}
                  </span>
                }
                placeholder="00000 00000"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                minLength={10}
                disabled={isMobileVerified}
              />
            </div>
            <PrimaryBTN
              type="button"
              onClick={handleSendOtp}
              disabled={isMobileVerified || isSendingOtp || (isMobileOtpSent && otpCountdown > 0)}
              loading={isSendingOtp}
              className="h-12 w-full sm:w-[150px] shrink-0 rounded-lg text-center"
            >
              {isMobileOtpSent ? "Resend OTP" : "Send OTP"}
            </PrimaryBTN>
          </div>

          {isMobileOtpSent && !isMobileVerified && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                <p className="text-slate-400 leading-snug">
                  An OTP (One Time Password) has been sent to{" "}
                  <span className="font-semibold text-slate-200">
                    {watch("countryCode")} {watch("mobileNumber")}
                  </span>.
                  <br />
                  Please enter the OTP in the field below to verify your mobile number.
                </p>
                {otpCountdown > 0 ? (
                  <span className="text-slate-400 font-medium shrink-0 self-start sm:self-center">
                    Resend in{" "}
                    <span className="text-sky-400 font-bold">
                      00:{otpCountdown.toString().padStart(2, "0")}
                    </span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isSendingOtp}
                    className="h-8 w-auto text-xs px-3 rounded-lg border border-white/20 text-sky-400 hover:bg-white/10 self-start sm:self-center whitespace-nowrap font-bold"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                <TextInput
                  name="mobileNumberOTP"
                  label="Enter OTP here"
                  control={control}
                  type="tel"
                  placeholder="Enter OTP here"
                />
                <PrimaryBTN
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={otpValue.length < 6 || isVerifyingOtp}
                  loading={isVerifyingOtp}
                  className="h-12 w-full sm:w-[150px] shrink-0 rounded-lg"
                >
                  Verify OTP
                </PrimaryBTN>
              </div>
            </div>
          )}
        </div>

        <TextInput
          name="email"
          control={control}
          label={
            <span className="flex items-center gap-2">
              Email Address
              {preverifiedEmail && (
                <span className="bg-green-500 rounded-full p-0.5">
                  <FaCheck className="text-white w-2 h-2" />
                </span>
              )}
            </span>
          }
          placeholder={preverifiedEmail ? preverifiedEmail : "Enter email address"}
          type="email"
          disabled={!!preverifiedEmail}
        />

        <div className="flex flex-col space-y-1">
          <DatePicker
            name="dateOfBirth"
            control={control}
            label="Date of Birth"
            placeholder="DD / MM / YYYY"
            ageLimitMessage="You must be 18 years or older to use this platform"
          />
          {!errors.dateOfBirth && (
            <p className="text-xs text-gray-500">You must be 18 years or older to use this platform</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalDetailsStep;
