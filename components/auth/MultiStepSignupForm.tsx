"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, FormProvider, type Control, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Stepper } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { PrimaryBTN } from "@/components/common/PrimaryBTN";
import { TextInput, PhoneInput } from "@/components/common/TextInput";
import { SelectDropdown, type SelectOption } from "@/components/common/SelectDropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { FiCheck } from "react-icons/fi";
import { registerUser, getUserSecurityQuestions } from "@/lib/services/auth";
import type { RegisterUserRequest, RegistrationUserData, SecurityQuestionItem } from "@/types";

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
  firstName: z.string().min(1, "First name is required").max(50, "First name too long"),
  middleNames: z.string().max(50, "Middle names too long").optional(),
  surname: z.string().min(1, "Surname is required").max(50, "Surname too long"),
  countryCode: z.string().min(1, "Country code is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  email: z.string().email("Please enter a valid email address"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  addressLine1: z.string().min(1, "Address line 1 is required").max(100, "Address too long"),
  addressLine2: z.string().max(50, "Address line 2 too long").optional(),
  city: z.string().min(1, "City is required").max(50, "City name too long"),
  state: z.string().min(1, "State/Province is required").max(50, "State name too long"),
  postalCode: z.string().min(1, "Postal code is required").max(20, "Postal code too long"),
  country: z.string().min(1, "Country is required"),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  securityQuestion1: z.string().min(1, "Security question is required"),
  securityAnswer1: z.string().min(1, "Answer is required").max(100, "Answer too long"),
  securityQuestion2: z.string().min(1, "Security question is required"),
  securityAnswer2: z.string().min(1, "Answer is required").max(100, "Answer too long"),
  kycDocument: z.string().min(1, "KYC document type is required"),
  kycDocumentNumber: z.string().min(5, "Document number must be at least 5 characters").max(50, "Document number too long"),
  referralCode: z.string().max(20, "Referral code too long").optional(),
  tsCsAccepted: z.boolean().refine((v) => v, { message: "You must agree to the terms" }),
}).refine((data) => {
  // Only validate password match if password is being set (on step 3+ when fields are visible)
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => {
  // Only require password when fields are visible (step 3) - check by seeing if we're in final submit context
  // This validation only runs if password is expected to be set
  if (data.password && data.password.length < 4) {
    return false;
  }
  return true;
}, {
  message: "Password must be at least 4 characters",
  path: ["password"],
}).refine((data) => {
  // Check if confirm password is provided when password is set
  if (data.password && !data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Please confirm your password",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

interface MultiStepSignupFormProps {
  onSubmitSuccess?: () => void;
  className?: string;
  preverifiedEmail?: string;
  contractCode?: string;
  initialStep?: number;
  initialData?: RegistrationUserData;
}

// Map API data to form format
function mapInitialDataToForm(data: RegistrationUserData | undefined, preverifiedEmail?: string): Partial<SignupFormData> {
  if (!data) {
    return {
      email: preverifiedEmail || "",
    };
  }

  return {
    consent: data.isEmailVerified || false,
    title: data.title || "",
    firstName: data.firstName || "",
    middleNames: data.middleNames || "",
    surname: data.surname || "",
    countryCode: data.mobileCountryCode || "US", // Page 1: Mobile country code
    mobileNumber: data.mobileNumber || "",
    email: data.emailAddress || preverifiedEmail || "",
    dateOfBirth: data.dateOfBirth || "",
    addressLine1: data.streetAddress || "",
    addressLine2: data.aptSuiteOrUnit || "",
    city: data.city || "",
    state: data.state || "",
    postalCode: data.zipCode || "",
    country: data.country || "", // Page 2: Address country
    password: "",
    confirmPassword: "",
    securityQuestion1: data.userSecurityQues?.[0]?.securityQuestionValue || "",
    securityAnswer1: data.userSecurityQues?.[0]?.securityQuestionAnswer || "",
    securityQuestion2: data.userSecurityQues?.[1]?.securityQuestionValue || "",
    securityAnswer2: data.userSecurityQues?.[1]?.securityQuestionAnswer || "",
    kycDocument: data.kycDocument || "",
    kycDocumentNumber: data.kycDocumentNumber || "",
    referralCode: data.referralAmbassadorCode || "",
    tsCsAccepted: false,
  };
}

// Cache type for security questions
type SecurityQuestionsCache = {
  group100: SecurityQuestionItem[];
  group200: SecurityQuestionItem[];
};

// Transform form data to API format
function transformFormToApiData(
  data: SignupFormData,
  contractCode: string,
  currentStep: number,
  initialData: RegistrationUserData | undefined,
  cache: SecurityQuestionsCache,
  isFinalSubmit: boolean,
): RegisterUserRequest {
  return {
    registerUserEndpoint: "W", // 'W' for web platform
    registrationPage: String(currentStep),
    contractCode,
    title: data.title,
    firstName: data.firstName,
    middleNames: data.middleNames || "",
    surname: data.surname,
    mobileCountryCode: data.countryCode, // Page 1: Mobile country code
    mobileNumber: data.mobileNumber,       // Page 1: Mobile number
    emailAddress: data.email,
    dateOfBirth: data.dateOfBirth,
    country: data.country, // Page 2: Address country
    streetAddress: data.addressLine1,
    aptSuiteOrUnit: data.addressLine2 || "",
    city: data.city,
    state: data.state,
    zipCode: data.postalCode,
    createPassword: currentStep >= 3 ? (data.password || "") : "", // Send password on steps 3+ (when password field is shown)
    userSecurityQues: [
      {
        securityQuestion: getQuesNoFromValue(data.securityQuestion1, '100', cache),
        securityQuestionAnswer: data.securityAnswer1,
        securityQuestionValue: data.securityQuestion1,
      },
      {
        securityQuestion: getQuesNoFromValue(data.securityQuestion2, '200', cache),
        securityQuestionAnswer: data.securityAnswer2,
        securityQuestionValue: data.securityQuestion2,
      },
    ],
    kycDocument: data.kycDocument,
    kycDocumentNumber: data.kycDocumentNumber,
    referralAmbassadorCode: data.referralCode || "",
    isEmailVerified: true, // Email is verified before reaching this form
    tsCsAccepted: data.tsCsAccepted,
  };
}

export function MultiStepSignupForm({
  onSubmitSuccess,
  className,
  preverifiedEmail,
  contractCode,
  initialStep = 1,
  initialData,
}: MultiStepSignupFormProps) {
  const [currentStep, setCurrentStep] = useState(Math.min(Math.max(initialStep, 1), steps.length));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const initialFormValues = mapInitialDataToForm(initialData, preverifiedEmail);

  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      consent: initialFormValues.consent ?? false,
      title: initialFormValues.title ?? "",
      firstName: initialFormValues.firstName ?? "",
      middleNames: initialFormValues.middleNames ?? "",
      surname: initialFormValues.surname ?? "",
      countryCode: initialFormValues.countryCode ?? "US",
      mobileNumber: initialFormValues.mobileNumber ?? "",
      email: initialFormValues.email ?? "",
      dateOfBirth: initialFormValues.dateOfBirth ?? "",
      addressLine1: initialFormValues.addressLine1 ?? "",
      addressLine2: initialFormValues.addressLine2 ?? "",
      city: initialFormValues.city ?? "",
      state: initialFormValues.state ?? "",
      postalCode: initialFormValues.postalCode ?? "",
      country: initialFormValues.country ?? "",
      password: initialFormValues.password ?? "",
      confirmPassword: initialFormValues.confirmPassword ?? "",
      securityQuestion1: initialFormValues.securityQuestion1 ?? "",
      securityAnswer1: initialFormValues.securityAnswer1 ?? "",
      securityQuestion2: initialFormValues.securityQuestion2 ?? "",
      securityAnswer2: initialFormValues.securityAnswer2 ?? "",
      kycDocument: initialFormValues.kycDocument ?? "",
      kycDocumentNumber: initialFormValues.kycDocumentNumber ?? "",
      referralCode: initialFormValues.referralCode ?? "",
      tsCsAccepted: initialFormValues.tsCsAccepted ?? false,
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
    return trigger(fields as (keyof SignupFormData)[]);
  };

  const saveProgress = async (formData: SignupFormData, stepToSave: number, cache: SecurityQuestionsCache) => {
    if (!contractCode) return;

    setIsSaving(true);
    try {
      const apiData = transformFormToApiData(formData, contractCode, stepToSave, initialData, cache, false);
      const response = await registerUser(apiData);

      if (response.status) {
        // Progress saved successfully
        console.log("Progress saved:", response.data);
      } else {
        toast.error(response.message || "Failed to save progress");
      }
    } catch (error) {
      console.error("Error saving progress:", error);
      toast.error("Failed to save progress. Please continue and try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Security questions cache ref for lookup
  const securityCacheRef = useRef<SecurityQuestionsCache>({ group100: [], group200: [] });

  // Form container ref for scrolling
  const formContainerRef = useRef<HTMLDivElement>(null);

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < steps.length) {
      // Save progress for current step before moving to next
      const formData = methods.getValues();
      await saveProgress(formData, currentStep, securityCacheRef.current);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Scroll to top when step changes
  useEffect(() => {
    formContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentStep]);

  const onSubmit = async (data: SignupFormData) => {
    if (!contractCode) {
      toast.error("Contract code missing. Please restart registration.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit final registration data
      const securityCache = { group100: [] as SecurityQuestionItem[], group200: [] as SecurityQuestionItem[] }; // Empty cache for final submit
      const apiData = transformFormToApiData(data, contractCode, steps.length, initialData, securityCache, true);
      const response = await registerUser(apiData);

      if (response.status) {
        toast.success(response.data?.registrationComplete ? "Account created successfully!" : (response.message || "Registration saved!"));
        onSubmitSuccess?.();
      } else {
        toast.error(response.message || "Failed to create account");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepComponents = [
    <PersonalDetailsStep key="1" control={control} preverifiedEmail={preverifiedEmail} />,
    <AddressStep key="2" control={control} />,
    <OtherInfoStep key="3" control={control} />,
    <TermsStep key="4" control={control} errors={errors} />,
  ];

  return (
    <FormProvider {...methods}>
      <div ref={formContainerRef} className={cn("w-full mx-auto scroll-mt-32", className)}>
        {/* Stepper - Sticky */}
        <div className="sticky top-20 z-30 bg-[#0b0f19]/95 backdrop-blur-sm py-4 -mx-4 px-4 sm:-mx-8 sm:px-8 mb-8">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-5xl m-auto">
          {/* Step Content */}
          <div className="min-h-[400px]">{stepComponents[currentStep - 1]}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center pt-6 w-fit m-auto gap-3">
            <PrimaryBTN
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
              className="bg-transparent w-fit px-8 border-white/60 text-white hover:bg-white/10 hover:text-white disabled:opacity-50"
            >
              Previous
            </PrimaryBTN>

            {currentStep < steps.length ? (
              <PrimaryBTN
                type="button"
                onClick={handleNext}
                disabled={(currentStep === 1 && !consent) || isSubmitting || isSaving}
                loading={isSaving}
                className="bg-[#2A73EA] w-fit hover:bg-[#1a5fc7] text-white px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </PrimaryBTN>
            ) : (
              <PrimaryBTN
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
                className="bg-[#2A73EA] w-fit hover:bg-[#1a5fc7] text-white px-8"
              >
                Activate SmartStox
              </PrimaryBTN>
            )}

          </div>
        </form>
      </div>
      {/* Hidden component to fetch security questions and update cache */}
      <SecurityQuestionsLoader onCacheUpdate={(cache) => { securityCacheRef.current = cache; }} />
    </FormProvider>
  );
}

function PersonalDetailsStep({ control, preverifiedEmail }: { control: Control<SignupFormData>; preverifiedEmail?: string }) {
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

        <TextInput
          name="email"
          control={control}
          label="Email Address"
          placeholder={preverifiedEmail ? preverifiedEmail : "Enter email address"}
          type="email"
          disabled={!!preverifiedEmail}
        />
        {preverifiedEmail && (
          <p className="text-xs text-green-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Email verified
          </p>
        )}

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

// Hook to fetch security questions from API
function useSecurityQuestions() {
  const [questions, setQuestions] = useState<{
    group100: SelectOption[];
    group200: SelectOption[];
  }>({ group100: [], group200: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<SecurityQuestionsCache>({ group100: [], group200: [] });

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await getUserSecurityQuestions('ENG', '0002');
        if (response.status && response.data) {
          // Cache raw data for value lookup
          cacheRef.current = {
            group100: response.data['100'] || [],
            group200: response.data['200'] || [],
          };

          // Map to dropdown options using value field
          const mapToOptions = (items: SecurityQuestionItem[]): SelectOption[] =>
            items.map((item) => ({
              value: item.value, // Use value (10, 20, 30) as the option value
              label: item.label,
            }));

          setQuestions({
            group100: mapToOptions(response.data['100'] || []),
            group200: mapToOptions(response.data['200'] || []),
          });
        }
      } catch (error) {
        console.error('Failed to fetch security questions:', error);
        setError('Failed to load security questions');
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  return { questions, isLoading, error, cache: cacheRef.current };
}

// Helper to get quesNo from value in specific group
function getQuesNoFromValue(value: string, group: '100' | '200', cache: SecurityQuestionsCache): string {
  const questions = group === '100' ? cache.group100 : cache.group200;
  const question = questions.find((q) => q.value === value);
  return question?.quesNo || (group === '100' ? '100' : '200');
}

// Component to load security questions and notify parent of cache updates
function SecurityQuestionsLoader({ onCacheUpdate }: { onCacheUpdate: (cache: SecurityQuestionsCache) => void }) {
  const { error, cache } = useSecurityQuestions();

  useEffect(() => {
    onCacheUpdate(cache);
  }, [cache, onCacheUpdate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return null;
}

// Step 3: Other Info
function OtherInfoStep({ control, onCacheUpdate }: { control: Control<SignupFormData>; onCacheUpdate?: (cache: SecurityQuestionsCache) => void }) {
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
function TermsStep({ control, errors }: { control: Control<SignupFormData>; errors: FieldErrors<SignupFormData> }) {
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
        name="tsCsAccepted"
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
