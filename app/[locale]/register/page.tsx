"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/api/axiosInstance";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      const message = "Passwords do not match";
      setError(message);
      toast.error(message);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const result = response.data;

      if (result.status !== "success") {
        throw new Error(result.message || "Registration failed");
      }

      toast.success("Registration successful! Please login.");
      router.push("/login");
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Registration failed";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] px-4">
      <Card className="w-full max-w-md bg-[#0b0f19] border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:border-[#00D094]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:border-[#00D094]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:border-[#00D094]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white focus:outline-none focus:border-[#00D094]"
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00D094] text-gray-900 hover:bg-[#00c985]"
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
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
