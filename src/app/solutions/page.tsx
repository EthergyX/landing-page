'use client'
// src/app/solutions/page.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import Image from 'next/image';

// 1) Make sure these image files live in /public/apipartners
// e.g. public/apipartners/EnphaseLogo.jpg
const partnerLogos = [
  { src: '/apipartners/EnphaseLogo.png', alt: 'Enphase' },
  { src: '/apipartners/FranklinWHLogo.png', alt: 'FranklinWH' },
  { src: '/apipartners/SMALogo.png', alt: 'SMA' },
  { src: '/apipartners/TeslaLogo.png', alt: 'Tesla' },
  { src: '/apipartners/SolarEdgeLogo.png', alt: 'SolarEdge' },
  { src: '/apipartners/SolisLogo.png', alt: 'Solis' },
];

export default function Solutions(): JSX.Element {
  // Solution categories
  const solutionCategories = [
    {
      id: 'vpp-platform',
      title: 'VPP Management Platform',
      description: 'Our flagship solution...',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 
            002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 
            0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 
            002-2m0 0V5a2 2 0 012-2h2a2 2 0 
            012 2v14a2 2 0 01-2 2h-2a2 2 0 
            01-2-2z"
          />
        </svg>
      ),
      features: [
        'Real-time DER visibility and monitoring',
        'Automated demand response',
        'Multi-asset class optimization',
        'Grid constraint management',
        'Market integration for energy trading',
      ],
      status: 'coming-soon',
      color: 'blue',
    },
    {
      id: 'dispatch-optimization',
      title: 'Dispatch Optimization Engine',
      description: 'AI-powered dispatch...',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      features: [
        'Machine learning forecast models',
        'Dynamic dispatch scheduling',
        'Automated price arbitrage',
        'Battery lifecycle optimization',
        'Customizable dispatch strategies',
      ],
      status: 'coming-soon',
      color: 'green',
    },
    {
      id: 'grid-services',
      title: 'Grid Services Interface',
      description: 'Connect your distributed...',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-purple-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
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
      ),
      features: [
        'Frequency regulation participation',
        'Capacity market bidding',
        'Emergency load reduction',
        'Voltage support services',
        'Compliant with ISO/TSO requirements',
      ],
      status: 'coming-soon',
      color: 'purple',
    },
    {
      id: 'der-integration',
      title: 'DER Integration Suite',
      description: 'Rapid integration of...',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-orange-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 
            8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 
            8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 
            8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
      features: [
        'Pre-built connectors for major DER vendors',
        'Support for residential and commercial assets',
        'Custom protocol adaptors',
        'Secure data transmission',
        'Scalable to thousands of endpoints',
      ],
      status: 'coming-soon',
      color: 'orange',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Our <span className="text-blue-400">Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto text-blue-100"
          >
            Comprehensive tools and platforms...
          </motion.p>
        </div>
      </div>

      {/* Solutions Overview */}
      <div className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {solutionCategories.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gray-800/40 backdrop-blur-sm p-8 
                            rounded-xl border border-${solution.color}-500/20
                            relative overflow-hidden`}
              >
                {/* Coming Soon Badge */}
                {solution.status === 'coming-soon' && (
                  <div
                    className={`absolute top-4 right-4 
                                bg-${solution.color}-500/20 
                                text-${solution.color}-300 text-xs
                                py-1 px-3 rounded-full`}
                  >
                    Coming Soon
                  </div>
                )}

                <div
                  className={`rounded-full 
                              bg-${solution.color}-500/20 w-16 h-16 
                              flex items-center justify-center mb-6`}
                >
                  {solution.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">
                  {solution.title}
                </h3>
                <p className="text-blue-100 mb-6">
                  {solution.description}
                </p>

                <h4 className="text-lg font-medium mb-4 text-blue-300">
                  Key Features
                </h4>
                <ul className="space-y-2 mb-8">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 text-${solution.color}-400 
                                    mr-2 mt-0.5 flex-shrink-0`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 
                          010 1.414l-8 8a1 1 0 
                          01-1.414 0l-4-4a1 1 0 
                          011.414-1.414L8 12.586l7.293-7.293a1 1 
                          0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-blue-100">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`bg-${solution.color}-500/20 
                              hover:bg-${solution.color}-500/30 
                              text-${solution.color}-300 font-medium
                              py-2 px-6 rounded-lg transition 
                              duration-300 w-full`}
                  disabled={solution.status === 'coming-soon'}
                >
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Section */}
      <div className="py-20 bg-gray-900/90 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Technology Integrations
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our platform connects seamlessly with a growing ecosystem...
            </p>
          </motion.div>

          {/* 2) Display actual logos instead of placeholders */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {partnerLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-gray-800/30 border border-gray-700/50 
                           h-24 rounded-lg flex items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}  // Adjust as needed
                  height={50}  // Adjust as needed
                  style={{ objectFit: 'contain' }}
                />
              </motion.div>
            ))}
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
            Join the growing network of businesses investing in VPPs...
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium 
                         py-4 px-10 rounded-lg transition duration-300 inline-block"
            >
              Schedule a Demo
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
