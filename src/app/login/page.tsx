"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthFormContainer } from "@/components/auth/AuthFormContainer";
import { FormInput } from "@/components/form/FormInput";
import { FormButton } from "@/components/form/FormButton";
import { Alert } from "@/components/form/Alert";
import { useAuth } from "@/contexts/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";

// Create a client component that uses useSearchParams
const LoginContent = () => {
  const router = useRouter();
  const { signIn, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [configWarning, setConfigWarning] = useState("");

  useEffect(() => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setConfigWarning("Warning: Supabase is not properly configured. Authentication will not work.");
    }

    // Handle URL parameters through window location instead
    const urlParams = new URLSearchParams(window.location.search);
    const registered = urlParams.get("registered");
    const verified = urlParams.get("verified");
    const reset = urlParams.get("reset");

    if (registered === "true") {
      setSuccess("Registration successful! Please check your email for a verification link.");
    } else if (verified === "true") {
      setSuccess("Email verified successfully! You can now log in with your credentials.");
    } else if (reset === "true") {
      setSuccess("Your password has been reset successfully. You can now log in with your new password.");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        setError(error.message);
        return;
      }
      
      // Redirect to dashboard on successful login
      router.push("/dashboard");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred during login.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormContainer title="Log In" highlight="In">
      {configWarning && <Alert type="warning" message={configWarning} />}
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Your password"
          required
        />

        <div className="text-right">
          <Link
            href="/reset-password"
            className="text-blue-400 hover:text-blue-300 text-sm transition"
          >
            Forgot your password?
          </Link>
        </div>

        <FormButton 
          type="submit" 
          isLoading={isLoading || authLoading} 
          disabled={isLoading || authLoading}
        >
          Log In
        </FormButton>

        <div className="text-center text-blue-100">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Register here
            </Link>
          </p>
        </div>
      </form>
    </AuthFormContainer>
  );
};

// Main login page with Suspense boundary
export default function Login() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-blue-100">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}