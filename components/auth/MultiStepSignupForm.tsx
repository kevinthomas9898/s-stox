"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { TextInput, PhoneInput } from "@/components/common/TextInput";
import { SelectDropdown, type SelectOption } from "@/components/common/SelectDropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { FiCheck } from "react-icons/fi";

// Hook to fetch countries with flags
function useCountries() {
  const [options, setOptions] = useState<SelectOption[]>([
    { value: "US", label: "United States (US)", shortLabel: "🇺🇸 United States (US)", flagUrl: "https://flagcdn.com/w40/us.png" },
  ]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flags");
        const data = await res.json();

        const formattedOptions = data
          .map((country: { name?: { common?: string }; cca2?: string; flags?: { png?: string; svg?: string } }) => {
            const name = country.name?.common || "";
            const code = country.cca2 || "";
            const flagUrl = country.flags?.png || country.flags?.svg || "";

            return {
              label: `${name} (${code})`,
              shortLabel: `${name} (${code})`,
              value: code,
              flagUrl,
              _sortName: name,
            };
          })
          .sort((a: { _sortName: string }, b: { _sortName: string }) => a._sortName.localeCompare(b._sortName))
          .map(({ _sortName, ...rest }: { _sortName: string;[key: string]: unknown }) => rest);

        setOptions(formattedOptions);
      } catch (e) {
        console.error("Failed to fetch countries", e);
      }
    }
    fetchCountries();
  }, []);

  return options;
}

const titleOptions = [
  { value: "Mr", label: "Mr" },
  { value: "Mrs", label: "Mrs" },
  { value: "Ms", label: "Ms" },
  { value: "Miss", label: "Miss" },
  { value: "Dr", label: "Dr" },
  { value: "Prof", label: "Prof" },
];

const steps = ["Personal Details", "Address", "Other Info", "Terms & Condition"];

const stepFields = [
  ["consent", "title", "firstName", "surname", "countryCode", "mobileNumber", "email", "dateOfBirth"],
  ["addressLine1", "city", "state", "postalCode", "country"],
  ["password", "confirmPassword", "securityQuestion1", "securityAnswer1", "securityQuestion2", "securityAnswer2", "kycDocument", "kycDocumentNumber", "referralCode"],
  ["agreeToTerms"],
];

