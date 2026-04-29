"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MultiStepSignupForm } from "@/components/auth/MultiStepSignupForm";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const handleSuccess = () => {
    toast.success("Registration successful! Please login.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] px-4 py-12">
      <div className="max-w-7xl mx-auto mt-12">
        {/* Multi-Step Form */}
        <MultiStepSignupForm
          onSubmitSuccess={handleSuccess}
          className="bg-[#0b0f19]/50 backdrop-blur-sm p-6 sm:p-8"
        />

        {/* Login Link */}
        <p className="text-center text-gray-400 text-sm mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-[#00D094] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
