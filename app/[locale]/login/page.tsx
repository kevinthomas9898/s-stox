"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setCredentials } from "@/store/slices/authSlice";
import { setAuthCookies, getJwtToken, decodeJwt } from "@/lib/utils/cookies";
import { login } from "@/lib/services/auth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redirect if already logged in (has valid token cookie)
  useEffect(() => {
    const token = getJwtToken();
    if (token) {
      router.push('/');
    }
  }, [router]);
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
      const result = await login({ email: data.email, password: data.password });

      // Extract tokens from response
      const { jwtToken, refreshToken } = result.data || {};

      if (!jwtToken || !refreshToken) {
        throw new Error("Invalid response from server");
      }

      // Decode JWT to get user info
      const tokenPayload = decodeJwt(jwtToken);
      if (!tokenPayload) {
        throw new Error("Invalid JWT token");
      }
      const userId = tokenPayload.UserId || '';
      const userEmail = data.email;

      // Store tokens in cookies (with email for persistence)
      setAuthCookies(jwtToken, refreshToken, userEmail);

      // Store user info in Redux
      dispatch(setCredentials({
        user: { id: userId, email: userEmail, name: userEmail },
        isAuthenticated: true,
      }));

      toast.success("Login successful!");
      router.push("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
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
