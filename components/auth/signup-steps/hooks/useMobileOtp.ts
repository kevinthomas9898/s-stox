import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { sendMobileOtp, resendOtp, verifyMobileOtp } from "@/lib/services/auth";
import type { UseFormWatch, UseFormSetValue } from "react-hook-form";
import type { SignupFormData } from "../schema";

interface UseMobileOtpProps {
  watch: UseFormWatch<SignupFormData>;
  setValue: UseFormSetValue<SignupFormData>;
  contractCode: string | undefined;
}

export function useMobileOtp({ watch, setValue, contractCode }: UseMobileOtpProps) {
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);

  const watchMobileNumber = watch("mobileNumber");
  const watchCountryCode = watch("countryCode");
  const otpValue = watch("mobileNumberOTP") || "";
  const prevMobileRef = useRef(watchMobileNumber);
  const prevCountryRef = useRef(watchCountryCode);

  // Reset verification states if mobile number or country code changes
  useEffect(() => {
    if (watchMobileNumber !== prevMobileRef.current || watchCountryCode !== prevCountryRef.current) {
      setIsMobileOtpSent(false);
      setIsMobileVerified(false);
      setValue("mobileNumberOTP", "");
      setOtpCountdown(0);
      prevMobileRef.current = watchMobileNumber;
      prevCountryRef.current = watchCountryCode;
    }
  }, [watchMobileNumber, watchCountryCode, setValue]);

  // Countdown timer useEffect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (otpCountdown > 0) {
      interval = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [otpCountdown]);

  const handleSendOtp = async () => {
    const email = watch("email");
    const mobileNumber = watch("mobileNumber");
    const countryCode = watch("countryCode");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address first.");
      return;
    }
    if (!mobileNumber || mobileNumber.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSendingOtp(true);
    try {
      const response = await sendMobileOtp({
        contractCode: contractCode || "",
        mobileNumber,
        countryCode,
        email,
      });

      if (response.status) {
        if (response.data?.isMobileVerified) {
          toast.success(response.message || "Mobile number already verified.");
          setIsMobileVerified(true);
          setIsMobileOtpSent(false);
          setOtpCountdown(0);
        } else {
          toast.success(response.message || "OTP sent successfully to your mobile number.");
          setIsMobileOtpSent(true);
          setOtpCountdown(30);
        }
      } else {
        toast.error(response.message || "Failed to send OTP. Please check your details.");
      }
    } catch (err) {
      console.error("Send OTP Error:", err);
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    const email = watch("email");
    if (!email) {
      toast.error("Email address is required.");
      return;
    }

    setIsSendingOtp(true);
    try {
      const response = await resendOtp({
        contractCode: contractCode || "",
        emailAddress: email,
      });

      if (response.status) {
        toast.success(response.message || "OTP resent successfully.");
        setOtpCountdown(30);
      } else {
        toast.error(response.message || "Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      console.error("Resend OTP Error:", err);
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    const email = watch("email");

    if (otpValue.length < 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const response = await verifyMobileOtp({
        contractCode: contractCode || "",
        email: email || "",
        otp: otpValue,
      });

      if (response.status) {
        toast.success(response.message || "Mobile number verified successfully!");
        setIsMobileVerified(true);
        setOtpCountdown(0);
      } else {
        toast.error(response.message || "Invalid OTP code. Please try again.");
      }
    } catch (err) {
      console.error("Verify OTP Error:", err);
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Verification failed. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return {
    isMobileOtpSent,
    isMobileVerified,
    isSendingOtp,
    isVerifyingOtp,
    otpCountdown,
    otpValue,
    handleSendOtp,
    handleResendOtp,
    handleVerifyOtp,
  };
}

export default useMobileOtp;
