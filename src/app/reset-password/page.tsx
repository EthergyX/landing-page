// src/app/reset-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthFormContainer } from "@/components/auth/AuthFormContainer";
import { FormInput } from "@/components/form/FormInput";
import { FormButton } from "@/components/form/FormButton";
import { Alert } from "@/components/form/Alert";
import { useAuth } from "@/contexts/AuthContext";

export default function ResetPassword() {
  const { resetPassword, isLoading: authLoading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await resetPassword(email);

      if (error) {
        throw error;
      }

      setSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send password reset email.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormContainer 
      title="Reset Your Password" 
      highlight="Password"
    >
      {error && <Alert type="error" message={error} />}

      {success ? (
        <div className="text-center">
          <Alert 
            type="success" 
            message="Password reset email sent! Check your inbox for instructions to reset your password."
          />
          <div className="mt-6">
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition duration-300 inline-block"
            >
              Back to Login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />

          <FormButton
            type="submit"
            disabled={isLoading || authLoading}
            isLoading={isLoading || authLoading}
          >
            Send Reset Link
          </FormButton>

          <div className="text-center text-blue-100">
            <p>
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </form>
      )}
    </AuthFormContainer>
  );
}