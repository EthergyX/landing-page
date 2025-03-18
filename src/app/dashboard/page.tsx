// src/app/dashboard/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  
  return (
    <RequireAuth>
      <Layout>
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20">
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold">
                    Welcome, <span className="text-blue-400">{user?.user_metadata?.name || user?.email}</span>
                  </h1>
                  
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                    View Settings
                  </button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-blue-900/30 p-6 rounded-lg border border-blue-500/30">
                    <h3 className="text-xl font-semibold mb-2">Energy Usage</h3>
                    <p className="text-3xl font-bold text-blue-300">145 kWh</p>
                    <p className="text-blue-200 mt-2">Last 30 days</p>
                  </div>
                  
                  <div className="bg-green-900/30 p-6 rounded-lg border border-green-500/30">
                    <h3 className="text-xl font-semibold mb-2">Cost Savings</h3>
                    <p className="text-3xl font-bold text-green-300">$123.45</p>
                    <p className="text-green-200 mt-2">Last 30 days</p>
                  </div>
                  
                  <div className="bg-purple-900/30 p-6 rounded-lg border border-purple-500/30">
                    <h3 className="text-xl font-semibold mb-2">Carbon Offset</h3>
                    <p className="text-3xl font-bold text-purple-300">0.32 tons</p>
                    <p className="text-purple-200 mt-2">Last 30 days</p>
                  </div>
                </div>
                
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-4">Energy Overview</h2>
                  <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                    <div className="aspect-video flex items-center justify-center">
                      <p className="text-lg text-blue-100">Energy usage chart will be displayed here</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
                  <div className="bg-gray-900/50 rounded-lg border border-gray-700">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="px-6 py-4 text-left text-blue-300">Date</th>
                            <th className="px-6 py-4 text-left text-blue-300">Activity</th>
                            <th className="px-6 py-4 text-left text-blue-300">Energy</th>
                            <th className="px-6 py-4 text-left text-blue-300">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-800">
                            <td className="px-6 py-4">March 8, 2025</td>
                            <td className="px-6 py-4">Energy Optimization</td>
                            <td className="px-6 py-4">12.5 kWh</td>
                            <td className="px-6 py-4">
                              <span className="bg-green-500/20 text-green-300 py-1 px-3 rounded-full text-sm">Completed</span>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="px-6 py-4">March 7, 2025</td>
                            <td className="px-6 py-4">Battery Discharge</td>
                            <td className="px-6 py-4">8.3 kWh</td>
                            <td className="px-6 py-4">
                              <span className="bg-blue-500/20 text-blue-300 py-1 px-3 rounded-full text-sm">In Progress</span>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="px-6 py-4">March 6, 2025</td>
                            <td className="px-6 py-4">Grid Integration</td>
                            <td className="px-6 py-4">5.2 kWh</td>
                            <td className="px-6 py-4">
                              <span className="bg-green-500/20 text-green-300 py-1 px-3 rounded-full text-sm">Completed</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4">March 5, 2025</td>
                            <td className="px-6 py-4">Demand Response</td>
                            <td className="px-6 py-4">9.7 kWh</td>
                            <td className="px-6 py-4">
                              <span className="bg-green-500/20 text-green-300 py-1 px-3 rounded-full text-sm">Completed</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Layout>
    </RequireAuth>
  );
}