"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Browse Jobs", href: "/" },
    { name: "Company", href: "/company" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="absolute top-4 left-0 right-0 z-50 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="h-16 px-6 flex items-center justify-between rounded-2xl border border-purple-500/10 bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.35)]">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 shadow-lg shadow-purple-500/30">
              <BriefcaseBusiness size={20} className="text-white" />
            </div>

            <h2 className="font-bold tracking-tight text-lg">
              <span className="text-white">Hire</span>
              <span className="text-purple-400">Loop</span>
            </h2>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative text-sm font-medium text-white/80 hover:text-purple-400 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-purple-500 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="h-6 w-px bg-white/10" />

            <div className="flex items-center gap-3 ml-4">
              <Link
                href="/login"
                className="border border-white bg-purple-500/5 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 transition-all px-4 py-2 rounded-xl"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all px-4 py-2 rounded-xl flex items-center gap-1"
              >
                Get Started
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {/* Mobile Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/5 text-white"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-3 rounded-2xl border border-purple-500/10 bg-[#0F1117]/40 backdrop-blur-xl p-4 md:hidden">

            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-white/70 hover:text-purple-400 hover:bg-purple-500/10 transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-2 border-t border-purple-500/10 pt-4">

              <Link
                href="/login"
                className="border border-white bg-purple-500/5 text-purple-300 text-center px-4 py-2 rounded-xl"
              >
                Sign In
              </Link>

              <Link
                href="/register"
                className="bg-white hover:bg-purple-500 hover:text-white text-purple-500 text-center px-4 py-2 rounded-xl"
              >
                Get Started
              </Link>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}