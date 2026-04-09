"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, secure } from "@/lib/services/auth";
import { setCredentials } from "@/store/slices/authSlice";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setServerError("");

    try {
      const response = await login(data);
      
      if (response.status !== 'success') {
        throw new Error(response.message || "Login failed");
      }

      const responseData = response.data || (response as any).Data;
      const jwtToken = responseData.jwtToken || responseData.JwtToken;
      const refreshToken = responseData.refreshToken || responseData.RefreshToken;
      const user = responseData.user || responseData.User;

      // Store tokens in Redux/LocalStorage
      dispatch(setCredentials({ 
        user,
        jwtToken,
        refreshToken,
        isAuthenticated: true 
      }));

      router.push("/");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] px-4">
      <Card className="w-full max-w-md bg-[#0b0f19] border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm text-gray-300">Email</label>
              <Input
                type="email"
                {...register("email")}
                error={errors.email?.message}
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-300">Password</label>
              <Input
                type="password"
                {...register("password")}
                error={errors.password?.message}
                placeholder="Enter your password"
              />
            </div>
            {serverError && (
              <p className="text-red-400 text-sm">{serverError}</p>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              variant="auth"
              className="w-full"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p className="text-center text-gray-400 text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#00D094] hover:underline">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
