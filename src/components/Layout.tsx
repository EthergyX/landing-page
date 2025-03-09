'use client'
// src/components/Layout.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import EnergyAnimation from './EnergyAnimation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="min-h-screen text-white">
      {/* Animation Background */}
      <EnergyAnimation />
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/WhiteLogo.png"
                alt="EthergyX Logo"
                width={150}
                height={40}
                priority
              />
            </Link>
            
            <div className="hidden md:flex space-x-8">
              <Link href="/solutions" className="hover:text-blue-300 transition duration-300">Solutions</Link>
              <Link href="/team" className="hover:text-blue-300 transition duration-300">Team</Link>
              <Link href="/about" className="hover:text-blue-300 transition duration-300">About</Link>
              <Link href="/contact" className="hover:text-blue-300 transition duration-300">Contact</Link>
            </div>
            
            <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full transition duration-300 hidden md:block">
              Get Started
            </button>
            
            <div className="md:hidden">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-lg text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Link href="/">
                  <Image
                    src="/WhiteLogo.png"
                    alt="EthergyX Logo"
                    width={120}
                    height={32}
                  />
                </Link>
              </div>
              <p className="mb-4">Building the future of distributed energy resources.</p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/ethergyx" className="text-gray-400 hover:text-white transition duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition duration-300">Energy Optimization</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Grid Integration</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Analytics Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Demand Response</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition duration-300">About Us</a></li>
                <li><a href="/team" className="hover:text-white transition duration-300">Our Team</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <address className="not-italic">
                <p className="mt-3">contact@ethergyx.com</p>
                <p>(479) 257-0054</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} EthergyX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;