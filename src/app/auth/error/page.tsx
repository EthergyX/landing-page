// src/app/auth/error/page.tsx
"use client";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AuthError() {
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
                Authentication <span className="text-red-400">Error</span>
              </h1>
              <p className="text-blue-100 mb-6">
                There was a problem with the authentication process. This could be because the link has expired or is invalid.
              </p>
              <Link
                href="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition duration-300 inline-block"
              >
                Back to Login
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}