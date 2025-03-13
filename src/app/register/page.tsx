"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { isSupabaseConfigured } from "@/lib/supabase";

// Password strength calculation
const calculatePasswordStrength = (password: string) => {
  if (!password) return { score: 0, valid: false };
  
  let score = 0;
  let valid = false;
  
  // Check length
  const hasMinLength = password.length >= 8;
  if (hasMinLength) score += 1;
  
  // Check complexity
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  // Count character types
  let typesCount = 0;
  if (hasUppercase) typesCount++;
  if (hasLowercase) typesCount++;
  if (hasNumber) typesCount++;
  if (hasSpecial) typesCount++;
  
  // Add to score based on character types
  score += typesCount;
  
  // Extra points for longer passwords
  if (password.length >= 12) score += 1;
  
  // Password is valid if it has minimum length and at least 3 character types
  valid = hasMinLength && typesCount >= 3;
  
  return {
    score: Math.min(score, 6), // Cap at 6
    valid,
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial,
    typesCount
  };
};

// Password strength indicator component
const PasswordStrength = ({ password }: { password: string }) => {
  const strength = calculatePasswordStrength(password);
  const strengthPercentage = (strength.score / 6) * 100;
  
  let strengthLabel = "Very Weak";
  let strengthColor = "bg-red-500";
  
  if (strength.score >= 5) {
    strengthLabel = "Strong";
    strengthColor = "bg-green-500";
  } else if (strength.score >= 4) {
    strengthLabel = "Good";
    strengthColor = "bg-green-400";
  } else if (strength.score >= 3) {
    strengthLabel = "Fair";
    strengthColor = "bg-yellow-400";
  } else if (strength.score >= 2) {
    strengthLabel = "Weak";
    strengthColor = "bg-red-400";
  }
  
  return (
    <div className="mt-2">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-blue-200">Password Strength</span>
        <span className="text-sm text-blue-200">{strengthLabel}</span>
      </div>
      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${strengthColor} transition-all duration-300 ease-in-out`}
          style={{ width: `${strengthPercentage}%` }}
        ></div>
      </div>
      <div className="mt-2 text-xs text-blue-200 space-y-1">
        <p>Password requirements:</p>
        <ul className="list-disc pl-5 space-y-0.5">
          <li className={strength.hasMinLength ? "text-green-400" : ""}>
            At least 8 characters
          </li>
          <li className={strength.hasUppercase ? "text-green-400" : ""}>
            At least one uppercase letter
          </li>
          <li className={strength.hasLowercase ? "text-green-400" : ""}>
            At least one lowercase letter
          </li>
          <li className={strength.hasNumber ? "text-green-400" : ""}>
            At least one number
          </li>
          <li className={strength.hasSpecial ? "text-green-400" : ""}>
            At least one special character
          </li>
        </ul>
        <p className="pt-1 text-gray-300">
          (Must satisfy at least 3 of the character type requirements)
        </p>
      </div>
    </div>
  );
};

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
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    valid: false
  });

  useEffect(() => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setConfigWarning("Warning: Supabase is not properly configured. Registration will not work.");
    }
  }, []);

  useEffect(() => {
    // Update password strength when password changes
    if (formData.password) {
      setPasswordStrength(calculatePasswordStrength(formData.password));
    } else {
      setPasswordStrength({ score: 0, valid: false });
    }
  }, [formData.password]);

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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (!passwordStrength.valid) {
      setError("Your password doesn't meet the minimum requirements. It must be at least 8 characters long and contain at least 3 different character types (uppercase, lowercase, numbers, special characters).");
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
                      {formData.password === formData.confirmPassword ? (
                        <p className="text-green-400 text-sm">Passwords match</p>
                      ) : (
                        <p className="text-red-400 text-sm">Passwords don't match</p>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className={`${
                    passwordStrength.valid && formData.password === formData.confirmPassword
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-blue-500/50 cursor-not-allowed"
                  } text-white font-medium py-3 px-8 rounded-lg transition duration-300 w-full flex justify-center`}
                  disabled={
                    isLoading ||
                    !passwordStrength.valid ||
                    formData.password !== formData.confirmPassword
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