import { LogoFacebook, LogoGithub, LogoLinkedin, Xmark } from "@gravity-ui/icons";
import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-purple-500/10 bg-[#0F1117]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 shadow-lg shadow-purple-500/30">
                <BriefcaseBusiness size={20} className="text-white" />
              </div>

              <h2 className="font-bold text-xl">
                <span className="text-white">Hire</span>
                <span className="text-purple-400">Loop</span>
              </h2>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400">
              Connecting talented professionals with great companies. Find your
              next opportunity or hire the perfect candidate with HireLoop.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <Link
                href="#"
                className="rounded-lg border border-purple-500/20 p-2 text-gray-400 transition hover:border-purple-500/40 hover:text-purple-400"
              >
                <LogoFacebook size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-lg border border-purple-500/20 p-2 text-gray-400 transition hover:border-purple-500/40 hover:text-purple-400"
              >
                <Xmark size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-lg border border-purple-500/20 p-2 text-gray-400 transition hover:border-purple-500/40 hover:text-purple-400"
              >
                <LogoLinkedin size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-lg border border-purple-500/20 p-2 text-gray-400 transition hover:border-purple-500/40 hover:text-purple-400"
              >
                <LogoGithub size={18} />
              </Link>
            </div>
          </div>

          {/* For Candidates */}
          <div>
            <h3 className="mb-4 font-semibold text-white">For Candidates</h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition">
                  Career Tips
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition">
                  Resume Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="mb-4 font-semibold text-white">For Employers</h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition">
                  Talent Search
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition">
                  Hiring Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Company</h3>

            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-purple-500/10 pt-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} HireLoop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}