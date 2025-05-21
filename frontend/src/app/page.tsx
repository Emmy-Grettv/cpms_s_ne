"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-sky-100">
      <h1 className="text-4xl font-bold text-sky-700 mb-10">Welcome to XWZ Ltd</h1>
      <div className="flex space-x-4">
        <Button
          variant="outline"
          className="border-sky-500 text-sky-700 hover:bg-sky-200"
          onClick={() => router.push("/auth/login")}
        >
          Login
        </Button>
        <Button
          className="bg-sky-600 text-white hover:bg-sky-700"
          onClick={() => router.push("/auth/register")}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
