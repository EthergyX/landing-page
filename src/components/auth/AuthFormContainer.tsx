// src/components/auth/AuthFormContainer.tsx
import React from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { PageHeader } from "@/components/form/PageHeader";

interface AuthFormContainerProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  children: React.ReactNode;
}

export const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  subtitle,
  highlight,
  children,
}) => {
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
              <PageHeader 
                title={title} 
                subtitle={subtitle} 
                highlight={highlight} 
              />
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};