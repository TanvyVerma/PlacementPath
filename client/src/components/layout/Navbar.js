'use client';

import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#FAF7F2] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-[#1A1A1A]">
              Placement
            </span>
            <span className="text-2xl font-bold text-[#E8442A] italic">
              Path
            </span>
            <span className="text-[#E8442A] text-xl">•</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/experiences" className="text-[#1A1A1A] hover:text-[#E8442A] font-medium transition-colors">
              Browse
            </Link>
            <Link href="/companies" className="text-[#1A1A1A] hover:text-[#E8442A] font-medium transition-colors">
              Companies
            </Link>
            {user && (
              <Link href="/submit" className="text-[#1A1A1A] hover:text-[#E8442A] font-medium transition-colors">
                Contribute
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-[#1A1A1A] hover:text-[#E8442A] font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-[#1A1A1A] hover:text-[#E8442A] font-medium">
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="bg-[#E8442A] hover:bg-[#d63d25] text-white px-5 py-2 rounded-lg font-medium transition-colors"
                >
                  Join free
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}