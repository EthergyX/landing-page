'use client'
// src/app/about/page.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';

export default function About(): JSX.Element {
  return (
    <Layout>
      {/* About Hero Section */}
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            About <span className="text-blue-400">EnergyGrid</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100"
          >
            Transforming energy distribution with innovative virtual power plant technology
          </motion.p>
        </div>
      </div>
      
      {/* Our Story Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-blue-100 text-lg">
                <p>
                  Founded in 2020, EnergyGrid began with a simple but powerful vision: to create a more resilient, sustainable energy ecosystem through the power of distributed energy resources.
                </p>
                <p>
                  Our founders, with backgrounds in renewable energy and software development, recognized that the traditional centralized power grid was becoming increasingly vulnerable to disruptions and unable to efficiently integrate the growing number of renewable energy sources.
                </p>
                <p>
                  We set out to develop a platform that could orchestrate thousands of distributed energy assets—from residential solar panels and batteries to commercial microgrids—creating virtual power plants that benefit both grid operators and energy consumers.
                </p>
                <p>
                  Today, EnergyGrid's technology helps utilities, energy aggregators, and large facilities optimize their energy usage, reduce costs, and contribute to a more sustainable future.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-video bg-blue-800/20 rounded-2xl border border-blue-500/20 overflow-hidden">
                {/* This would be replaced with an actual image in production */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Mission and Vision Section */}
      <div className="py-16 bg-gray-900/90 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20"
            >
              <div className="rounded-full bg-blue-500/20 w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-blue-100 text-lg">
                To accelerate the transition to a clean energy future by making distributed energy resources more valuable to the grid and more profitable for their owners.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-green-500/20"
            >
              <div className="rounded-full bg-green-500/20 w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-blue-100 text-lg">
                A world where energy is produced, distributed, and consumed in the most efficient, sustainable, and equitable way possible, powered by an intelligent grid that adapts in real-time to changing conditions.
              </p>
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
            <Link href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-10 rounded-lg transition duration-300 inline-block">
              Schedule a Demo
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}