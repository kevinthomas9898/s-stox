"use client";

import React, { useState } from "react";
import { TextInputBase } from "@/components/common/TextInput";
import { PrimaryBTN } from "@/components/common/PrimaryBTN";
import { Typography } from "@/components/common/typography";
import { toast } from "sonner";
import { z } from "zod";
import { verifyUser, verifyOtp } from "@/lib/services/auth";
import type { RegistrationUserData } from "@/types";

const emailSchema = z.string().email("Please enter a valid email address");
const verificationCodeSchema = z
  .string()
  .regex(/^\d{6}$/, "Please enter a valid 6-digit code");

interface EmailVerificationProps {
  onVerified: (
    email: string,
    contractCode: string,
    registrationData?: RegistrationUserData,
    registrationPage?: number
  ) => void;
}

export default function EmailVerification({
  onVerified,
}: EmailVerificationProps) {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState<"email" | "verify">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [contractCode, setContractCode] = useState<string>("");

  // Handle timer countdown
  React.useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSendCode = async () => {
    const result = emailSchema.safeParse(email);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyUser(email);

      if (response.status && response.data) {
        const userData = response.data;

        // Existing user with completed registration
        if (
          userData.isExistingUser &&
          userData.isRegistrationCompleted
        ) {
          return;
        }

        // Existing user with saved progress
        if (userData.isExistingUser && userData.user) {
          const registrationPage =
            parseInt(userData.user.registrationPage, 10) || 1;

          onVerified(
            email,
            userData.user.contractCode,
            userData.user,
            registrationPage
          );

          return;
        }

        // Email already verified
        if (userData.isEmailVerified && userData.user) {
          onVerified(
            email,
            userData.user.contractCode,
            undefined,
            1
          );

          return;
        }

        // New user → OTP flow
        if (userData.user) {
          setContractCode(userData.user.contractCode);
          setStep("verify");
          setResendTimer(60);
          setResendCount((prev) => prev + 1);

          return;
        }

        toast.error("Unexpected response. Please try again.");
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    const result = verificationCodeSchema.safeParse(verificationCode);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    if (!contractCode) {
      toast.error(
        "Session expired. Please restart the verification process."
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyOtp({
        contractCode,
        email,
        otp: verificationCode,
      });

      if (response.status && response.data?.isValid) {
        const registrationPage =
          parseInt(response.data.registrationPage, 10) || 1;

        onVerified(
          email,
          response.data.contractCode,
          undefined,
          registrationPage
        );
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendTimer > 0) return;

    setIsLoading(true);

    try {
      const response = await verifyUser(email);

      if (response.status && response.data && response.data.user) {
        setContractCode(response.data.user.contractCode);
        setResendTimer(60);
        setResendCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error resending verification code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full mx-auto space-y-6 min-h-[50vh] flex flex-col justify-center max-w-2xl">
      <div className="text-center space-y-2">
        <Typography variant="h3" className="text-white">
          Verify <span className="text-[#2A73EA]">Email</span>
        </Typography>

        <Typography variant="p" className="text-gray-400 text-sm">
          Enter your email address to check your registration status.
        </Typography>
      </div>

      {step === "email" ? (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendCode();
          }}
        >
          <TextInputBase
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <div className="flex justify-center">
            <PrimaryBTN
              type="submit"
              loading={isLoading}
              disabled={!email}
              className="bg-[#10D078] hover:bg-[#10D078]/90 w-auto px-8 rounded-lg"
            >
              Check Email
            </PrimaryBTN>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {/* Email display */}
          <input
            type="email"
            value={email}
            disabled
            className="flex h-12 w-full rounded-md border border-white/60 bg-transparent px-3 py-2 text-sm text-white disabled:opacity-50 outline-none"
          />

          {/* OTP Message */}
          <p className="text-[#10D078] text-sm leading-relaxed">
            An OTP (One Time Password) has been sent to {email}. Please
            enter the OTP in the field below to verify your email.
          </p>

          {/* OTP Form */}
          <form
            className="flex gap-3 items-center pt-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify();
            }}
          >
            <TextInputBase
              type="text"
              placeholder="Enter OTP"
              value={verificationCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setVerificationCode(
                  e.target.value.replace(/\D/g, "").slice(0, 6)
                )
              }
              maxLength={6}
            />

            <PrimaryBTN
              type="submit"
              loading={isLoading}
              disabled={verificationCode.length !== 6}
              className="bg-[#10D078] hover:bg-[#10D078]/90 px-6 rounded-lg whitespace-nowrap w-fit"
            >
              Verify OTP
            </PrimaryBTN>
          </form>

          {/* Resend */}
          <div className="flex justify-end text-sm">
            {resendTimer > 0 ? (
              <span className="text-gray-400">
                Resend in{" "}
                <span className="text-[#10D078]">
                  {formatTimer(resendTimer)}
                </span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-[#10D078] hover:text-[#10D078]/80 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
              >
                Resend
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}