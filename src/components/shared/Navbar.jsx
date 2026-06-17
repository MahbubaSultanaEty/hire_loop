"use client";

import { useState } from "react";
import {
  BriefcaseBusiness,
  Menu,
  X,
  ChevronRight,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();


  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

   const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "Pricing", href: "/plans" },
  ];

  const dashboardLinks = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter"
  }

  if (user?.email) {
    navLinks.push({
      name: "Dashboard",
      href: dashboardLinks[user?.role || "seeker"]
   })
 }

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Logged Out");
    router.push("/");
  };

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

            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-3 ml-4">
                {/* Hi + Avatar */}
                <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <span className="text-sm text-white/70">
                    Hi, <span className="text-white font-medium">{user.name?.split(" ")[0]}</span>
                  </span>
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={34}
                      height={34}
                      className="rounded-full border border-purple-500/30 object-cover"
                    />
                  ) : (
                    <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </Link>

                {/* Sign Out */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/20 transition-all px-3 py-2 rounded-xl text-sm"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                <Link
                  href="/signin"
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
            )}
          </div>

          {/* Mobile Button */}
          <div className="flex items-center gap-2 md:hidden">
            {user && (
              <Link href="/profile">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full border border-purple-500/30 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </Link>
            )}
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
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2 rounded-xl text-white/70 hover:bg-purple-500/10 transition-all"
                  >
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={28}
                        height={28}
                        className="rounded-full border border-purple-500/30 object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white text-xs font-semibold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span>Hi, {user.name?.split(" ")[0]}</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 border border-white/10 bg-white/5 text-white/60 px-4 py-2 rounded-xl text-sm"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}