const signupSchema = z.object({
  consent: z.boolean().refine((v) => v, { message: "Consent required" }),
  title: z.string().min(1, "Title is required"),
  firstName: z.string().min(1, "First name is required"),
  middleNames: z.string().optional(),
  surname: z.string().min(1, "Surname is required"),
  countryCode: z.string().min(1, "Country code is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  email: z.string().email("Please enter a valid email address"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  securityQuestion1: z.string().min(1, "Security question is required"),
  securityAnswer1: z.string().min(1, "Answer is required"),
  securityQuestion2: z.string().min(1, "Security question is required"),
  securityAnswer2: z.string().min(1, "Answer is required"),
  kycDocument: z.string().min(1, "KYC document type is required"),
  kycDocumentNumber: z.string().min(1, "Document number is required"),
  referralCode: z.string().optional(),
  agreeToTerms: z.boolean().refine((v) => v, { message: "You must agree to the terms" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

interface MultiStepSignupFormProps {
  onSubmitSuccess?: () => void;
  className?: string;
}

export function MultiStepSignupForm({ onSubmitSuccess, className }: MultiStepSignupFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      consent: false,
      title: "",
      firstName: "",
      middleNames: "",
      surname: "",
      countryCode: "US",
      mobileNumber: "",
      email: "",
      dateOfBirth: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      password: "",
      confirmPassword: "",
      securityQuestion1: "",
      securityAnswer1: "",
      securityQuestion2: "",
      securityAnswer2: "",
      kycDocument: "",
      kycDocumentNumber: "",
      referralCode: "",
      agreeToTerms: false,
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
    control,
  } = methods;

  const consent = watch("consent");

  const validateStep = async (step: number) => {
    const fields = stepFields[step - 1] || [];
    return trigger(fields as any);
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);

    try {
      // Submit to backend API - implement this later
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: currentStep,
          data: data,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      toast.success("Account created successfully!");
      onSubmitSuccess?.();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepComponents = [
    <PersonalDetailsStep key="1" control={control} />,
    <AddressStep key="2" control={control} />,
    <OtherInfoStep key="3" control={control} />,
    <TermsStep key="4" control={control} />,
  ];

  return (
    <FormProvider {...methods}>
      <div className={cn("w-full mx-auto", className)}>
        {/* Stepper - Sticky */}
        <div className="sticky top-20 z-30 bg-[#0b0f19]/95 backdrop-blur-sm py-4 -mx-4 px-4 sm:-mx-8 sm:px-8 mb-8">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-5xl m-auto">
          {/* Step Content */}
          <div className="min-h-[400px]">{stepComponents[currentStep - 1]}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 w-fit m-auto gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
              className="bg-transparent border-white/60 text-white hover:bg-white/10 hover:text-white disabled:opacity-50"
            >
              Back
            </Button>

            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!consent || isSubmitting}
                className="bg-[#2A73EA] hover:bg-[#1a5fc7] text-white px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#2A73EA] hover:bg-[#1a5fc7] text-white px-8"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

function PersonalDetailsStep({ control }: { control: Control<SignupFormData> }) {
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

        <PhoneInput
          name="mobileNumber"
          control={control}
          countryCodeName="countryCode"
          label="Mobile Number"
          placeholder="00000 00000"
          type="tel"
          inputMode="numeric"
          maxLength={15}
        />

        <TextInput name="email" control={control} label="Email Address" placeholder="Enter email address" type="email" />

        <DatePicker name="dateOfBirth" control={control} label="Date of Birth" placeholder="DD / MM / YYYY" />
        <p className="text-xs text-gray-500">You must be 18 years or older to use this platform</p>
      </div>
    </div>
  );
}

// Step 2: Address
function AddressStep({ control }: { control: Control<SignupFormData> }) {
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

// Step 3: Other Info
function OtherInfoStep({ control }: { control: Control<SignupFormData> }) {
  const securityQuestionOptions = [
    { value: "movie", label: "What is your favorite movie?" },
    { value: "pet", label: "What was the name of your first pet?" },
    { value: "school", label: "What is the name of your elementary school?" },
    { value: "mother", label: "What is your mother's maiden name?" },
    { value: "city", label: "What city were you born in?" },
    { value: "car", label: "What was your first car?" },
    { value: "book", label: "What is your favorite book?" },
    { value: "teacher", label: "Who was your favorite teacher?" },
  ];

  const kycOptions = [
    { value: "passport", label: "Passport" },
    { value: "license", label: "Driving License" },
    { value: "id-card", label: "National ID Card" },
    { value: "residence", label: "Residence Permit" },
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
        options={securityQuestionOptions}
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
        options={securityQuestionOptions}
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
        subLabel={<FiCheck className="w-4 h-4 text-[#00D094] inline ml-1" />}
        placeholder="Select document type"
        options={kycOptions}
      />
      <TextInput
        name="kycDocumentNumber"
        control={control}
        label="KYC Document Number"
        rightIcon={<FiCheck className="w-4 h-4 text-[#00D094]" />}
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

// Step 4: Terms & Conditions
function TermsStep({ control }: { control: Control<SignupFormData> }) {
  const termsList = [
    "Confirm my understanding that SmartStox is software provider, and not an investment product.",
    "Confirm that SmartStox does not provide financial advice.",
    "I hereby accept that my funds will remain with a licensed broker and that SmartStox does not control my funds.",
    "Accept that Trading involves risk of loss, and risk of losing all my capital.",
    "Acknowledge that past performance does not guarantee future results.",
    "Accept the performance-based fees charged via my broker, as published on the SmartStox website from time to time.",
    "I authorize my broker to execute trades and deduct the agreed fees.",
    "Acknowledge my understanding of the terms of the 3-month Demo trial period and refund conditions.",
    "Accept the SmartStox Terms of Service, as published on the SmartStox website from time to time.",
  ];

  return (
    <div className="space-y-6">
      {/* Terms List */}
      <div className="bg-[#1a1b1e] rounded-lg p-4 border border-white/10">
        <h4 className="text-white font-semibold mb-3 underline">I hereby:</h4>
        <ul className="space-y-2 text-sm text-gray-400">
          {termsList.map((term, index) => (
            <li key={index} className="flex gap-2">
              <span className="text-gray-500">•</span>
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Agreement Checkbox */}
      <Checkbox
        name="agreeToTerms"
        control={control}
        label="I hereby agree to all the above."
      />

      {/* Legal Note */}
      <p className="text-xs text-gray-400">
        By clicking this button, I accept and agree that I am entering into a legally binding agreement.
      </p>
    </div>
  );
}

export default MultiStepSignupForm;
