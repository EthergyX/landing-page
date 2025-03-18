// src/app/register/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthFormContainer } from "@/components/auth/AuthFormContainer";
import { FormInput } from "@/components/form/FormInput";
import { FormButton } from "@/components/form/FormButton";
import { Alert } from "@/components/form/Alert";
import PasswordStrength from "@/components/PasswordStrength";
import { checkPassword } from "@/utils/passwordUtils";
import { useAuth } from "@/contexts/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function Register() {
  const router = useRouter();
  const { signUp, isLoading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [configWarning, setConfigWarning] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setConfigWarning("Warning: Supabase is not properly configured. Registration will not work.");
    }
  }, []);

  useEffect(() => {
    // Update password validity when password changes
    if (formData.password) {
      const { valid } = checkPassword(formData.password);
      setPasswordValid(valid);
    } else {
      setPasswordValid(false);
    }
    
    // Check if passwords match
    if (formData.confirmPassword) {
      setPasswordsMatch(formData.password === formData.confirmPassword);
    } else {
      setPasswordsMatch(true); // Reset match status when confirmPassword is empty
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate form
    if (!passwordsMatch) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (!passwordValid) {
      setError("Your password doesn't meet the minimum requirements.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signUp(
        formData.email, 
        formData.password, 
        formData.name
      );

      if (error) {
        setError(error.message);
        return;
      }

      // Redirect to confirmation page after successful registration
      router.push("/register/confirmation");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred during registration";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormContainer 
      title="Create Your Account" 
      highlight="Account"
    >
      {configWarning && <Alert type="warning" message={configWarning} />}
      {error && <Alert type="error" message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="name"
          name="name"
          type="text"
          label="Full Name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
        />

        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email"
          required
        />

        <div>
          <FormInput
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
          {formData.password && <PasswordStrength password={formData.password} />}
        </div>

        <div>
          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
          
          {formData.password && formData.confirmPassword && (
            <div className="mt-2">
              {passwordsMatch ? (
                <p className="text-green-400 text-sm flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className="w-4 h-4 mr-1"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Passwords match
                </p>
              ) : (
                <p className="text-red-400 text-sm flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className="w-4 h-4 mr-1"
                  >
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Passwords don&apos;t match
                </p>
              )}
            </div>
          )}
        </div>

        <FormButton
          type="submit"
          disabled={isLoading || authLoading || !passwordValid || !passwordsMatch}
          isLoading={isLoading || authLoading}
        >
          Register
        </FormButton>

        <div className="text-center text-blue-100">
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Log in here
            </Link>
          </p>
        </div>
      </form>
    </AuthFormContainer>
  );
}