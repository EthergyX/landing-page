"use client";
// src/app/page.tsx
import Link from "next/link";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

export default function Home(): JSX.Element {
  return (
    <Layout>
      {/* Hero Section taking up the full viewport height */}
      <div className="min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Powering the <span className="text-blue-400">Future</span> of Energy
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-blue-50">
              We build innovative tools to scale virtual power plant deployments, 
              creating a more resilient and sustainable energy ecosystem.
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#solutions" 
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition duration-300"
              >
                Explore Solutions
              </a>
              <a 
                href="/contact" 
                className="bg-transparent hover:bg-white/10 text-white font-medium py-3 px-8 rounded-lg border border-white/20 transition duration-300"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Solutions Section */}
      <div id="solutions" className="bg-gray-900/90 backdrop-blur-lg py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Our Solutions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-blue-100 max-w-2xl mx-auto"
            >
              Transforming how distributed energy resources integrate with the grid
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20"
            >
              <div className="rounded-full bg-blue-500/20 w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Energy Optimization</h3>
              <p className="text-blue-100">
                Advanced algorithms that optimize energy distribution across virtual power plants for maximum efficiency and grid stability.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-green-500/20"
            >
              <div className="rounded-full bg-green-500/20 w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 
                    11.955 0 0112 2.944a11.955 11.955 0 
                    01-8.618 3.04A12.02 12.02 0 003 9c0 
                    5.591 3.824 10.29 9 11.622 5.176-1.332 
                    9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Grid Integration</h3>
              <p className="text-blue-100">
                Seamless integration tools that connect distributed energy resources to existing power infrastructure for reliable operation.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20"
            >
              <div className="rounded-full bg-purple-500/20 w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 
                    00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 
                    0V9a2 2 0 012-2h2a2 2 0 
                    012 2v10m-6 0a2 2 0 002 2h2a2 2 0 
                    002-2m0 0V5a2 2 0 
                    012-2h2a2 2 0 
                    012 2v14a2 2 0 
                    01-2 2h-2a2 2 0 
                    01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
              <p className="text-blue-100">
                Real-time monitoring and analytics to track performance, forecast demand, and identify optimization opportunities.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Features Section with Animated Stats */}
      <div className="py-20 bg-gradient-to-b from-gray-900/80 to-blue-900/80 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Creating the Energy Grid of Tomorrow
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl mb-8 text-blue-100"
              >
                Virtual power plants orchestrate thousands of distributed energy resources,
                creating a resilient network that responds to grid demands in real-time.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 gap-6"
              >
                <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-500/20">
                  <h3 className="text-4xl font-bold mb-2">30%</h3>
                  <p className="text-blue-200">Average reduction in peak demand</p>
                </div>
                
                <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-500/20">
                  <h3 className="text-4xl font-bold mb-2">24/7</h3>
                  <p className="text-blue-200">Real-time monitoring and response</p>
                </div>
                
                <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-500/20">
                  <h3 className="text-4xl font-bold mb-2">15K+</h3>
                  <p className="text-blue-200">Connected energy resources</p>
                </div>
                
                <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-500/20">
                  <h3 className="text-4xl font-bold mb-2">99.9%</h3>
                  <p className="text-blue-200">System reliability rating</p>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-video bg-blue-800/20 rounded-2xl border border-blue-500/20 overflow-hidden">
                {/* This would be replaced with an actual image or visualization in production */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 py-4 px-6 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-lg font-medium">Virtual Power Plant Dashboard</p>
                  <p className="text-sm text-blue-200">Real-time performance monitoring</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-b from-blue-900/80 to-black/80">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Transform Your Energy Strategy?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto mb-10"
          >
            Join the growing network of businesses leveraging virtual power plants for 
            sustainability, reliability, and cost efficiency.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-10 rounded-lg transition duration-300 inline-block"
            >
              Schedule a Demo
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
