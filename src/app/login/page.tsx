"use client";

import React, { Suspense, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function Login() {
  return (
    <Layout>
      {/* Suspense boundary for useSearchParams() */}
      <Suspense fallback={<p>Loading login...</p>}>
        <LoginForm />
      </Suspense>
    </Layout>
  );
}

// Internal child component that actually calls useSearchParams().
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

    // Check if user was just registered
    const registered = searchParams.get("registered");
    if (registered === "true") {
      setSuccess("Registration successful! You can now log in with your credentials.");
    }
  }, [searchParams]);

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
      console.log("Attempting login with:", formData.email);

      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        console.log("Login error:", result.error);
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      // Redirect to dashboard on successful login
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please check your connection and try again.");
      setIsLoading(false);
    }
  };

  return (
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
              Log <span className="text-blue-400">In</span>
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

            {success && (
              <div className="bg-green-500/20 border border-green-500/30 p-3 rounded mb-4 text-white">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
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
                    Logging in...
                  </span>
                ) : (
                  "Log In"
                )}
              </button>

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
          </div>
        </motion.div>
      </div>
    </div>
  );
}