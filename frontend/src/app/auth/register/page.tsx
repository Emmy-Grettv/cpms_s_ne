"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      toast.info("You are already logged in");
      router.push("/dashboard");
    }
  });

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const success = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: "user",
      });
      if (success) {
        toast.success("Registration successful!", {
          description: "You can now log in.",
        });
        router.push("/auth/login");
      }
    } catch (error) {
      toast.error("Registration failed", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md space-y-8 border border-sky-200"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-sky-700">Create Account</h1>
          <p className="text-sky-600">Fill in the details to get started</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-sky-800 mb-2">
              First Name
            </label>
            <Input {...formRegister("firstName")} />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-sky-800 mb-2">
              Last Name
            </label>
            <Input {...formRegister("lastName")} />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-sky-800 mb-2">
              Email
            </label>
            <Input type="email" {...formRegister("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-sky-800 mb-2">
              Password
            </label>
            <Input type="password" {...formRegister("password")} />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-6 w-6 mr-2 text-current"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Creating Account...
            </div>
          ) : (
            "Complete Registration"
          )}
        </Button>

        <div className="text-center space-y-4">
          <p className="text-sm text-sky-700">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium underline hover:text-sky-900"
            >
              Sign in
            </Link>
          </p>
        
        </div>
      </form>
    </div>
  );
}
