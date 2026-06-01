"use client";

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import {
  BriefcaseBusiness,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Browse Jobs", href: "/" },
    { name: "Company", href: "/company" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="sticky top-4 z-50 px-4">
      <div className="max-w-7xl mx-auto">
        <header
          className="
            h-16
            px-6
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-white/10
            bg-[#0F1117]/70
            backdrop-blur-xl
            shadow-[0_8px_32px_rgba(0,0,0,0.35)]
          "
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-indigo-500
                to-violet-600
                shadow-lg
                shadow-indigo-500/30
              "
            >
              <BriefcaseBusiness size={20} className="text-white" />
            </div>

            <div>
              <h2 className="text-white font-bold tracking-tight text-lg">
                DevHire
              </h2>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      relative
                      text-sm
                      font-medium
                      text-white/60
                      hover:text-white
                      transition-all
                      duration-300

                      after:absolute
                      after:left-0
                      after:-bottom-1
                      after:h-[2px]
                      after:w-0
                      after:bg-indigo-500
                      after:transition-all
                      after:duration-300

                      hover:after:w-full
                    "
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 ml-4">
              <Button
                as={Link}
                href="/login"
                variant="ghost"
                className="
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-white/80
                  hover:bg-white/[0.06]
                  hover:text-white
                  transition-all
                "
              >
                Sign In
              </Button>

              <Button
                as={Link}
                href="/register"
                className="
                  bg-indigo-600
                  hover:bg-indigo-500
                  text-white
                  font-medium

                  shadow-lg
                  shadow-indigo-500/25

                  hover:shadow-indigo-500/40
                  transition-all
                "
              >
                Get Started
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                text-white
              "
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="
              mt-3
              rounded-2xl
              border
              border-white/10
              bg-[#0F1117]/90
              backdrop-blur-xl
              p-4
              md:hidden
            "
          >
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      block
                      rounded-xl
                      px-4
                      py-3
                      text-white/70
                      hover:text-white
                      hover:bg-white/[0.05]
                      transition-all
                    "
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
              <Button
                as={Link}
                href="/login"
                variant="ghost"
                className="
                  border
                  border-white/10
                  text-white/80
                  w-full
                "
              >
                Sign In
              </Button>

              <Button
                as={Link}
                href="/register"
                className="
                  bg-indigo-600
                  text-white
                  w-full
                "
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}