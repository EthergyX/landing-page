// src/components/Navigation.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function Navigation() {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  return (
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
            <Link
              href="/solutions"
              className="hover:text-blue-300 transition duration-300"
            >
              Solutions
            </Link>
            <Link
              href="/team"
              className="hover:text-blue-300 transition duration-300"
            >
              Team
            </Link>
            <Link
              href="/about"
              className="hover:text-blue-300 transition duration-300"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-blue-300 transition duration-300"
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-white hover:text-blue-300 transition duration-300 py-2"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="border border-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-full transition duration-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-blue-300 transition duration-300 py-2"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full transition duration-300"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMobileMenu} aria-label="Toggle menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-gray-900/90 backdrop-blur-lg rounded-lg p-4 border border-blue-500/20">
            <div className="flex flex-col space-y-4">
              <Link
                href="/solutions"
                className="hover:text-blue-300 transition duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link
                href="/team"
                className="hover:text-blue-300 transition duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </Link>
              <Link
                href="/about"
                className="hover:text-blue-300 transition duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="hover:text-blue-300 transition duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="border-t border-gray-700 pt-4 mt-2">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block hover:text-blue-300 transition duration-300 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-center border border-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-full transition duration-300 mt-2"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block hover:text-blue-300 transition duration-300 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/register"
                      className="block text-center bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full transition duration-300 mt-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}