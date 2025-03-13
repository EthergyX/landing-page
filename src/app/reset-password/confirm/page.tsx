// src/app/reset-password/confirm/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import PasswordStrength from "@/components/PasswordStrength";
import { checkPassword } from "@/utils/passwordUtils";

export default function ResetPasswordConfirm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    // Update password validity when password changes
    if (password) {
      const { valid } = checkPassword(password);
      setPasswordValid(valid);
    } else {
      setPasswordValid(false);
    }
    
    // Check if passwords match
    if (confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      setPasswordsMatch(true); // Reset match status when confirmPassword is empty
    }
  }, [password, confirmPassword]);

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
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login?reset=true");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password.");
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
                Reset Your <span className="text-blue-400">Password</span>
              </h1>

              {error && (
                <div className="bg-red-500/20 border border-red-500/30 p-3 rounded mb-4 text-white">
                  {error}
                </div>
              )}

              {success ? (
                <div className="text-center">
                  <div className="bg-green-500/20 border border-green-500/30 p-3 rounded mb-4 text-white">
                    Password successfully reset! Redirecting you to login...
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="password" className="block text-blue-200 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full bg-gray-800/50 border border-blue-500/30 rounded-lg p-3 text-white"
                      placeholder="Create a new password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {password && <PasswordStrength password={password} />}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-blue-200 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="w-full bg-gray-800/50 border border-blue-500/30 rounded-lg p-3 text-white"
                      placeholder="Confirm your new password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {password && confirmPassword && (
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
                        Resetting...
                      </span>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}