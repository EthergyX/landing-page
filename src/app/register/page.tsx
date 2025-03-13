"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PasswordStrength from "@/components/PasswordStrength";
import { checkPassword } from "@/utils/passwordUtils";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function Register() {
  const router = useRouter();
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
      // Send registration data to API
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Redirect to login page after successful registration
      router.push("/login?registered=true");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred during registration";
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20">
              <h1 className="text-3xl font-bold mb-6 text-center">
                Create Your <span className="text-blue-400">Account</span>
              </h1>

              {configWarning && (
                <div className="bg-yellow-500/20 border border-yellow-500/30 p-3 rounded mb-4 text-white">
                  {configWarning}
                </div>
              )}

              {error && (
                <div className="bg-red-500/20 border border-red-500/30 p-3 rounded mb-4 text-white">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-blue-200 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-gray-800/50 border border-blue-500/30 rounded-lg p-3 text-white"
                    placeholder="Your full name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-blue-200 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-800/50 border border-blue-500/30 rounded-lg p-3 text-white"
                    placeholder="Your email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-blue-200 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full bg-gray-800/50 border border-blue-500/30 rounded-lg p-3 text-white"
                    placeholder="Create a password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {formData.password && <PasswordStrength password={formData.password} />}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-blue-200 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full bg-gray-800/50 border border-blue-500/30 rounded-lg p-3 text-white"
                    placeholder="Confirm your password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
                          Passwords don't match
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className={`${
                    passwordValid && passwordsMatch
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-blue-500/50 cursor-not-allowed"
                  } text-white font-medium py-3 px-8 rounded-lg transition duration-300 w-full flex justify-center`}
                  disabled={
                    isLoading ||
                    !passwordValid ||
                    !passwordsMatch
                  }
                >
                  {isLoading ? (
                    <span className="inline-flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Registering...
                    </span>
                  ) : (
                    "Register"
                  )}
                </button>

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
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}