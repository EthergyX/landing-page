// src/app/register/confirmation/page.tsx
"use client";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function RegistrationConfirmation() {
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
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20 text-center">
              <h1 className="text-3xl font-bold mb-6">
                Check Your <span className="text-blue-400">Email</span>
              </h1>
              <p className="text-blue-100 mb-6">
                We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to complete your registration.
              </p>
              <p className="text-blue-100 mb-6">
                If you don&apos;t see the email, check your spam folder or click the button below to request a new verification link.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  href="/login"
                  className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-8 rounded-lg transition duration-300 inline-block"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}