"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MultiStepSignupForm } from "@/components/auth/MultiStepSignupForm";
import EmailVerification from "@/components/auth/EmailVerification";
import { FadeIn } from "@/components/animations";
import { useAppSelector, useAppDispatch } from "@/store";
import {
  setRegistrationProgress,
  clearRegistration,
} from "@/store/slices/registrationSlice";
import type { RegistrationUserData } from "@/types";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Get persisted registration state from Redux
  const {
    verifiedEmail,
    contractCode,
    registrationData,
    startingStep,
    // isInProgress,
  } = useAppSelector((state) => state.registration);

  const handleSuccess = () => {
    // Clear registration state on success
    dispatch(clearRegistration());
    router.push("/login");
  };

  const handleEmailVerified = (
    email: string,
    code: string,
    savedData?: RegistrationUserData,
    savedStep?: number,
  ) => {
    // Save to Redux (persisted)
    dispatch(
      setRegistrationProgress({
        verifiedEmail: email,
        contractCode: code,
        registrationData: savedData,
        startingStep: savedStep || 1,
      }),
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] px-4 flex items-center justify-center">
      <div className="w-full">
        <FadeIn direction="up" duration={0.5}>
          {!verifiedEmail ? (
            /* Email Verification Step */
            <div className="p-6 sm:p-8 rounded-lg">
              <EmailVerification onVerified={handleEmailVerified} />
            </div>
          ) : (
            /* Signup Form Step */
            <div className="mt-12">
              <MultiStepSignupForm
                onSubmitSuccess={handleSuccess}
                preverifiedEmail={verifiedEmail}
                contractCode={contractCode}
                initialStep={startingStep}
                initialData={registrationData || undefined}
                className="bg-[#0b0f19]/50 backdrop-blur-sm p-6 sm:p-8"
              />
            </div>
          )}

          {/* Login Link */}
          <p className="text-center text-gray-400 text-sm my-8">
            Already have an account?{" "}
            <Link href="/login" className="text-[#00D094] hover:underline">
              Login
            </Link>
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
