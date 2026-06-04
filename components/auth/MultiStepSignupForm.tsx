"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, FormProvider, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stepper } from "@/components/ui/stepper";
import { useAppDispatch } from "@/store";
import { updateStartingStep, updateRegistrationData } from "@/store/slices/registrationSlice";
import { PrimaryBTN } from "@/components/common/PrimaryBTN";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { registerUser } from "@/lib/services/auth";
import type { RegistrationUserData } from "@/types";

// Schema, Types, and Step Configurations
import {
  signupSchema,
  steps,
  stepFields,
  type SignupFormData,
  type SecurityQuestionsCache,
} from "./signup-steps/schema";

// Custom Hooks
import { useMobileOtp } from "./signup-steps/hooks/useMobileOtp";
import { getQuesNoFromValue } from "./signup-steps/hooks/useSecurityQuestions";

// Step Components
import PersonalDetailsStep from "./signup-steps/PersonalDetailsStep";
import AddressStep from "./signup-steps/AddressStep";
import OtherInfoStep from "./signup-steps/OtherInfoStep";
import TermsStep from "./signup-steps/TermsStep";

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

// Transform form data to API format
function transformFormToApiData(
  data: SignupFormData,
  contractCode: string,
  currentStep: number,
  initialData: RegistrationUserData | undefined,
  cache: SecurityQuestionsCache,
): any {
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
    reset,
    formState: { errors },
    watch,
    control,
    setValue,
  } = methods;

  // Custom Hook for SMS OTP Verification Flow
  const {
    isMobileOtpSent,
    isMobileVerified,
    isSendingOtp,
    isVerifyingOtp,
    otpCountdown,
    handleSendOtp,
    handleResendOtp,
    handleVerifyOtp,
  } = useMobileOtp({ watch, setValue, contractCode });

  // Reset form with persisted data when initialData changes (after Redux rehydrate)
  useEffect(() => {
    if (initialData) {
      const values = mapInitialDataToForm(initialData, preverifiedEmail);
      reset(values);
    }
  }, [initialData, preverifiedEmail, reset]);

  const consent = watch("consent");

  // Update current step when initialStep changes (after Redux rehydrate)
  useEffect(() => {
    setCurrentStep(Math.min(Math.max(initialStep, 1), steps.length));
  }, [initialStep]);

  const validateStep = async (step: number) => {
    const fields = stepFields[step - 1] || [];
    return trigger(fields as (keyof SignupFormData)[]);
  };

  const saveProgress = async (formData: SignupFormData, stepToSave: number, cache: SecurityQuestionsCache): Promise<boolean> => {
    if (!contractCode) return false;

    setIsSaving(true);
    try {
      const apiData = transformFormToApiData(formData, contractCode, stepToSave, initialData, cache);
      const response = await registerUser(apiData);

      if (response.status) {
        console.log("Progress saved:", response.data);
        if (response.data) {
          dispatch(updateRegistrationData(response.data as unknown as RegistrationUserData));
        }
        return true;
      } else {
        toast.error(response.message || "Failed to save progress");
        return false;
      }
    } catch (error) {
      console.error("Error saving progress:", error);
      toast.error("Failed to save progress. Please continue and try again.");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Security questions cache ref for lookup
  const securityCacheRef = useRef<SecurityQuestionsCache>({ group100: [], group200: [] });

  // Form container ref for scrolling
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Track previous data for each step to avoid unnecessary API calls
  const previousStepDataRef = useRef<Record<number, any>>({});

  const dispatch = useAppDispatch();

  const scrollToFirstError = (stepErrors: FieldErrors<SignupFormData>) => {
    // Get fields of the current step
    const fields = stepFields[currentStep - 1] || [];
    
    // Find the first field in the current step that has an error
    const firstErrorField = fields.find((field) => stepErrors[field as keyof SignupFormData]);
    
    if (firstErrorField) {
      // Try to get the DOM element from the React Hook Form register ref first
      const fieldRef = (methods.control as any)._fields[firstErrorField]?._f?.ref;
      
      if (fieldRef instanceof HTMLElement) {
        fieldRef.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        fieldRef.focus();
      } else {
        // Fallback to name attribute DOM query
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          
          if (element instanceof HTMLElement) {
            element.focus();
          }
        }
      }
    }
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < steps.length) {
      // Save progress for current step before moving to next
      const formData = methods.getValues();
      
      // Get the fields for the current step to compare
      const fields = stepFields[currentStep - 1] || [];
      const currentStepData: any = {};
      fields.forEach((field: string) => {
        currentStepData[field] = formData[field as keyof SignupFormData];
      });
      
      // Compare with previous data for this step
      const previousData = previousStepDataRef.current[currentStep];
      const dataChanged = JSON.stringify(currentStepData) !== JSON.stringify(previousData);
      
      let saveSuccess = true;
      
      // Only call API if data has changed
      if (dataChanged) {
        saveSuccess = await saveProgress(formData, currentStep, securityCacheRef.current);
        
        // Update previous data ref after successful save
        if (saveSuccess) {
          previousStepDataRef.current[currentStep] = currentStepData;
        }
      }
      
      // Only proceed to next step if save was successful (or no API call needed)
      if (saveSuccess) {
        // Save step and form data to Redux Persist
        dispatch(updateStartingStep(currentStep + 1));
        // Convert form data to RegistrationUserData format and save
        const apiData = transformFormToApiData(formData, contractCode || "", currentStep, initialData, securityCacheRef.current);
        dispatch(updateRegistrationData(apiData as unknown as RegistrationUserData));
        setCurrentStep((prev) => prev + 1);
      }
    } else if (!isValid) {
      setTimeout(() => {
        scrollToFirstError(methods.formState.errors);
      }, 50);
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
      const securityCache = { group100: [], group200: [] }; // Empty cache for final submit
      const apiData = transformFormToApiData(data, contractCode, steps.length, initialData, securityCache);
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
    <PersonalDetailsStep
      key="1"
      control={control}
      preverifiedEmail={preverifiedEmail}
      isMobileOtpSent={isMobileOtpSent}
      isMobileVerified={isMobileVerified}
      isSendingOtp={isSendingOtp}
      isVerifyingOtp={isVerifyingOtp}
      otpCountdown={otpCountdown}
      handleSendOtp={handleSendOtp}
      handleResendOtp={handleResendOtp}
      handleVerifyOtp={handleVerifyOtp}
      watch={watch}
    />,
    <AddressStep key="2" control={control} />,
    <OtherInfoStep key="3" control={control} onCacheUpdate={(cache) => { securityCacheRef.current = cache; }} />,
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
        <form onSubmit={handleSubmit(onSubmit, (errors) => scrollToFirstError(errors))} className="space-y-6 max-w-5xl m-auto">
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
    </FormProvider>
  );
}

export default MultiStepSignupForm;
