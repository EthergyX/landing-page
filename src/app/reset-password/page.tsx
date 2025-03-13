// src/app/reset-password/page.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/confirm`,
      });

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
                    // src/app/reset-password/page.tsx (continued)
                <div className="bg-green-500/20 border border-green-500/30 p-3 rounded mb-4 text-white">
                  Password reset email sent! Check your inbox for instructions to reset your password.
                </div>
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
                  <div>
                    <label htmlFor="email" className="block text-blue-200 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-gray-800/50 border border-blue-500/30 rounded-lg p-3 text-white"
                      placeholder="Enter your email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition duration-300 w-full flex justify-center"
                    disabled={isLoading}
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
                        Sending...
                      </span>
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>

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
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}