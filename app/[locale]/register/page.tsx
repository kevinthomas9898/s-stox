"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput } from "@/components/ui/TextInput";
import { PrimaryBTN } from "@/components/ui/PrimaryBTN";
import { toast } from "sonner";
import api from "@/lib/api/axiosInstance";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  confirmPassword: z.string().min(4, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    control,
    handleSubmit,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setServerError("");

    try {
      const response = await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      const result = response.data;

      if (result.status !== "success") {
        throw new Error(result.message || "Registration failed");
      }

      toast.success("Registration successful! Please login.");
      router.push("/login");
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Registration failed";
      setServerError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] px-4">
      <Card className="w-full max-w-md bg-[#0b0f19] border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextInput
              name="name"
              control={control}
              label="Name"
              placeholder="Enter your name"
            />
            <TextInput
              name="email"
              control={control}
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <TextInput
              name="password"
              control={control}
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <TextInput
              name="confirmPassword"
              control={control}
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
            />
            {serverError && (
              <p className="text-red-400 text-sm">{serverError}</p>
            )}
            <PrimaryBTN
              type="submit"
              loading={isLoading}
            >
              Register
            </PrimaryBTN>
          </form>
          <p className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-[#00D094] hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
